# sortstudents.ps1
# by Floyd Zamarripa
#
# sortstudents.ps1 will take our split documentation pdfs named in the format
# "Firstname Lastname - DOCUMENT NAME.pdf" and move them to their appropriate
# student folder.
#
# Requires the ability to run a powershell script.
# Usage:
# Edit the script's three folder path lines, save, and then run the script 
# either by right-clicking and "Run with PowerShell" or within PowerShell
# by running the command ".\sortstudents.ps1" from within the script directory.

# Set the path for the source folder that contains all the named student pdfs
# And also set the destination folders. 
$sourceFolder = "source folder path here"
$amFolder     = "AM folder location and path here"
$pmFolder     = "PM folder location and path here"

# Get all PDFs in the source folder
Get-ChildItem -Path $sourceFolder -Filter "*.pdf" | ForEach-Object {
    # Takes the student name on the left hand side of the " - BRIDGE.pdf" or whatever else we named it
    $studentName = ($_.BaseName -split " - ")[0]

    # Makes the expected paths
    $amPath = Join-Path $amFolder $studentName
    $pmPath = Join-Path $pmFolder $studentName

    # Test-Path checks to see if the path exists, if it does it moves the pdf there
    # It also checks if the file already exists there, like you already have one
    # or forgot to rename them properly as I have done in the past.
    if ((Test-Path (Join-Path $amPath (Split-Path $_.FullName -Leaf))) -or (Test-Path (Join-Path $pmPath (Split-Path $_.FullName -Leaf)))) {
        Write-Host "$studentName skipped because file already exists at destination"
    }
    elseif (Test-Path $amPath) {
        Move-Item $_.FullName $amPath
        Write-Host "Moved $($_.Name) to $amPath"
    }
    elseif (Test-Path $pmPath) {
        Move-Item $_.FullName $pmPath
        Write-Host "Moved $($_.Name) to $pmPath"
    }
    else {
        Write-Host "$studentName skipped since I didn't find a matching folder"
    }
}