# TFScripts
Convenient scripts for tasks at TF, although likely useful elsewhere if modified.
# SplitPDF
This is a Python script takes is used to split our student intake documentation. It takes a large pdf and splits it every X pages. It can also rotate pages if a portion of code is modified.
# NewStudentFolderCreation
This PowerShell script creates the folder structure for storing documentation for a group of incoming students using a CSV as input.
# SortStudents
Once the student intake documentation is split, the folder structure is created on the sharepoint, and the files are renamed with the student name, this PowerShell script will sort the student PDFS to their appropriate folder on the company sharepoint.
# JobAlerty
This is a Python script used to quickly build out the list of HTML formatted job listings and descriptions for the weekly job alert. Uses a reference Excel spreadsheet as input and outputs the necessary html into a txt file for convenient copying.
# ConsolidateJATs
This is the Google Apps Script that runs within the main JAT spreadsheet at an hourly schedule that consolidates all the student job trackers.