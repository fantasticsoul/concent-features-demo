/**
 * Copy this file concent or other APP*.js file content to App.js!
 *
 * this demo show private state
 */
import React, { Component } from "react";
import { register, run, useConcent } from "concent";
import "./styles.css";

// just run concent
run();

// define a class component, belong to '$$default' module by default
@register()
class Counter extends Component {
  state = { count: 1 };
  add = () => this.setState({ count: this.state.count + 1 });
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.add}>add</button>
      </div>
    );
  }
}

// define a function component, belong to '$$default' module by default
function FnCounter() {
  const ctx = useConcent({ state: { count: 100 } });
  const add = () => ctx.setState({ count: ctx.state.count + 1 });
  return (
    <div>
      {ctx.state.count}
      <button onClick={add}>add</button>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h3>class component and fn component hold their own private state</h3>
      <Counter />
      <FnCounter />
    </div>
  );
}
