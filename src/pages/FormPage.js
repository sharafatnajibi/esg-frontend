import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const navigate = useNavigate();
  const field = localStorage.getItem('field') || 'Full ESG Scorecard';

  const [formData, setFormData] = useState({
    scope12CO2: '',
    scope3CO2: '',
    energyIntensity: '',
    waterIntensity: '',
    wasteRecovery: '',
    landDisturbed: '',
    landRehabilitated: '',
    workforceDiversity: '',
    employeeTurnover: '',
    humanRightsPolicy: false,
    boardDiversity: '',
    antiBriberyPolicy: false,
    esgReporting: false,
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
      <h2>ESG Full Scorecard for {field}</h2>

      <input
        type="number"
        placeholder="Scope 1+2 CO₂ Emissions (tons/unit)"
        value={formData.scope12CO2}
        onChange={(e) => setFormData({ ...formData, scope12CO2: e.target.value })}
      />
      <input
        type="number"
        placeholder="Scope 3 CO₂ Emissions (tons/unit)"
        value={formData.scope3CO2}
        onChange={(e) => setFormData({ ...formData, scope3CO2: e.target.value })}
      />
      <input
        type="number"
        placeholder="Energy Intensity (GJ/unit)"
        value={formData.energyIntensity}
        onChange={(e) => setFormData({ ...formData, energyIntensity: e.target.value })}
      />
      <input
        type="number"
        placeholder="Water Intensity (m³/unit)"
        value={formData.waterIntensity}
        onChange={(e) => setFormData({ ...formData, waterIntensity: e.target.value })}
      />
      <input
        type="number"
        placeholder="Waste Recovery Rate (%)"
        value={formData.wasteRecovery}
        onChange={(e) => setFormData({ ...formData, wasteRecovery: e.target.value })}
      />
      <input
        type="number"
        placeholder="Land Disturbed (hectares/ton)"
        value={formData.landDisturbed}
        onChange={(e) => setFormData({ ...formData, landDisturbed: e.target.value })}
      />
      <input
        type="number"
        placeholder="% Land Rehabilitated Annually"
        value={formData.landRehabilitated}
        onChange={(e) => setFormData({ ...formData, landRehabilitated: e.target.value })}
      />
      <input
        type="number"
        placeholder="Workforce Diversity (%)"
        value={formData.workforceDiversity}
        onChange={(e) => setFormData({ ...formData, workforceDiversity: e.target.value })}
      />
      <input
        type="number"
        placeholder="Employee Turnover Rate (%)"
        value={formData.employeeTurnover}
        onChange={(e) => setFormData({ ...formData, employeeTurnover: e.target.value })}
      />

      <label>
        <input
          type="checkbox"
          checked={formData.humanRightsPolicy}
          onChange={(e) => setFormData({ ...formData, humanRightsPolicy: e.target.checked })}
        />
        Human Rights Policy in Place
      </label>

      <input
        type="number"
        placeholder="Board Diversity (%)"
        value={formData.boardDiversity}
        onChange={(e) => setFormData({ ...formData, boardDiversity: e.target.value })}
      />

      <label>
        <input
          type="checkbox"
          checked={formData.antiBriberyPolicy}
          onChange={(e) => setFormData({ ...formData, antiBriberyPolicy: e.target.checked })}
        />
        Anti-Bribery Policy in Place
      </label>

      <label>
        <input
          type="checkbox"
          checked={formData.esgReporting}
          onChange={(e) => setFormData({ ...formData, esgReporting: e.target.checked })}
        />
        ESG Reporting Done
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormPage;
