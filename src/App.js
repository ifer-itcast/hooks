import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import './App.css';

let idSeq = Date.now();
// 表单
const Control = memo(function Control(props) {
	const { addTodo } = props;
	const inputRef = useRef();
	const onSubmit = e => {
		e.preventDefault();
		const newText = inputRef.current.value.trim();
		if (newText.length === 0) {
			return;
		}
		addTodo({
			id: ++idSeq,
			text: newText,
			complete: false
		});

		inputRef.current.value = '';
	};
	return (
		<div className="control">
			<h1>todos</h1>
			<form onSubmit={onSubmit}>
				{/* 表单只有一个输入框回车即可触发 submit */}
				<input ref={inputRef} type="text" className="new-todo" placeholder="What needs to be done?" />
			</form>
		</div>
	);
});

// li
const TodoItem = memo(function TodoItem(props) {
	const { todo: { id, text, complete }, toggleTodo, removeTodo } = props;
	const onChange = () => {
		toggleTodo(id);
	};
	const onRemove = () => {
		removeTodo(id);
	};
	return (
		<li className="todo-item">
			<input type="checkbox" onChange={onChange} checked={complete} />
			<label className={complete ? 'complete' : ''}>
				{text}
			</label>
			<button onClick={onRemove}>&#xd7;</button>
		</li>
	);
});

// ul
const Todos = memo(function Todos(props) {
	const { todos, toggleTodo, removeTodo } = props;
	return (
		<ul>
			{todos.map(todo => {
				return <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />;
			})}
		</ul>
	);
});

const LS_KEY = '_$-todos_';

function TodoList() {
	const [todos, setTodos] = useState([]);
	// 增
	const addTodo = useCallback(todo => {
		// 函数的返回值就是要修改的结果
		setTodos(todos => [...todos, todo]);
	}, []);
	// 删
	const removeTodo = useCallback(id => {
		setTodos(todos => todos.filter(todo => todo.id !== id));
	}, []);
	// 改
	const toggleTodo = useCallback(id => {
		setTodos(todos =>
			todos.map(todo => {
				// 返回的是一个对象
				return todo.id === id
					? {
							...todo,
							complete: !todo.complete
						}
					: todo;
			})
		);
	}, []);
	// 注意副作用的顺序
	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem(LS_KEY));
		setTodos(todos);
	}, []);

	useEffect(
		() => {
			// 初始化和 todos 变化都会执行
			localStorage.setItem(LS_KEY, JSON.stringify(todos));
		},
		[todos]
	);

	return (
		<div className="todo-list">
			<Control addTodo={addTodo} />
			<Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos} />
		</div>
	);
}

export default TodoList;
