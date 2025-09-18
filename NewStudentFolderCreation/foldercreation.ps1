# This script requires a namelist.csv in the directory it's ran
# a template is provided.
Import-Csv .\namelist.csv -Header First,Last | Foreach-Object{
    $folderName = $_.First + " " + $_.Last
    New-Item -ItemType Directory -Force -Path .\$folderName
}