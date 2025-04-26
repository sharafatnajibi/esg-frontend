import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 🧠 KPI Brain Map
const industryKPI = {
  Finance: [
    { name: 'Portfolio Carbon Intensity', type: 'number', placeholder: 'Carbon Intensity (tons CO₂/portfolio)' },
    { name: 'Fair Lending Practices', type: 'checkbox', placeholder: 'Fair Lending Compliance' },
  ],
  IT: [
    { name: 'Data Center Energy Usage', type: 'number', placeholder: 'Energy Use (MWh/year)' },
    { name: 'Workforce Diversity', type: 'number', placeholder: 'Employee Diversity (%)' },
    { name: 'Cybersecurity Compliance', type: 'checkbox', placeholder: 'Data Security Compliance' },
  ],
  Wholesale: [
    { name: 'Logistics Carbon Footprint', type: 'number', placeholder: 'CO₂ Emissions (kg/ton)' },
    { name: 'Employee Turnover Rate', type: 'number', placeholder: 'Turnover Rate (%)' },
  ],
  Construction: [
    { name: 'Water Usage', type: 'number', placeholder: 'Water Consumption (m³/year)' },
    { name: 'Safety Incident Rate', type: 'number', placeholder: 'Safety Incidents (%)' },
  ],
  Manufacturing: [
    { name: 'CO₂ Emissions per Product', type: 'number', placeholder: 'CO₂ per Unit (kg/unit)' },
    { name: 'Waste Recycling Rate', type: 'number', placeholder: 'Recycling Rate (%)' },
  ],
  "Full ESG Scorecard": [
    { name: 'Scope 1+2 CO₂', type: 'number', placeholder: 'Scope 1+2 CO₂ (ton/metal)' },
    { name: 'Energy Intensity', type: 'number', placeholder: 'Energy Intensity (GJ/ton)' },
    { name: 'Water Intensity', type: 'number', placeholder: 'Water Intensity (m³/ton)' },
    { name: 'Recycling % or Tailings Reuse', type: 'number', placeholder: 'Recycling % or Reuse' },
    { name: 'Land Disturbed', type: 'number', placeholder: 'Land Disturbed (hectares/ton)' },
    { name: 'Land Rehabilitated', type: 'number', placeholder: '% Land Rehabilitated Annually' },
  ],
};

function FormPage() {
  const navigate = useNavigate();
  const field = localStorage.getItem('field');
  const [formData, setFormData] = useState({});

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

  const selectedKPIs = industryKPI[field] || [];

  return (
    <form onSubmit={handleSubmit}>
      <h2>ESG Assessment for {field}</h2>

      {selectedKPIs.map((kpi, index) => (
        <div key={index}>
          {kpi.type === 'checkbox' ? (
            <label>
              <input type="checkbox"
                     checked={formData[kpi.name] || false}
                     onChange={(e) => setFormData({ ...formData, [kpi.name]: e.target.checked })} />
              {kpi.placeholder}
            </label>
          ) : (
            <input type={kpi.type}
                   placeholder={kpi.placeholder}
                   value={formData[kpi.name] || ''}
                   onChange={(e) => setFormData({ ...formData, [kpi.name]: e.target.value })} />
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormPage;
