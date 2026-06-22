import { saveQuotation } from "../api/quotationApi";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import logo from "../assets/company/logo.png";
import qr from "../assets/company/qr.jpeg";

export const generateQuotation = async (
  customer,
  project,
  selectedComponents,
  total
) => {

  const doc = new jsPDF("p", "mm", "a4");

  // =====================================================
  // COLORS
  // =====================================================

  const GOLD = [212, 175, 55];
  const DARK = [35, 35, 35];
  const LIGHT = [245, 245, 245];

  // =====================================================
  // DATE
  // =====================================================

  const today = new Date();

  const quotationNumber =
    "JIM-" +
    today.getFullYear() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0") +
    "-" +
    Math.floor(Math.random() * 900 + 100);

  const quotationDate =
    today.toLocaleDateString("en-IN");

  // =====================================================
  // HEADER
  // =====================================================

  doc.addImage(
    logo,
    "PNG",
    15,
    10,
    28,
    28
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(21);

  doc.text(
    "JEO INTERIORS & METALS",
    105,
    18,
    {
      align: "center"
    }
  );

  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);

  doc.text(
    "Premium Interior & Metal Solutions",
    105,
    26,
    {
      align: "center"
    }
  );

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.8);

  doc.line(
    15,
    42,
    195,
    42
  );

  // =====================================================
  // COMPANY DETAILS
  // =====================================================

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    "S.L.V Complex, Near Aralikatte",
    105,
    49,
    {
      align: "center"
    }
  );

  doc.text(
    "Sidedahalli, Hesaraghatta Main Road",
    105,
    55,
    {
      align: "center"
    }
  );

  doc.text(
    "Bangalore - 560073",
    105,
    61,
    {
      align: "center"
    }
  );

  doc.text(
    "Phone : +91 8431916378",
    105,
    67,
    {
      align: "center"
    }
  );

  doc.text(
    "Email : info@jeointeriors.com",
    105,
    73,
    {
      align: "center"
    }
  );

  doc.setDrawColor(...GOLD);

  doc.line(
    15,
    79,
    195,
    79
  );

  // =====================================================
  // QUOTATION DETAILS
  // =====================================================

  doc.setFillColor(...LIGHT);

  doc.roundedRect(
    15,
    84,
    180,
    18,
    2,
    2,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  doc.text(
    `Quotation No : ${quotationNumber}`,
    20,
    94
  );

  doc.text(
    `Date : ${quotationDate}`,
    140,
    94
  );

  // =====================================================
  // CUSTOMER DETAILS
  // =====================================================

  let y = 112;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  doc.text(
    "CUSTOMER DETAILS",
    15,
    y
  );

  y += 8;

  doc.roundedRect(
    15,
    y,
    180,
    34,
    2,
    2
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    `Name : ${customer.name}`,
    20,
    y + 8
  );

  doc.text(
    `Phone : ${customer.phone}`,
    20,
    y + 16
  );

  const addressLines =
    doc.splitTextToSize(
      customer.address,
      145
    );

  doc.text(
    "Address :",
    20,
    y + 24
  );

  doc.text(
    addressLines,
    42,
    y + 24
  );

  y += 44;

  // =====================================================
  // PROJECT DETAILS
  // =====================================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  doc.text(
    "PROJECT DETAILS",
    15,
    y
  );

  y += 8;

  doc.roundedRect(
    15,
    y,
    180,
    28,
    2,
    2
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    `Property Type : ${project.propertyType}`,
    20,
    y + 8
  );

  doc.text(
    `Project Type : ${project.projectType}`,
    20,
    y + 16
  );

  doc.text(
    `Area : ${project.squareFeet} sq.ft`,
    20,
    y + 24
  );

  y += 40;
  // =====================================================
  // SELECTED COMPONENTS
  // =====================================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  doc.text(
    "SELECTED INTERIOR COMPONENTS",
    15,
    y
  );

  y += 6;

  // Prepare Table Data

  const tableData = [];

  Object.keys(selectedComponents).forEach((room) => {

    (selectedComponents[room] || []).forEach((component) => {

      // Skip empty quantities

      if (!component.quantity || component.quantity <= 0) return;

      tableData.push([

        room,

        component.name,

        component.variant
          ? component.variant
          : "N/A",

        `${component.quantity} ${component.unit}`

      ]);

    });

  });

  autoTable(doc, {

    startY: y,

    head: [[
      "Room",
      "Component",
      "Variant",
      "Requirement"
    ]],

    body: tableData,

    theme: "grid",

    styles: {

      font: "helvetica",

      fontSize: 10,

      cellPadding: 4,

      valign: "middle"

    },

    headStyles: {

      fillColor: GOLD,

      textColor: 0,

      fontStyle: "bold",

      halign: "center"

    },

    alternateRowStyles: {

      fillColor: [250, 250, 250]

    }

  });

  y = doc.lastAutoTable.finalY + 12;

  // =====================================================
  // PROJECT ESTIMATE BOX
  // =====================================================

  doc.setFillColor(...GOLD);

  doc.roundedRect(

    20,

    y,

    170,

    24,

    3,

    3,

    "F"

  );

  doc.setTextColor(0);

  doc.setFont("helvetica", "bold");

  doc.setFontSize(13);

  doc.text(

    "PROJECT ESTIMATE",

    105,

    y + 8,

    {

      align: "center"

    }

  );

  doc.setFontSize(20);

  doc.text(

    `INR ${total.toLocaleString()}`,

    105,

    y + 18,

    {

      align: "center"

    }

  );

  // Restore black text

  doc.setTextColor(0);

  y += 36;
// =====================================================
// IMPORTANT NOTES
// =====================================================

doc.setFont("helvetica", "bold");
doc.setFontSize(13);

doc.text(
  "IMPORTANT NOTES",
  15,
  y
);

doc.setFont("helvetica", "normal");
doc.setFontSize(10);

const notes = [
  "• This quotation is based on the measurements provided by the customer.",
  "• Final measurements will be taken during the site visit.",
  "• Final pricing may vary depending on actual site conditions.",
  "• GST and additional works will be charged separately if applicable."
];

doc.text(notes, 18, y + 8);

y += 38;

// =====================================================
// QR CODE
// =====================================================

doc.addImage(
  qr,
  "JPEG",
  150,
  y,
  35,
  35
);

doc.setFontSize(9);

doc.text(
  "Scan to connect with us",
  167,
  y + 40,
  {
    align: "center"
  }
);

// =====================================================
// FOOTER
// =====================================================

doc.setDrawColor(...GOLD);

doc.line(
  15,
  275,
  195,
  275
);

doc.setFont("helvetica", "italic");
doc.setFontSize(10);

doc.text(
  "Thank you for choosing JEO Interiors & Metals.",
  105,
  283,
  {
    align: "center"
  }
);

// =====================================================
// SAVE PDF
// =====================================================
const quotationData = {
  quotationNumber,

  customer,

  project,

  components: Object.keys(selectedComponents).flatMap((room) =>
    (selectedComponents[room] || []).map((component) => ({
      room,
      ...component,
    }))
  ),

  total,
};

try {
  await saveQuotation(quotationData);
  console.log("Quotation saved successfully.");
} catch (error) {
  console.error("Failed to save quotation:", error);
}

doc.save(`Quotation-${quotationNumber}.pdf`);

};
