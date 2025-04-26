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
    doc.text(`Total ESG Score: ${scores.totalScore.toFixed(2)}`, 20, 50);
    doc.text(`Rating: ${scores.rating}`, 20, 70);

    doc.save('esg-report.pdf');
  };

  return (
    <div>
      <h1>Your ESG Score</h1>
      <p>Total ESG Score: {scores.totalScore.toFixed(2)}</p>
      <p>Rating: {scores.rating}</p>
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
}

export default ResultPage;
