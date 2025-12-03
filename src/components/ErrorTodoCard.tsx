import { useState } from 'react';
import { ErrorTodo } from '../App';
import { 
  Trash2, 
  Check, 
  Clock, 
  Code2, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  Tag,
  Image as ImageIcon
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ErrorTodoCardProps {
  errorTodo: ErrorTodo;
  onUpdate: (id: string, updates: Partial<ErrorTodo>) => void;
  onDelete: (id: string) => void;
}

export function ErrorTodoCard({ errorTodo, onUpdate, onDelete }: ErrorTodoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleStatus = () => {
    onUpdate(errorTodo.id, {
      status: errorTodo.status === 'complete' ? 'in-progress' : 'complete'
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-slate-900/50 border border-slate-600 rounded-xl overflow-hidden hover:border-purple-500/50 transition-colors">
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <button
            onClick={toggleStatus}
            className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
              errorTodo.status === 'complete'
                ? 'bg-green-500 border-green-500'
                : 'border-slate-500 hover:border-purple-400'
            }`}
          >
            {errorTodo.status === 'complete' && (
              <Check className="w-4 h-4 text-white" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3 className={`text-white mb-1 ${errorTodo.status === 'complete' ? 'line-through opacity-60' : ''}`}>
              {errorTodo.title}
            </h3>
            <p className="text-slate-400 line-clamp-2">
              {errorTodo.description}
            </p>
          </div>

          <button
            onClick={() => onDelete(errorTodo.id)}
            className="flex-shrink-0 p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
          >
            <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-3">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            errorTodo.status === 'complete'
              ? 'bg-green-500/10 text-green-400'
              : 'bg-yellow-500/10 text-yellow-400'
          }`}>
            {errorTodo.status === 'complete' ? (
              <Check className="w-3 h-3" />
            ) : (
              <Clock className="w-3 h-3" />
            )}
            <span className="text-xs">
              {errorTodo.status === 'complete' ? 'Complete' : 'In Progress'}
            </span>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-purple-500/10 text-purple-400">
            <Tag className="w-3 h-3" />
            <span className="text-xs">{errorTodo.type}</span>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 text-slate-400">
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{formatDate(errorTodo.createdAt)}</span>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span className="text-xs">Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span className="text-xs">Show More</span>
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-700 p-4 space-y-4">
          {errorTodo.problemStep && (
            <div>
              <h4 className="text-slate-300 mb-2">Problem Steps</h4>
              <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-700">
                <p className="text-slate-400 whitespace-pre-wrap">{errorTodo.problemStep}</p>
              </div>
            </div>
          )}

          {errorTodo.problemFix && (
            <div>
              <h4 className="text-slate-300 mb-2">Solution</h4>
              <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-700">
                <p className="text-slate-400 whitespace-pre-wrap">{errorTodo.problemFix}</p>
              </div>
            </div>
          )}

          {errorTodo.code && (
            <div>
              <h4 className="text-slate-300 mb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Code
              </h4>
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-700 overflow-x-auto max-h-48 overflow-y-auto">
                <SyntaxHighlighter language="javascript" style={atomDark}>
                  {errorTodo.code}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {errorTodo.imageUrl && (
            <div>
              <h4 className="text-slate-300 mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Screenshot
              </h4>
              <div className="bg-slate-950/50 rounded-lg p-2 border border-slate-700">
                <img
                  src={errorTodo.imageUrl}
                  alt="Error screenshot"
                  className="w-full max-h-64 object-contain rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}