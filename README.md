goto: canonprinter.netlify.app to use as a web app
# CanonLBP2900Both
This web based application helps to print the document sequently when the printer doesn't provide the functionality to print on both sides
Steps:
1. Convert the pdf using the web application
2. Print the odd pages only first
3. Then print the even pages but don't sort them manually
4. done

# PDF Processor for Duplex Printing

## Overview
This tool helps solve the sorting problem of a one-sided printer when printing on both sides of the paper. It processes an uploaded PDF, ensuring that:
- If the PDF ends on an odd page, a blank page is added at the end to make the total number of pages even.
- The pages are then rearranged such that odd and even pages are alternated in the final output, making it ready for duplex (double-sided) printing.

The tool uses **HTML**, **CSS**, and **JavaScript** along with the **PDF-lib library** to handle PDF processing directly in the browser.

---

## Features

- **Upload PDF**: Allows you to upload a PDF file.
- **Page Reordering**: If the PDF has an odd number of pages, a blank page is added at the end to make it even. Odd and even pages are then alternated.
- **Progress Bar**: Displays the progress of the file processing, showing the percentage of the file uploaded.
- **Download Processed PDF**: After processing, you can download the PDF with the corrected page order, ready for duplex printing.

---

## Prerequisites

- A modern web browser (Google Chrome, Mozilla Firefox, etc.) that supports HTML5, CSS3, and JavaScript.
- Internet connection for accessing the PDF-lib library from a CDN.

---

## Usage Instructions

### Step 1: Upload Your PDF
1. Visit the website where the tool is hosted.
2. Click the "Choose File" or "Upload PDF" button to select your PDF file from your device.

### Step 2: Process the PDF
1. After selecting the file, click the **"Process PDF"** button.
2. The tool will automatically check if the PDF has an odd or even number of pages. If the number is odd, a blank page will be added at the end.
3. The pages will be reordered with odd pages first, followed by even pages.

### Step 3: View Progress
- As the file is being processed, a progress bar will be displayed showing the percentage of the file uploaded.
- Once the process is complete, the progress bar will disappear.

### Step 4: Download the Processed PDF
1. After processing, the **"Download Processed PDF"** button will become active.
2. Click the **"Download Processed PDF"** button to download the updated PDF with the corrected page order.

---

## How It Solves the Printing Issue
- **Problem:** When printing on both sides of the paper with a one-sided printer, the printer may end up printing an odd page number on one side and an even page on the other, resulting in disordered prints.
- **Solution:** This tool ensures that the PDF has an even number of pages by adding a blank page if necessary and reordering the pages for correct duplex printing.

---

## Technologies Used
- **HTML** for structure
- **CSS** for styling
- **JavaScript** for functionality
- **PDF-lib** library for handling PDF manipulation

---

## License
This tool is open-source and free to use. You can modify or distribute it according to your needs.

---

## Future Enhancements
- Option to customize the blank page (add custom content).
- Add more processing options, such as page rotation or cropping.

---

## Contact
If you have any questions or feedback, feel free to reach out to:
- **Developer:** Er. Tara Nath Poudel
