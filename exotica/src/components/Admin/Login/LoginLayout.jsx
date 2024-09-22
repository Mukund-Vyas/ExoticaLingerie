import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import api from '@/src/utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/admin/login', { email, password });
      localStorage.setItem('adminToken', response.data.token); // Store the token
      console.log("::: Login Successfull :::");
      
      router.push('/admin/sitevisits'); // Redirect to admin dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-primary text-white p-2 rounded w-full ${loading && 'opacity-50'}`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
