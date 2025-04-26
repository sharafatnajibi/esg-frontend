import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ energy: '', diversity: '', compliance: false });
  const field = localStorage.getItem('field'); // Get the selected field

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first!');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/compute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const scores = await response.json();
    navigate('/result', { state: { scores } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>ESG Assessment for {field}</h2>

      {/* Show different first question based on selected field */}
      {field === 'Finance' && (
        <>
          <input type="number" placeholder="Financial Risk Management Score"
                 value={formData.energy}
                 onChange={(e) => setFormData({ ...formData, energy: e.target.value })} />
        </>
      )}

      {field === 'IT' && (
        <>
          <input type="number" placeholder="Data Center Energy Consumption"
                 value={formData.energy}
                 onChange={(e) => setFormData({ ...formData, energy: e.target.value })} />
        </>
      )}

      {field === 'Wholesale' && (
        <>
          <input type="number" placeholder="Logistics Carbon Footprint"
                 value={formData.energy}
                 onChange={(e) => setFormData({ ...formData, energy: e.target.value })} />
        </>
      )}

      {/* Common questions for all fields */}
      <input type="number" placeholder="Employee Diversity (%)"
             value={formData.diversity}
             onChange={(e) => setFormData({ ...formData, diversity: e.target.value })} />

      <label>
        <input type="checkbox" checked={formData.compliance}
               onChange={(e) => setFormData({ ...formData, compliance: e.target.checked })} />
        Policy Compliance
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormPage;
