const pdfInput = document.getElementById("pdfInput");
const processBtn = document.getElementById("processBtn");
const downloadBtn = document.getElementById("downloadBtn");
const status = document.getElementById("status");
const progressContainer = document.getElementById("progressContainer");
const uploadProgress = document.getElementById("uploadProgress");
const progressPercentage = document.getElementById("progressPercentage");

let modifiedPdfBytes;

// Enable the Process button after file selection
pdfInput.addEventListener("change", () => {
  processBtn.disabled = !pdfInput.files.length;
  progressContainer.style.display = 'none'; // Hide progress bar initially
});

// Process the PDF
processBtn.addEventListener("click", async () => {
  if (!pdfInput.files.length) return;

  const file = pdfInput.files[0];
  const fileReader = new FileReader();

  // Show the progress bar when file starts loading
  progressContainer.style.display = 'block';

  fileReader.onloadstart = () => {
    uploadProgress.value = 0;
    progressPercentage.textContent = '0%';
  };

  fileReader.onprogress = (event) => {
    if (event.lengthComputable) {
      const progress = (event.loaded / event.total) * 100;
      uploadProgress.value = progress;
      progressPercentage.textContent = `${Math.round(progress)}%`;
    }
  };

  fileReader.onload = async function () {
    try {
      const pdfDoc = await PDFLib.PDFDocument.load(fileReader.result);
      const pages = pdfDoc.getPages();
      const numPages = pages.length;

      // Add a blank page at the end if the PDF ends at an odd page
      if (numPages % 2 !== 0) {
        pdfDoc.addPage();  // Add blank page at the end
      }

      // Now that the page count is even, separate odd and even pages
      const oddPages = [];
      const evenPages = [];
      const allPages = pdfDoc.getPages();  // Get updated pages including the new blank page if added
      allPages.forEach((page, index) => {
        if ((index + 1) % 2 === 0) {
          evenPages.push(index); // Save the index of even pages
        } else {
          oddPages.push(index); // Save the index of odd pages
        }
      });

      // Reverse the even pages
      evenPages.reverse();

      // Create a new PDF document
      const newPdfDoc = await PDFLib.PDFDocument.create();

      // Add pages in alternating order
      for (let i = 0; i < oddPages.length; i++) {
        const [oddPage] = await newPdfDoc.copyPages(pdfDoc, [oddPages[i]]);
        newPdfDoc.addPage(oddPage);

        if (i < evenPages.length) {
          const [evenPage] = await newPdfDoc.copyPages(pdfDoc, [evenPages[i]]);
          newPdfDoc.addPage(evenPage);
        }
      }

      // Serialize the PDF to bytes
      modifiedPdfBytes = await newPdfDoc.save();
      downloadBtn.disabled = false;
      status.textContent = "PDF processed successfully!";
      progressContainer.style.display = 'none'; // Hide progress bar after completion
    } catch (error) {
      console.error("Error processing PDF:", error);
      status.textContent = "Failed to process PDF.";
      progressContainer.style.display = 'none'; // Hide progress bar after failure
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
