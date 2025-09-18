import pandas as pd

# requires a joblist.xlsx in the root directory of buildjobs.py
# the format for this includes a list of employer partners on a
# Partners tab and the research tab.

# Load the excel file that has the jobs listed
df = pd.read_excel("joblist.xlsx")

# Initialize an empty list that'll contain the
# mailchimp html in the end
html_parts = []


# Iterate through the rows of the excel file
# This can appear complicated but it's basically
# plugging the info into an html template that
# can be pasted into mailchimp's html editor
for _, row in df.iterrows():
    company_line = f'<p class="" style="text-align: left;"><strong>*NEW* {row["Company"]}, {row["Location"]}</strong></p>'
    title_line = f'<p class="" style="text-align: left;"><a href="{row["URL"]}" target="_blank" tabindex="-1">{row["Title"]}</a></p>'
    note_line = f'<p class="" style="text-align: left;">{row["Note"]}</p>'
    spacer = '<p class="" style="text-align: left;"></p>'
    html_parts.extend([company_line, title_line, note_line, spacer])

# Write the "html" out to a text file for
# copying into mailchimp
with open("jobs_mailchimp_output.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(html_parts))

print("Success!")
