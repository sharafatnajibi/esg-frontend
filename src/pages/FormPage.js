import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const navigate = useNavigate();
  const field = localStorage.getItem('field');

  const [formData, setFormData] = useState({
    energy: '',
    diversity: '',
    compliance: false,
    co2: '',
    water: '',
    recycle: '',
    land: '',
    rehab: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first!');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://esg-backend-1.onrender.com/api/compute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const scores = await response.json();
    navigate('/result', { state: { scores } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>ESG Form for {field}</h2>

      {field === 'Full ESG Scorecard' ? (
        <>
          <input type="number" placeholder="Scope 1+2 CO₂ (ton/metal)"
                 value={formData.co2}
                 onChange={(e) => setFormData({ ...formData, co2: e.target.value })} />
          <input type="number" placeholder="Energy Intensity (GJ/ton)"
                 value={formData.energy}
                 onChange={(e) => setFormData({ ...formData, energy: e.target.value })} />
          <input type="number" placeholder="Water Intensity (m³/ton)"
                 value={formData.water}
                 onChange={(e) => setFormData({ ...formData, water: e.target.value })} />
          <input type="number" placeholder="Recycling % or Tailings Reuse"
                 value={formData.recycle}
                 onChange={(e) => setFormData({ ...formData, recycle: e.target.value })} />
          <input type="number" placeholder="Land Disturbed (Hectares/ton)"
                 value={formData.land}
                 onChange={(e) => setFormData({ ...formData, land: e.target.value })} />
          <input type="number" placeholder="% Land Rehabilitated Annually"
                 value={formData.rehab}
                 onChange={(e) => setFormData({ ...formData, rehab: e.target.value })} />
        </>
      ) : (
        <>
          <input type="number" placeholder="Energy Consumption"
                 value={formData.energy}
                 onChange={(e) => setFormData({ ...formData, energy: e.target.value })} />
          <input type="number" placeholder="Employee Diversity (%)"
                 value={formData.diversity}
                 onChange={(e) => setFormData({ ...formData, diversity: e.target.value })} />
          <label>
            <input type="checkbox" checked={formData.compliance}
                   onChange={(e) => setFormData({ ...formData, compliance: e.target.checked })} />
            Policy Compliance
          </label>
        </>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormPage;
