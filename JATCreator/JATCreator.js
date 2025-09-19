function createJATs() {
  // Get the Spreadsheet with names/emails
  const referenceSheet = SpreadsheetApp.getActiveSpreadsheet();
  const namesTab = referenceSheet.getSheetByName('StudentList');
  const namesData = namesTab.getDataRange().getValues();

  // Get the base Spreadsheet to replicate
  // The Value in A1 of the spreadsheet is the document ID (the part after the d in a google drive link)
  // of the blank document to copy.
  const sourceSheet = referenceSheet.getSheetByName('SourceFile');
  const sourceFileID = sourceSheet.getRange('A1').getValue().trim(); // .trim() just in case I added spaces or a newline by accident in the future
  const sourceFile = DriveApp.getFileById(sourceFileID);

  // Set the target directory to have new sheets moved to.
  // This is A2 in the JATCreator's SourceFile tab
  const targetFolderID = sourceSheet.getRange('A2').getValue().trim(); 
  const targetFolder = DriveApp.getFolderById(targetFolderID);

  // Loop of reading the sheet row by row, i starts at 1 so that it skips the first row (headers)
  for (let i = 1; i < namesData.length; i++) {
    const firstName = namesData[i][0];
    const lastName = namesData[i][1];
    const email = namesData[i][2];

    // Create copy the base sheet with name structure: First Last JAT
    // turns out makeCopy(name, destination ID) can also have it created
    // in the right spot
    const newFileName = firstName + ' ' + lastName + ' JAT';
    const newFile = sourceFile.makeCopy(newFileName, targetFolder);

    // add the associated email to the shared list for that file only
    newFile.addEditor(email)

    // Add the newly created file's URL back to the URL column of the JATCreator sheet
    const url = 'https://docs.google.com/spreadsheets/d/' + newFile.getId() + '/';
    namesTab.getRange(i+1, 4).setValue(url);

    // Before looping again, wait 0.2 seconds in case of rate limits
    Utilities.sleep(200);
  }
}