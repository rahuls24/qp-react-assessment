import { expect, test, describe, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoMainView from './TodoMainView';

vi.mock('react-virtualized-auto-sizer', () => ({
	default: ({
		children,
	}: {
		children: (size: { height: number; width: number }) => React.ReactNode;
	}) => children({ height: 600, width: 600 }),
}));

describe('TodoMainView Component', () => {
	beforeEach(() => {
		render(<TodoMainView />);
	});

	test('adds todo on form submit', () => {
		const addTodoInput = screen.getByPlaceholderText('Enter your todo...');
		fireEvent.change(addTodoInput, { target: { value: 'New Todo' } });

		const addButton = screen.getByText('Add Todo');
		fireEvent.click(addButton);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();

		fireEvent.click(checkbox);
		expect(checkbox).toBeChecked();
	});
});
