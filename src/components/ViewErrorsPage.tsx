import { Link } from 'react-router-dom';
import { ErrorTodosList } from './ErrorTodosList';
import { ErrorTodo } from '../App';
import { Plus } from 'lucide-react';

interface ViewErrorsPageProps {
  errorTodos: ErrorTodo[];
  onUpdate: (id: string, updates: Partial<ErrorTodo>) => void;
  onDelete: (id: string) => void;
}

export function ViewErrorsPage({ errorTodos, onUpdate, onDelete }: ViewErrorsPageProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white mb-2">Your Error Todos</h2>
          <p className="text-slate-400">View and manage all your tracked errors</p>
        </div>
        
        <Link
          to="/add"
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Error
        </Link>
      </div>

      <ErrorTodosList
        errorTodos={errorTodos}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}
