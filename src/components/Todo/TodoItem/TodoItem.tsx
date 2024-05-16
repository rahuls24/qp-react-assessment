import { Todo } from '../../../types/todo';
import './TodoItem.css';
interface TodoItemProps {
	todo: Todo;
	updateTodo: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, updateTodo }) => {
	return (
		<div className='todo-item-card'>
			<div>
				<input
					type='checkbox'
					checked={todo.isCompleted}
					className='todo-item-checkbox'
					onChange={e =>
						updateTodo({ ...todo, isCompleted: e.target.checked })
					}
				/>
			</div>
			<div className='todo-item-text'>{todo.text}</div>
		</div>
	);
};
export default TodoItem;
