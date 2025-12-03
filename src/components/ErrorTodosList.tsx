import { useState } from 'react';
import { ErrorTodo } from '../App';
import { ErrorTodoCard } from './ErrorTodoCard';
import { ListTodo, Search, Filter } from 'lucide-react';

interface ErrorTodosListProps {
  errorTodos: ErrorTodo[];
  onUpdate: (id: string, updates: Partial<ErrorTodo>) => void;
  onDelete: (id: string) => void;
}

export function ErrorTodosList({ errorTodos, onUpdate, onDelete }: ErrorTodosListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'complete' | 'in-progress'>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const types = Array.from(new Set(errorTodos.map(todo => todo.type)));

  const filteredTodos = errorTodos.filter(todo => {
    const matchesSearch = 
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || todo.status === filterStatus;
    const matchesType = filterType === 'all' || todo.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <ListTodo className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-white">Error Todos</h2>
          <p className="text-slate-400">{errorTodos.length} total errors</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search errors..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Status</option>
                <option value="in-progress">In Progress</option>
                <option value="complete">Complete</option>
              </select>
            </div>
          </div>

          <div className="flex-1">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <ListTodo className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No errors found</p>
            <p className="text-slate-500">Add your first error todo to get started</p>
          </div>
        ) : (
          filteredTodos.map(todo => (
            <ErrorTodoCard
              key={todo.id}
              errorTodo={todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
