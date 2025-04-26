import { useNavigate } from 'react-router-dom';

function SelectFieldPage() {
  const navigate = useNavigate();

  const handleSelect = (field) => {
    localStorage.setItem('field', field);
    navigate('/form');
  };

  return (
    <div>
      <h2>Select Your Field</h2>
      <button onClick={() => handleSelect('Finance')}>Finance</button>
      <button onClick={() => handleSelect('IT')}>IT</button>
      <button onClick={() => handleSelect('Wholesale')}>Wholesale</button>
      <button onClick={() => handleSelect('Full ESG Scorecard')}>Full ESG Scorecard</button>
    </div>
  );
}

export default SelectFieldPage;
