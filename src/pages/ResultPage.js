import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Import jsPDF

function ResultPage() {
  const { state } = useLocation();
  const { scores } = state;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('ESG Score Report', 20, 20);

    doc.setFontSize(16);
    doc.text(`Environmental Score: ${scores.environmental}`, 20, 40);
    doc.text(`Social Score: ${scores.social}`, 20, 55);
    doc.text(`Governance Score: ${scores.governance}`, 20, 70);
    doc.setFontSize(18);
    doc.text(`Total ESG Score: ${scores.totalScore.toFixed(2)}`, 20, 90);

    doc.save('esg-report.pdf'); // Downloads the file
  };

  return (
    <div>
      <h1>Your ESG Score</h1>
      <p>Environmental: {scores.environmental}</p>
      <p>Social: {scores.social}</p>
      <p>Governance: {scores.governance}</p>
      <h2>Total ESG Score: {scores.totalScore.toFixed(2)}</h2>

      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
}

export default ResultPage;
