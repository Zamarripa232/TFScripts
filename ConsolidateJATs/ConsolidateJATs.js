/*
* Loop through the 2nd worksheet, clicking links, pulling data
* into the main sheet and appending it to the end.
*
* TODO: Only update the consolidated sheet if a JAT has been modified since last update
* TODO: Make more task specific functions instead of throwing everything into one mega function
*         -This may be limited by Apps Script limits, I know there's some weird limit about
          custom functions.
*/

function consolidateJATs() {
  const mainSheet = SpreadsheetApp.getActiveSpreadsheet();

  // Get the name of the tab that has the student list
  // Then get the list of students and JAT URLs
  const studentListSheet = mainSheet.getSheetByName("Student List");
  const studentList = studentListSheet.getDataRange().getValues();

  // Get the Consolidated Data tab
  // This will create it if it doesn't exist
  // but that's just a failsafe, it should always exist.
  let dataSheet = mainSheet.getSheetByName("Consolidated Data");


  // Set up header row for consolidated Data tab
  const headers = ["Student Name", "Cohort", "Tracker", "Company", "Job Title", "Application Link", "Status", "Application Date", "1st Interview Date", "2nd Interview Date", "3rd Interview Date", "Offer Received", "Offer Accepted", "Job Started", "Rate of Pay", "Comment"];
  dataSheet.appendRow(headers)

  // Get everything ready to batch
  let allRows = [];

  //Loop through each student, skipping header row
  for (let i = 1; i < studentList.length; i++){
    const studentName = studentList[i][0];
    let sheetUrl = studentList[i][1];
    const studentCohort = studentList[i][2];

    // Checks to make sure there is a URL to open
    if (!sheetUrl) {
      Logger.log(`No URL found for ${studentName}, skipping.`); 
      continue;
    }

    sheetUrl = sheetUrl.toString().trim(); // remove any spaces

    // I've noticed that if the link doesn't have the trailing forwardslash at the end it fails, weird
    // TODO: Figure out why that is

    try {
      const studentSpreadsheet = SpreadsheetApp.openByUrl(sheetUrl);
      const studentSheet = studentSpreadsheet.getSheets()[0];
      
      const lastRow = studentSheet.getLastRow();
      const maxCols = 13; // Columns A–M

      // const studentData = studentSheet.getDataRange().getValues(); Old line
      // Replaced with line below to limit range to prevent errors when students break things
      const studentData = studentSheet.getRange(1, 1, lastRow, maxCols).getValues();

      // Skip header row on each
      for (let j = 1; j < studentData.length; j++) {
        const row = studentData[j];
        const fullRow = [studentName,studentCohort, sheetUrl, ...row]; // spread operator for the win
        allRows.push(fullRow);
      }

      Utilities.sleep(500); // this keeps it from going way too fast and messing up

    } catch (e) {
      Logger.log(`Error processing ${studentName}: ${e}`);
      // TODO: Have this just email me if there's a problem, or like, 
      // put the error in a worksheet or something.
    }
  }
    
  // Batch party, clear datasheet first
  if (!dataSheet){
    dataSheet = mainSheet.insertSheet("Consolidated Data");
  } else {
    dataSheet.clear();
  }
  if (allRows.length > 0){
    dataSheet.getRange(dataSheet.getLastRow()+ 1, 1, allRows.length, allRows[0].length).setValues(allRows);
  }
}