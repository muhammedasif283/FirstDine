import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
      if (!username || !password) return;
      await login(username);
      navigate('/');
  };

  return (
      <div className="container" style={{ maxWidth: '450px', padding: '120px 20px', minHeight: '80vh' }}>
          <div className="card p-6" style={{ textAlign: 'center' }}>
              <i className="ph-fill ph-user-circle" style={{ fontSize: '4.5rem', color: 'var(--brand-primary)', marginBottom: '15px' }}></i>
              <h2 className="mb-4">Welcome to FirstDine</h2>
              <form onSubmit={handleLogin}>
                  <div className="form-group" style={{ textAlign: 'left' }}>
                      <label>Username</label>
                      <input type="text" className="form-control" placeholder="Create or enter a username" required value={username} onChange={e => setUsername(e.target.value)} />
                  </div>
                  <div className="form-group" style={{ textAlign: 'left' }}>
                      <label>Password</label>
                      <input type="password" className="form-control" placeholder="Enter password" required value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary mt-4" style={{ width: '100%' }}>Login / Create Account</button>
              </form>
          </div>
      </div>
  );
}

export default Login;
