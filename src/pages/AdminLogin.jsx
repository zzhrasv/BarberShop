import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import './Admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if already logged in
  React.useEffect(() => {
    if (localStorage.getItem('adminAuth') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post('/api/admin/login', {
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem('adminAuth', 'true');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      if (!err.response) {
        setError('Server tidak merespons. Pastikan backend sudah dijalankan.');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      }
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

          {error && <div className="error-message" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', color: '#ff4d4d', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(255, 0, 0, 0.2)', textAlign: 'center' }}>{error}</div>}

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
              <div className="password-input-wrapper" style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  style={{ paddingRight: '3rem' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle-btn"
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.25rem'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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
