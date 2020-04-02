import React, { Component, useState, createContext, useContext } from 'react';
const CountContext = createContext();

// 基础写法
class Foo extends Component {
	render() {
		return (
			<CountContext.Consumer>
				{count =>
					<h1>
						{count}
					</h1>}
			</CountContext.Consumer>
		);
	}
}
// 稍优雅写法
class Bar extends Component {
	static contextType = CountContext;
	render() {
		const count = this.context;
		return (
			<h1>
				{count}
			</h1>
		);
	}
}

// Hooks 写法
function Counter() {
	const count = useContext(CountContext);
	return (
		<h1>
			{count}
		</h1>
	);
}

function App() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<button onClick={() => setCount(count + 1)}>
				click {count}
			</button>
			<CountContext.Provider value={count}>
				<Foo />
				<Bar />
				<Counter />
			</CountContext.Provider>
		</div>
	);
}
export default App;
