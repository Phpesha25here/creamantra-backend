import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

export const generatePDF = async (stats) => {
  const doc = new jsPDF();

  const ORANGE = [249, 115, 22];
  const DARK = [40, 40, 40];
  const LIGHT = [120, 120, 120];

  doc.setFillColor(...ORANGE);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Sales Report", 14, 18);

  doc.setTextColor(...DARK);
  doc.setFontSize(11);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 18);

  doc.setDrawColor(230, 230, 230);
  doc.line(14, 40, 196, 40);

  doc.setFontSize(14);
  doc.setTextColor(...DARK);
  doc.text("Summary", 14, 50);

  doc.setFontSize(11);
  doc.setTextColor(...LIGHT);

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(14, 55, 60, 25, 3, 3, "F");
  doc.setTextColor(...DARK);
  doc.text("Revenue", 18, 65);
  doc.setTextColor(...ORANGE);
  doc.setFontSize(14);
  doc.text(`₹${stats.totalRevenue || 0}`, 18, 75);

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(80, 55, 60, 25, 3, 3, "F");
  doc.setTextColor(...DARK);
  doc.setFontSize(11);
  doc.text("Orders", 84, 65);
  doc.setTextColor(...ORANGE);
  doc.setFontSize(14);
  doc.text(`${stats.totalOrders || 0}`, 84, 75);

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(146, 55, 50, 25, 3, 3, "F");
  doc.setTextColor(...DARK);
  doc.setFontSize(11);
  doc.text("Customers", 150, 65);
  doc.setTextColor(...ORANGE);
  doc.setFontSize(14);
  doc.text(`${stats.totalUsers || 0}`, 150, 75);

  const tableData =
    stats.topProducts?.map((p) => [
      p._id || "Product" ,
      p.sold,
      `₹${p.revenue}`,
    ]) || [];

  autoTable(doc, {
    startY: 90,
    head: [["Product", "Sold", "Revenue"]],
    body: tableData,
    headStyles: {
      fillColor: ORANGE,
      textColor: 255,
    },
    styles: {
      fontSize: 10,
    },
  });

  const chartElement = document.getElementById("chart");

  if (chartElement) {
    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL("image/png");

    doc.addPage();

    doc.setFontSize(16);
    doc.setTextColor(...DARK);
    doc.text("Sales Graph", 14, 20);

    doc.addImage(imgData, "PNG", 10, 30, 190, 100);
  }

  doc.save("sales-report.pdf");
};