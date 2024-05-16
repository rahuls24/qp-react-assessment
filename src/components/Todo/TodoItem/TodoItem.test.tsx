import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

// Mock Todo data
const todo = {
	id: '1',
	text: 'Sample Todo',
	isCompleted: false,
};

// Mock updateTodo function
const mockUpdateTodo = vi.fn();

describe('TodoItem', () => {
	test('renders TodoItem component with correct text and checkbox state', () => {
		render(<TodoItem todo={todo} updateTodo={mockUpdateTodo} />);

		const todoText = screen.getByText('Sample Todo');
		expect(todoText).toBeInTheDocument();

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();
	});

	test('calls updateTodo function with updated todo on checkbox change', () => {
		render(<TodoItem todo={todo} updateTodo={mockUpdateTodo} />);

		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);

		expect(mockUpdateTodo).toHaveBeenCalledWith({
			...todo,
			isCompleted: true,
		});
	});
});
