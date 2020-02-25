/**
 * Copy this file concent other APP*.js file content to App.js!
 *
 * this demo show how class component and function component
 * share life-cycle method and logic with setup
 */
import React, { Component } from "react";
import { register, run, useConcent } from "concent";
import "./styles.css";

// run concent with a module named counter
run({
  counter: {
    state: { count: 12, msg: "--" },
    reducer: {
      inc(payload, moduleState, actionCtx) {
        const curCount = payload !== undefined ? payload : moduleState.count;
        return { count: curCount + 1 };
      },
      async incTwice(payload, moduleState, actionCtx) {
        const { count } = await actionCtx.dispatch("inc", moduleState.count);
        await actionCtx.dispatch("inc", count);
      }
    },
    computed: {
      count(n, o, f) {// newState, oldState, fnCtx
        return n.count * 10;
      }
    },
    watch: {
      countChange: {
        fn: (n, o, f) => {
         // you can also move this code to computed.count funciont block
         // and delete this watch 'countChange'
          f.commit({ msg: "count changed " + Date.now() });
        },
        depKeys: ["count"]
      }
    }
  }
});

const setup = ctx => {
  console.log('setup will only been triggered before first render period!');

  ctx.effect((_, isFirstCall)=>{
    console.log('%cdidMount & didUpdate (every render period)', 'color:blue');
    console.log(ctx.type, isFirstCall);
  });

  //mock didUpdate
  ctx.effect((_, isFirstCall)=>{
    console.log('%cdidUpdate (every render period except for first)', 'color:blue');
    console.log(ctx.type, isFirstCall);
  }, null, false);

  //mock didMount
  ctx.effect(()=>{
    console.log('%cdidMount', 'color:blue');
    console.log(ctx.type);
    return ()=> alert('clear up');
  }, []);

  return {
    add: () => ctx.dispatch("inc"),
    add2: () => ctx.dispatch("incTwice"),
    add2Lazy: () => ctx.lazyDispatch("incTwice")
  };
};

// define a class component that belong to 'counter' module
@register({ module: "counter", setup })
class Counter extends Component {
  render() {
    console.log("%c Counter", "color:green");
    const {
      settings: { add, add2, add2Lazy },
    } = this.ctx;
    return (
      <div>
        {this.state.count}
        <button onClick={add}>add</button>
        <button onClick={add2}>add 2 times</button>
        <button onClick={add2Lazy}>add 2 times trigger one render</button>
      </div>
    );
  }
}


// define a function component that belong to 'counter' module
function FnCounter() {
  console.log("%c FnCounter", "color:green");
  const ctx = useConcent({ module: "counter", setup });
  const {
    settings: { add, add2, add2Lazy },
  } = ctx;

  return (
    <div>
      {ctx.state.count}
      <button onClick={add}>add</button>
      <button onClick={add2}>add 2 times</button>
      <button onClick={add2Lazy}>add 2 times trigger one render</button>
      <br />
      msg: {ctx.state.msg}
      <br />
      ten*count: {ctx.moduleComputed.count}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h2>with setup</h2>
      <h3>unify life-cycle method writing way</h3>
      <h3>share logic between fn and class elegantly</h3>
      <h3>no temporary closure method in render block any more</h3>
      <Counter />
      <FnCounter />
    </div>
  );
}
