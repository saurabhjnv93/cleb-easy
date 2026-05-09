import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/client';
import { useAuth } from '../contexts/AuthContext';

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const url = mode === 'login' ? '/auth/login' : '/auth/signup';
      const { data } = await api.post(url, form);
      signIn(data.token, data.user);
      toast.success(`Welcome back${data.user?.name ? `, ${data.user.name}` : ''}`);
      navigate('/dashboard');
    } catch (error) {
      const serverError = (error as any)?.response?.data?.error;
      toast.error(typeof serverError === 'string' ? serverError : 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen px-6 py-24 text-[var(--ce-ink)]">
      <div className="ce-card-strong mx-auto max-w-3xl rounded-[2rem] p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--ce-soft-ink)]">{mode === 'login' ? 'Sign In' : 'Create Account'}</p>
            <h1 className="ce-display text-4xl text-[var(--ce-heading)]">{mode === 'login' ? 'Welcome back' : 'Join CelebEasy'}</h1>
          </div>
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="ce-button ce-button-secondary px-5 py-3 text-sm">
            {mode === 'login' ? 'Create account' : 'Have an account?'}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-5">
          {mode === 'signup' && (
            <label className="space-y-2 text-sm text-[var(--ce-soft-ink)]">
              Full name
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="ce-input" />
            </label>
          )}
          <label className="space-y-2 text-sm text-[var(--ce-soft-ink)]">
            Email address
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="ce-input" />
          </label>
          <label className="space-y-2 text-sm text-[var(--ce-soft-ink)]">
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="ce-input" />
          </label>
          <button type="submit" className="ce-button ce-button-primary px-6 py-4 text-lg">
            {mode === 'login' ? 'Login' : 'Sign up'}
          </button>
        </form>
        <p className="mt-6 text-sm text-[var(--ce-soft-ink)]">Google login and forgot password are available in the backend API. Use the auth form to sign in.</p>
      </div>
    </div>
  );
};

export default Auth;
