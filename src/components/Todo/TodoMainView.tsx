// React imports
import React, { useState, useMemo, useCallback } from 'react';

// Component imports
import TodoForm from './TodoForm/TodoForm';
import TodoItem from './TodoItem/TodoItem';

// External library imports
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// Type and styling imports
import { Todo } from '../../types/todo';
import './TodoMainView.css';

const getItemSize = () => 200;

// Dummy styles
const buttonStyle = {
	backgroundColor: '#007bff',
	color: 'white',
	marginLeft: '20px',
	padding: '10px 20px',
	border: 'none',
	borderRadius: '5px',
	fontSize: '16px',
	cursor: 'pointer',
	transition: 'background-color 0.3s ease',
};

const TodoMainView: React.FC = () => {
	// Local states
	const [todos, setTodos] = useState<Todo[]>([]);

	// Local Variables
	const incompleteTodos = useMemo(
		() => todos.filter(todo => !todo.isCompleted),
		[todos],
	);
	const completeTodos = useMemo(
		() => todos.filter(todo => todo.isCompleted),
		[todos],
	);

	// Handlers
	const handleTodoMutation = useCallback(
		(action: 'add' | 'update', updatedTodo: Todo) => {
			setTodos(prevTodos => {
				switch (action) {
					case 'add':
						return [updatedTodo, ...prevTodos];
					case 'update':
						return prevTodos.map(todo =>
							todo.id === updatedTodo.id ? updatedTodo : todo,
						);
					default:
						return prevTodos;
				}
			});
		},
		[],
	);

	const Row = ({
		index,
		style,
		data,
	}: {
		index: number;
		style: React.CSSProperties;
		data: Todo[];
	}) => (
		<div
			style={{
				...style,
				padding: '20px',
			}}
		>
			<TodoItem
				todo={data[index]}
				updateTodo={(todo: Todo) => handleTodoMutation('update', todo)}
			/>
		</div>
	);

	return (
		<>
			<TodoForm
				addTodo={(todo: Todo) => handleTodoMutation('add', todo)}
			/>
			{/* Ignore the layout */}
			<button
				style={buttonStyle}
				onClick={() => setTodos(prev => [...prev, ...addLargeTodos()])}
			>
				{' '}
				Load 10000+ Records{' '}
			</button>
			<div className='todo-main-view__container'>
				<div className='todo-container'>
					<h2>Incomplete</h2>
					<div className='todo-section'>
						<AutoSizer>
							{({ height, width }) => (
								<List
									height={height}
									itemCount={incompleteTodos.length}
									itemSize={getItemSize}
									width={width}
									itemData={incompleteTodos}
								>
									{Row}
								</List>
							)}
						</AutoSizer>
						{incompleteTodos.length === 0 && (
							<div className='no-todos'>
								<div className='no-todos-text'>
									No Incomplete Todo!
								</div>
							</div>
						)}
					</div>
				</div>
				<div className='todo-container'>
					<h2>Completed</h2>
					<div className='todo-section'>
						<AutoSizer>
							{({ height, width }) => (
								<List
									height={height}
									itemCount={completeTodos.length}
									itemSize={getItemSize}
									width={width}
									itemData={completeTodos}
								>
									{Row}
								</List>
							)}
						</AutoSizer>
						{completeTodos.length === 0 && (
							<div className='no-todos'>
								<div className='no-todos-text'>
									No Complete Todo!
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default TodoMainView;

// Helper function
const addLargeTodos = () => {
	const largeTodoText =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ';
	const newTodos: Todo[] = [
		{
			id: '1',
			text: 'Once Application ID: 29467398  have submitted his assessment, we will do a 15 minute discovery call to understand how we can align with his growth path.',
			isCompleted: false,
		},
		{
			id: '2',
			text: 'Followed by the discovery call, we will be scheduling his  first technical interview. It will be a 1 hour discussion with our Engineer Lead.',
			isCompleted: false,
		},
		{
			id: '3',
			text: 'Executive Interview: One of our Engineering Directors will be doing a brief one on one discussion with him. This will be partly technical. ',
			isCompleted: false,
		},
		{
			id: '4',
			text: 'Final Discussion: Our HR Director will be doing the final discussion around culture, policies and compensation. ',
			isCompleted: false,
		},
		{
			id: '5',
			text: 'Technical Assessment:Complete a 90 minute programming assessment. You can take more time than that if you need. The test is not time bound. It will require you to set up a project on some IDE & push your changes on GitHub. You can finish the test anytime in the next 2 weeks.',
			isCompleted: true,
		},
	];

	for (let i = 6; i < 10000; i++) {
		const id = i + 1;
		const isCompleted = i % 2 === 0; // Alternate between completed and incomplete todos
		const todo = {
			id: String(id),
			text: `${largeTodoText} ${id}`,
			isCompleted,
		};
		newTodos.push(todo);
	}

	return newTodos;
};
