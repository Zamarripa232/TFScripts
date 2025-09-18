# splitpdf.py
# by Floyd Zamarripa
#
# splitpdf.py will take a source file and split it into
# multiple single page pdfs. Rotating if necessary.
#
# used via command line: .\splitpdf.py SourcePDFName.pdf
#
# Requires PyPDF2
# if python3 is installed, you can install PyPDF2 via pip
# Type this in powershell: pip install PyPDF2
#########################################################

import PyPDF2, sys
args = sys.argv

# Make sure it was ran properly
if len(args) < 3:
    print("How to: .\\splitpdf.py <input_pdf.pdf> <# of pages per split>")
    sys.exit(1)

pdf_file_path = args[1]
pages_per_split = int(args[2])

with open(pdf_file_path, 'rb') as pdf_file:
    reader = PyPDF2.PdfReader(pdf_file)
    total_pages = len(reader.pages)    

    # The script will loop through chunks of "pages per split"
    for i in range(0, total_pages, pages_per_split):
        writer = PyPDF2.PdfWriter()

        # Add those pages to the writer
        for j in range(i, min(i + pages_per_split, total_pages)):
            writer.add_page(reader.pages[j])
            # Uncomment the following line if you need to rotate the pages
            # writer.add_page(reader.pages[j]).rotate(270)

        # Save each chunk as a new file
        output_filename = f'{(i // pages_per_split) + 1} - Loan Agreement.pdf'
        with open(output_filename, 'wb') as output_pdf:
            writer.write(output_pdf)

print("Finished splitting")
