import { useNavigate } from 'react-router-dom';

function SelectFieldPage() {
  const navigate = useNavigate();

  const handleSelect = (field) => {
    localStorage.setItem('field', field); // Save selected field
    navigate('/form'); // Go to form
  };

  return (
    <div>
      <h2>Select Your Field of Work</h2>
      <button onClick={() => handleSelect('Finance')}>Finance</button>
      <button onClick={() => handleSelect('IT')}>IT</button>
      <button onClick={() => handleSelect('Wholesale')}>Wholesale</button>
    </div>
  );
}

export default SelectFieldPage;
