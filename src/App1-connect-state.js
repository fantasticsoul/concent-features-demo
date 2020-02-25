/**
 * Copy this file concent or other APP*.js file content to App.js!
 * 
 * this demo show how function component and class component
 * hold module state and private state at different container if you
 * don't want module state and private state were merged to ctx.state
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

// define a class component that connect to 'counter' module
// of cause you can connect multi module if you want
@register({connect:['counter']})
class Counter extends Component{
  state = {msg:'class priv state'};
  add = ()=>this.ctx.setModuleState('counter', {count:this.ctx.connectedState.counter.count+1});
  changePrivState = ()=> this.setState({msg:'count changed '+Date.now()});
  render(){
    const state = this.state;
    // if you connect multi module, here can get different module state
    const { counter } = this.ctx.connectedState;
    return (
      <div>
        module state:{counter.count}<br/>
        prive state:{state.msg}<br/>
        <button onClick={this.add}>add</button>
        <button onClick={this.changePrivState}>change msg</button>
      </div>
    )
  }
}

const fnPrivState = ()=> ({msg:'fn priv state'});

// define a function component that belong to 'counter' module
function FnCounter(){
  const ctx = useConcent({connect:['counter'], state:fnPrivState});
  const add = ()=>ctx.setModuleState('counter', {count:ctx.connectedState.counter.count+1});
  const changePrivState = ()=> ctx.setState({msg:'count changed '+Date.now()});
  return (
    <div>
      module state:{ctx.connectedState.counter.count}<br/>
      prive state:{ctx.state.msg}<br/>
      <button onClick={add}>add</button>
      <button onClick={changePrivState}>change msg</button>
    </div>
  )
}

export default function App() {
  return (
    <div className="App">
      <h3>function component and class component hold module state and private state 
        at different state container</h3>
      <Counter />
      <FnCounter />
    </div>
  );
}
