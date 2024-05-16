import React, { useState, useMemo } from 'react';
import TodoForm from './TodoForm/TodoForm';
import TodoItem from './TodoItem/TodoItem';
import { Todo } from '../../types/todo';
import './TodoMainView.css';

const TodoMainView: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const handleTodoMutation = (
		action: 'add' | 'update',
		updatedTodo: Todo,
	) => {
		setTodos(prevTodos => {
			switch (action) {
				case 'add':
					return [...prevTodos, updatedTodo];
				case 'update':
					return prevTodos.map(todo =>
						todo.id === updatedTodo.id ? updatedTodo : todo,
					);
				default:
					return prevTodos;
			}
		});
	};

	const memoizedTodoItems = useMemo(() => {
		return {
			active: todos
				.filter(todo => !todo.isCompleted)
				.map(todo => (
					<TodoItem
						key={todo.id}
						todo={todo}
						updateTodo={updatedTodo =>
							handleTodoMutation('update', updatedTodo)
						}
					/>
				)),
			completed: todos
				.filter(todo => todo.isCompleted)
				.map(todo => (
					<TodoItem
						key={todo.id}
						todo={todo}
						updateTodo={updatedTodo =>
							handleTodoMutation('update', updatedTodo)
						}
					/>
				)),
		};
	}, [todos]);

	return (
		<>
			<TodoForm addTodo={newTodo => handleTodoMutation('add', newTodo)} />
			<div className='todo-main-view__container'>
				<div className='todo-container'>
					<h2>Active</h2>
					<div className='todo-section'>
						{memoizedTodoItems.active}
					</div>
				</div>
				<div className='todo-container'>
					<h2>Completed</h2>
					<div className='todo-section'>
						{memoizedTodoItems.completed}
					</div>
				</div>
			</div>
		</>
	);
};

export default TodoMainView;
