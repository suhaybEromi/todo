import { useState } from 'react';
import { LogIn, AlertCircle } from 'lucide-react';

interface SignInFormProps {
  onSignIn: (email: string, password: string) => boolean;
  onToggle: () => void;
}

export function SignInForm({ onSignIn, onToggle }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = onSignIn(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
          <LogIn className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-white">Sign In</h2>
          <p className="text-slate-400">Access your error tracker</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-red-400">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-slate-300 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-slate-300 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-slate-400">
          Don't have an account?{' '}
          <button
            onClick={onToggle}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
