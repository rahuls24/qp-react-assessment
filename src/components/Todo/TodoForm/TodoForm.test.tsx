import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';

describe('Render the Add Todo From', async () => {
	test('Add Todo from should render', async () => {
		const mockAddTodo = vi.fn();
		render(<TodoForm addTodo={mockAddTodo} />);
		const inputElement = screen.getByPlaceholderText('Enter your todo...');
		expect(inputElement).toBeInTheDocument();

		const addButton = screen.getByText('Add Todo');
		expect(addButton).toBeInTheDocument();
	});

	test('adds todo on form submit', () => {
		const mockAddTodo = vi.fn();
		const { getByPlaceholderText, getByText } = render(
			<TodoForm addTodo={mockAddTodo} />,
		);

		const inputElement = getByPlaceholderText('Enter your todo...');
		fireEvent.change(inputElement, { target: { value: 'New Todo' } });

		const addButton = getByText('Add Todo');
		fireEvent.click(addButton);

		expect(mockAddTodo).toHaveBeenCalledWith({
			id: expect.any(String),
			text: 'New Todo',
			isCompleted: false,
		});
	});
});
