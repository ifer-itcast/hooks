import React, { useState } from 'react';

function Test(props) {
    // useState 参数可以是一个回调函数，可以把初始值当做此函数的返回值
	const [count, setCount] = useState(() => props.defaultCount || 0);
	return (
		<div>
			<p>
				{count}
			</p>
			<button onClick={() => setCount(count + 1)}>add</button>
		</div>
	);
}

function App() {
	return <Test />;
}

export default App;
