import React, { useState } from 'react';
import './TodoForm.css'; // Import your CSS file for styling
import { Todo } from '../../../types/todo';
import { v4 } from 'uuid';

interface TodoFormProps {
	addTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
	const [text, setText] = useState('');

	const handleInputChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setText(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (text.trim()) {
			const todo = {
				id: v4(),
				text: text,
				isCompleted: false,
			};
			addTodo(todo);
			setText('');
		}
	};

	return (
		<form className='todo-form' onSubmit={handleSubmit}>
			<textarea
				className='todo-input'
				placeholder='Enter your todo...'
				value={text}
				onChange={handleInputChange}
			/>
			<button
				className='add-button'
				type='submit'
				disabled={!text.trim()}
			>
				Add Todo
			</button>
		</form>
	);
};

export default TodoForm;
