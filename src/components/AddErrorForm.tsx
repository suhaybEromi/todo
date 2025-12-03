import { useState } from 'react';
import { Plus, Code2, Image as ImageIcon, Upload, X } from 'lucide-react';
import { ErrorTodo } from '../App';

interface AddErrorFormProps {
  onAdd: (errorTodo: Omit<ErrorTodo, 'id' | 'createdAt' | 'userId'>) => void;
}

export function AddErrorForm({ onAdd }: AddErrorFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [problemStep, setProblemStep] = useState('');
  const [problemFix, setProblemFix] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'complete' | 'in-progress'>('in-progress');
  const [type, setType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const predefinedTypes = ['development', 'english', 'design', 'database', 'api', 'testing'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImageUrl(base64String);
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageUrl('');
    setImagePreview('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Please fill in at least title and description');
      return;
    }

    onAdd({
      title,
      description,
      problemStep,
      problemFix,
      code,
      status,
      type: type || 'general',
      imageUrl: imageUrl || undefined
    });

    // Reset form
    setTitle('');
    setDescription('');
    setProblemStep('');
    setProblemFix('');
    setCode('');
    setStatus('in-progress');
    setType('');
    setImageUrl('');
    setImagePreview('');
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-white">Add Error Todo</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-slate-300 mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Brief error title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="Describe the error in detail"
          />
        </div>

        <div>
          <label htmlFor="problemStep" className="block text-slate-300 mb-2">
            Problem Steps
          </label>
          <textarea
            id="problemStep"
            value={problemStep}
            onChange={(e) => setProblemStep(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="Steps to reproduce the error"
          />
        </div>

        <div>
          <label htmlFor="problemFix" className="block text-slate-300 mb-2">
            Problem Fix
          </label>
          <textarea
            id="problemFix"
            value={problemFix}
            onChange={(e) => setProblemFix(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="How to fix this error"
          />
        </div>

        <div>
          <label htmlFor="code" className="block text-slate-300 mb-2 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            Code
          </label>
          <div className="relative">
            <textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 bg-[#1d1f21] border border-slate-600 rounded-lg text-[#c5c8c6] placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono"
              placeholder="// Paste your code here&#10;function example() {&#10;  console.log('Hello World');&#10;}"
              style={{ 
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '0.875rem',
                lineHeight: '1.5'
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="status" className="block text-slate-300 mb-2">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'complete' | 'in-progress')}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="in-progress">In Progress</option>
              <option value="complete">Complete</option>
            </select>
          </div>

          <div>
            <label htmlFor="type" className="block text-slate-300 mb-2">
              Type
            </label>
            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              list="type-suggestions"
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., development"
            />
            <datalist id="type-suggestions">
              {predefinedTypes.map(t => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </div>
        </div>

        <div>
          <label className="block text-slate-300 mb-2 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Upload Image
          </label>
          
          {!imagePreview ? (
            <label className="block cursor-pointer">
              <div className="w-full px-4 py-8 bg-slate-900/50 border-2 border-dashed border-slate-600 rounded-lg hover:border-purple-500 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-slate-400" />
                  <p className="text-slate-400">Click to upload an image</p>
                  <p className="text-slate-500 text-xs">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border border-slate-600"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Error Todo
        </button>
      </form>
    </div>
  );
}