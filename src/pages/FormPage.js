import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const navigate = useNavigate();
  const field = localStorage.getItem('field') || 'Full ESG Scorecard';

  const [formData, setFormData] = useState({
    scope12CO2: '',
    energyIntensity: '',
    waterWithdrawal: '',
    recyclingRate: '',
    landDisturbed: '',
    landRehabilitated: '',
    safetyTRIFR: '',
    genderDiversity: '',
    localEmployment: '',
    communityInvestment: '',
    collectiveBargaining: '',
    indigenousEngagement: false,
    trainingHours: '',
    humanRightsGrievance: false,
    boardIndependence: '',
    antiCorruptionPolicy: false,
    whistleblowerSystem: false,
    revenueTransparency: '',
    contractTransparency: '',
    beneficialOwnership: false,
    supplierCompliance: false,
    politicalEngagement: false,
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
      <h2>Full ESG Scorecard for {field}</h2>

      {/* Environmental */}
      <input type="number" placeholder="Scope 1+2 CO₂ Emissions (t CO₂/ton metal)"
        value={formData.scope12CO2}
        onChange={(e) => setFormData({ ...formData, scope12CO2: e.target.value })}
      />
      <input type="number" placeholder="Energy Intensity (GJ/ton material moved)"
        value={formData.energyIntensity}
        onChange={(e) => setFormData({ ...formData, energyIntensity: e.target.value })}
      />
      <input type="number" placeholder="Water Withdrawal Intensity (m³/ton processed)"
        value={formData.waterWithdrawal}
        onChange={(e) => setFormData({ ...formData, waterWithdrawal: e.target.value })}
      />
      <input type="number" placeholder="Recycling or Tailings Reuse (%)"
        value={formData.recyclingRate}
        onChange={(e) => setFormData({ ...formData, recyclingRate: e.target.value })}
      />
      <input type="number" placeholder="Total Land Disturbed by Operations (Hectares/ton)"
        value={formData.landDisturbed}
        onChange={(e) => setFormData({ ...formData, landDisturbed: e.target.value })}
      />
      <input type="number" placeholder="Percentage of Disturbed Land Rehabilitated Annually (%)"
        value={formData.landRehabilitated}
        onChange={(e) => setFormData({ ...formData, landRehabilitated: e.target.value })}
      />

      {/* Social */}
      <input type="number" placeholder="Safety (TRIFR incidents/million hours)"
        value={formData.safetyTRIFR}
        onChange={(e) => setFormData({ ...formData, safetyTRIFR: e.target.value })}
      />
      <input type="number" placeholder="Workforce Gender Diversity (%)"
        value={formData.genderDiversity}
        onChange={(e) => setFormData({ ...formData, genderDiversity: e.target.value })}
      />
      <input type="number" placeholder="Local Employment Rate (%)"
        value={formData.localEmployment}
        onChange={(e) => setFormData({ ...formData, localEmployment: e.target.value })}
      />
      <input type="number" placeholder="Community Investment (% pre-tax profit)"
        value={formData.communityInvestment}
        onChange={(e) => setFormData({ ...formData, communityInvestment: e.target.value })}
      />
      <input type="number" placeholder="Collective Bargaining Coverage (%)"
        value={formData.collectiveBargaining}
        onChange={(e) => setFormData({ ...formData, collectiveBargaining: e.target.value })}
      />
      <label>
        <input type="checkbox" checked={formData.indigenousEngagement}
          onChange={(e) => setFormData({ ...formData, indigenousEngagement: e.target.checked })}
        />
        Indigenous Engagement (FPIC Compliance)
      </label>
      <input type="number" placeholder="Employee Training Hours (hours/employee/year)"
        value={formData.trainingHours}
        onChange={(e) => setFormData({ ...formData, trainingHours: e.target.value })}
      />
      <label>
        <input type="checkbox" checked={formData.humanRightsGrievance}
          onChange={(e) => setFormData({ ...formData, humanRightsGrievance: e.target.checked })}
        />
        Human Rights Grievances Handling (Transparent Reporting)
      </label>

      {/* Governance */}
      <input type="number" placeholder="Board Independence (%)"
        value={formData.boardIndependence}
        onChange={(e) => setFormData({ ...formData, boardIndependence: e.target.value })}
      />
      <label>
        <input type="checkbox" checked={formData.antiCorruptionPolicy}
          onChange={(e) => setFormData({ ...formData, antiCorruptionPolicy: e.target.checked })}
        />
        Anti-Corruption Policy Existence
      </label>
      <label>
        <input type="checkbox" checked={formData.whistleblowerSystem}
          onChange={(e) => setFormData({ ...formData, whistleblowerSystem: e.target.checked })}
        />
        Whistleblower System Availability
      </label>
      <input type="text" placeholder="Revenue and Payments Transparency (Full/Partial/None)"
        value={formData.revenueTransparency}
        onChange={(e) => setFormData({ ...formData, revenueTransparency: e.target.value })}
      />
      <input type="text" placeholder="Contract Transparency (Full/Partial/None)"
        value={formData.contractTransparency}
        onChange={(e) => setFormData({ ...formData, contractTransparency: e.target.value })}
      />
      <label>
        <input type="checkbox" checked={formData.beneficialOwnership}
          onChange={(e) => setFormData({ ...formData, beneficialOwnership: e.target.checked })}
        />
        Beneficial Ownership Disclosure
      </label>
      <label>
        <input type="checkbox" checked={formData.supplierCompliance}
          onChange={(e) => setFormData({ ...formData, supplierCompliance: e.target.checked })}
        />
        Supplier Compliance Programs
      </label>
      <label>
        <input type="checkbox" checked={formData.politicalEngagement}
          onChange={(e) => setFormData({ ...formData, politicalEngagement: e.target.checked })}
        />
        Political Engagement Disclosure
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormPage;
