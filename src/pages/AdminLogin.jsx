import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, Lock, Mail } from 'lucide-react';
import './Admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if already logged in
  React.useEffect(() => {
    if (localStorage.getItem('adminAuth') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem('adminAuth', 'true');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-page section">
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="admin-form-container">
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <h2>Admin <span className="text-accent">Login</span></h2>
            <p className="text-secondary">Silakan login untuk mengakses Dashboard Admin.</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                <Mail size={16} /> Email Admin
              </label>
              <input 
                type="email" 
                className="form-control"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="admin@egnin.com" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <Lock size={16} /> Password
              </label>
              <input 
                type="password" 
                className="form-control"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Masukkan password" 
                required 
              />
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isSubmitting}>
              {isSubmitting ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Loader2 className="animate-spin" size={20} /> Memproses...
                </span>
              ) : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
