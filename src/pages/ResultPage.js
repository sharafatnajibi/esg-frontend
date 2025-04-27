import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';

function ResultPage() {
  const { state } = useLocation();
  const { scores } = state;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('ESG Score Report', 20, 20);

    doc.setFontSize(16);
    doc.text(`Environmental Score: ${scores.environmentalScore}`, 20, 50);
    doc.text(`Social Score: ${scores.socialScore}`, 20, 70);
    doc.text(`Governance Score: ${scores.governanceScore}`, 20, 90);
    doc.text(`Final ESG Score: ${scores.finalESGScore}`, 20, 110);
    doc.text(`Rating: ${scores.rating}`, 20, 130);

    doc.save('esg-scorecard.pdf');
  };

  return (
    <div>
      <h1>Your ESG Assessment Result</h1>

      <p><strong>Environmental Score:</strong> {scores.environmentalScore}</p>
      <p><strong>Social Score:</strong> {scores.socialScore}</p>
      <p><strong>Governance Score:</strong> {scores.governanceScore}</p>
      <p><strong>Final ESG Score:</strong> {scores.finalESGScore}</p>
      <p><strong>Rating:</strong> {scores.rating}</p>

      <button onClick={handleDownloadPDF}>Download PDF Report</button>
    </div>
  );
}

export default ResultPage;
