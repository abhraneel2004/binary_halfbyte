import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';

export function Login() {
  const navigate = useNavigate();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in with Google!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, githubProvider);
      toast.success('Logged in with GitHub!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'GitHub login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold">Sign in</h2>
        <form onSubmit={handleEmailLogin} className="space-y-6">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign in with Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Sign in with GitHub
          </button>
        </div>
        <Link to="/signup" className="text-blue-500 hover:underline mt-4 block text-center">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}