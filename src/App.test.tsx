import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Should render', () => {
	test('App header is present', async () => {
		render(<App />);
		const link = screen.getByText('Todo App');
		expect(link).toHaveTextContent('Todo App');
	});
});
