import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import { DashboardLayout } from './components/DashboardLayout';
import { AddErrorPage } from './components/AddErrorPage';
import { ViewErrorsPage } from './components/ViewErrorsPage';

export interface ErrorTodo {
  id: string;
  title: string;
  description: string;
  problemStep: string;
  problemFix: string;
  code: string;
  status: 'complete' | 'in-progress';
  type: string;
  imageUrl?: string;
  createdAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [errorTodos, setErrorTodos] = useState<ErrorTodo[]>([]);

  useEffect(() => {
    // Check for logged in user
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
      loadUserTodos(user.id);
    }
  }, []);

  const loadUserTodos = (userId: string) => {
    const todosStr = localStorage.getItem('errorTodos');
    if (todosStr) {
      const allTodos = JSON.parse(todosStr);
      setErrorTodos(allTodos.filter((todo: ErrorTodo) => todo.userId === userId));
    }
  };

  const handleSignIn = (email: string, password: string) => {
    const usersStr = localStorage.getItem('users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      loadUserTodos(user.id);
      return true;
    }
    return false;
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    const usersStr = localStorage.getItem('users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setErrorTodos([]);
    localStorage.removeItem('currentUser');
  };

  const handleAddErrorTodo = (errorTodo: Omit<ErrorTodo, 'id' | 'createdAt' | 'userId'>) => {
    const newErrorTodo: ErrorTodo = {
      ...errorTodo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      userId: currentUser!.id
    };

    const todosStr = localStorage.getItem('errorTodos');
    const allTodos = todosStr ? JSON.parse(todosStr) : [];
    allTodos.push(newErrorTodo);
    localStorage.setItem('errorTodos', JSON.stringify(allTodos));
    
    setErrorTodos([...errorTodos, newErrorTodo]);
  };

  const handleUpdateErrorTodo = (id: string, updates: Partial<ErrorTodo>) => {
    const todosStr = localStorage.getItem('errorTodos');
    const allTodos = todosStr ? JSON.parse(todosStr) : [];
    const updatedAllTodos = allTodos.map((todo: ErrorTodo) =>
      todo.id === id ? { ...todo, ...updates } : todo
    );
    localStorage.setItem('errorTodos', JSON.stringify(updatedAllTodos));
    
    setErrorTodos(errorTodos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const handleDeleteErrorTodo = (id: string) => {
    const todosStr = localStorage.getItem('errorTodos');
    const allTodos = todosStr ? JSON.parse(todosStr) : [];
    const updatedAllTodos = allTodos.filter((todo: ErrorTodo) => todo.id !== id);
    localStorage.setItem('errorTodos', JSON.stringify(updatedAllTodos));
    
    setErrorTodos(errorTodos.filter(todo => todo.id !== id));
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-white mb-2">Todos Error</h1>
              <p className="text-slate-300">Track and manage your development errors</p>
            </div>
            
            {showSignUp ? (
              <SignUpForm
                onSignUp={handleSignUp}
                onToggle={() => setShowSignUp(false)}
              />
            ) : (
              <SignInForm
                onSignIn={handleSignIn}
                onToggle={() => setShowSignUp(true)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <DashboardLayout currentUser={currentUser} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route 
            path="/add" 
            element={<AddErrorPage onAdd={handleAddErrorTodo} />} 
          />
          <Route 
            path="/todos" 
            element={
              <ViewErrorsPage 
                errorTodos={errorTodos}
                onUpdate={handleUpdateErrorTodo}
                onDelete={handleDeleteErrorTodo}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/todos" replace />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}