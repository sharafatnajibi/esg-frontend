import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to ESG App</h1>
      <button onClick={() => navigate('/signup')}>Signup</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}

export default LandingPage;
