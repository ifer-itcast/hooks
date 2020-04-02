import React, { useState, useEffect } from 'react';

function Test() {
	const [count, setCount] = useState(0);
	const onClick = () => {
		console.log('一旦绑定事件的元素被切换了，这里就失效了');
	};
    useEffect(() => {
        document.querySelector('#size').addEventListener('click', onClick);
        return () => {
            document.querySelector('#size').removeEventListener('click', onClick);
        };
    }, [count]);
	return (
		<div>
			<p>
				{count}
			</p>
			<button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				click
			</button>
			{count % 2 ? <div id="size">hello world2</div> : <p id="size">hello world1</p>}
		</div>
	);
}

function App() {
	return <Test />;
}

export default App;
