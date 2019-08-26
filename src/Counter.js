import React, { Component } from 'react';

export default class Counter extends Component {
	constructor() {
		super();
		this.state = {
			counter: 0
		};
	}
	render() {
		return (
			<div>
				{' '}
                <h2>Counter: {this.state.counter}</h2>
                <button onClick={this.increment}>+</button>
			</div>
		);
	}
}
