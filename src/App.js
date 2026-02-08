import React, { useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const data = [
  { name: "Item A", amount: 400 },
  { name: "Item B", amount: 300 },
  { name: "Item C", amount: 200 },
];

function App() {
  const invoiceRef = useRef();

  const downloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="App">
      <button onClick={downloadPDF} style={{ marginBottom: 20 }}>
        Download Invoice PDF
      </button>

      <div
        ref={invoiceRef}
        style={{
          padding: 20,
          width: 800,
          background: "#fff",
          color: "#000",
          fontFamily: "Arial",
        }}
      >
        <h2>Invoice</h2>

        <p>
          <strong>Invoice No:</strong> INV-1001
        </p>
        <p>
          <strong>Date:</strong> 06-Feb-2026
        </p>

        <hr />

        <table
          width="100%"
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ marginTop: 30 }}>Amount Distribution</h3>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h3>Total: ₹900</h3>
      </div>
    </div>
  );
}

export default App;
