const pdfInput = document.getElementById("pdfInput");
const processBtn = document.getElementById("processBtn");
const downloadBtn = document.getElementById("downloadBtn");
const status = document.getElementById("status");

let modifiedPdfBytes;

// Enable the Process button after file selection
pdfInput.addEventListener("change", () => {
  processBtn.disabled = !pdfInput.files.length;
});

// Process the PDF
processBtn.addEventListener("click", async () => {
  if (!pdfInput.files.length) return;

  const file = pdfInput.files[0];
  const fileReader = new FileReader();

  fileReader.onload = async function () {
  try {
    const pdfDoc = await PDFLib.PDFDocument.load(fileReader.result);
    console.log("PDF loaded successfully");

    const pages = pdfDoc.getPages();
    if (pages.length === 0) {
      status.textContent = "No pages found in the PDF.";
      return;
    }

    // PDF manipulation logic...
  } catch (error) {
    console.error("Error loading PDF:", error);
    status.textContent = "Failed to process PDF: " + error.message;
  }
};


      // Add a blank page if the number of pages is odd
      if (numPages % 2 !== 0) {
        pdfDoc.addPage();
      }

      // Separate odd and even pages
      const oddPages = [];
      const evenPages = [];
      pages.forEach((page, index) => {
        if ((index + 1) % 2 === 0) {
          evenPages.push(page);
        } else {
          oddPages.push(page);
        }
      });

      // Reverse the even pages
      evenPages.reverse();

      // Create a new PDF document
      const newPdfDoc = await PDFLib.PDFDocument.create();

      // Add pages in alternating order
      for (let i = 0; i < oddPages.length; i++) {
        const [oddPage] = await newPdfDoc.copyPages(pdfDoc, [oddPages[i].getIndex()]);
        newPdfDoc.addPage(oddPage);

        if (i < evenPages.length) {
          const [evenPage] = await newPdfDoc.copyPages(pdfDoc, [evenPages[i].getIndex()]);
          newPdfDoc.addPage(evenPage);
        }
      }

      // Serialize the PDF to bytes
      modifiedPdfBytes = await newPdfDoc.save();
      downloadBtn.disabled = false;
      status.textContent = "PDF processed successfully!";
    } catch (error) {
      console.error("Error processing PDF:", error);
      status.textContent = "Failed to process PDF.";
    }
  };

  fileReader.readAsArrayBuffer(file);
});

// Download the modified PDF
downloadBtn.addEventListener("click", () => {
  if (!modifiedPdfBytes) return;

  const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "output.pdf";
  link.click();
});
