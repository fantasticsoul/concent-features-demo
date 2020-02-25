/**
 * Copy this file concent other APP*.js file content to App.js!
 * 
 * this demo show how function component and class component share reducer logic
 */
import React, { Component } from 'react';
import { register, run, useConcent } from 'concent';
import './styles.css';

// run concent with a module named counter
run({
  counter:{
    state:{count:1, msg:'11'},
    reducer:{
      inc(payload, moduleState, actionCtx) {
        const curCount = payload !== undefined ? payload : moduleState.count;
        return { count: curCount + 1 };
      },
      // this will trigger 2 times render when call dispatch by instance
      // and trigger 1 time render when call lazyDispatch by instance
      async incTwice(payload, moduleState, actionCtx) {
        const { count } = await actionCtx.dispatch("inc", moduleState.count);
        await actionCtx.dispatch("inc", count);
      }
    }
  }
})

// define a class component that belong to 'counter' module
@register('counter')
class Counter extends Component{
  add = ()=>this.ctx.dispatch('inc')
  add2 = ()=>this.ctx.dispatch('incTwice')
  add2OneRender = ()=>this.ctx.lazyDispatch('incTwice')
  render(){
    console.log("%cCounter", "color:green");
    return (
      <div>
        {this.state.count}
        <button onClick={this.add}>add</button>
        <button onClick={this.add2}>add 2 times trigger 2 render</button>
        <button onClick={this.add2OneRender}>add 2 times trigger 1 render</button>
      </div>
    )
  }
}

// define a function component that belong to 'counter' module
function FnCounter(){
  console.log("%cFnCounter", "color:green");
  const ctx = useConcent('counter');
  const add = ()=>ctx.dispatch('inc')
  const add2 = ()=>ctx.dispatch('incTwice')
  const add2OneRender = ()=>ctx.lazyDispatch('incTwice')
  return (
    <div>
      {ctx.state.count}
      <button onClick={add}>add</button>
      <button onClick={add2}>add 2 times trigger 2 render</button>
      <button onClick={add2OneRender}>add 2 times trigger 1 render</button>
    </div>
  )
}

export default function App() {
  return (
    <div className="App">
      <Counter />
      <FnCounter />
    </div>
  );
}
