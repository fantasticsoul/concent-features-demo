/**
 * Copy this file concent or other APP*.js file content to App.js!
 * 
 * this demo show how function component and class component share module state
 */
import React, { Component } from 'react';
import { register, run, useConcent } from 'concent';
import './styles.css';

// run concent with a module named counter
run({
  counter:{
    state:{count:1}
  }
})

// define a class component that belong to 'counter' module
@register('counter')
class Counter extends Component{
  add = ()=>this.setState({count:this.state.count+1});
  render(){
    return (
      <div>
        {this.state.count}
        <button onClick={this.add}>add</button>
      </div>
    )
  }
}

// define a function component that belong to 'counter' module
function FnCounter(){
  const ctx = useConcent('counter');
  const add = ()=>ctx.setState({count:ctx.state.count+1});
  return (
    <div>
      {ctx.state.count}
      <button onClick={add}>add</button>
    </div>
  )
}

export default function App() {
  return (
    <div className="App">
      <h3>class component and fn component share the module state</h3>
      <Counter />
      <FnCounter />
    </div>
  );
}
