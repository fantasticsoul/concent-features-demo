/**
 * Copy this file concent other APP*.js file content to App.js!
 *
 * this demo show how class component and function component
 * cpature ref with extra
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
    },
  }
});

const setup = ctx => {
  // ctx.extra is {} by default
  ctx.extra = {ref1:null, ref2:null};//init extra

  ctx.effect((_, isFirstCall)=>{
    console.log('%cdidMount & didUpdate (every render period)', 'color:blue');
    console.log(ctx.type, ctx.extra, isFirstCall);
  });

  return {
    add: () => ctx.dispatch("inc")
  };
};

// define a class component that belong to 'counter' module
@register({ module: "counter", setup })
class Counter extends Component {
  render() {
    console.log("%c Counter", "color:green");
    const {
      settings: { add },
      extra,
    } = this.ctx;
    return (
      <div ref={ref => (extra.ref1 = { current: ref })}>
        {this.state.count}
        <button ref={ref => (extra.ref2 = { current: ref })} onClick={add}>add</button>
      </div>
    );
  }
}

// define a function component that belong to 'counter' module
function FnCounter() {
  console.log("%c FnCounter", "color:green");
  const ctx = useConcent({ module: "counter", setup });
  const {
    settings: { add },
    extra,
  } = ctx;
  extra.ref1 = React.useRef();
  extra.ref2 = React.useRef();

  return (
    <div ref={extra.ref1}>
      {ctx.state.count}
      <button ref={extra.ref2} onClick={add}>add</button>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h3> capture ref with extra, but App7 demo is better way</h3>
      <Counter />
      <FnCounter />
    </div>
  );
}
