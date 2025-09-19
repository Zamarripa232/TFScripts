function createJATs() {
  // Get the Spreadsheet with names/emails
  const referenceSheet = SpreadsheetApp.getActiveSpreadsheet();
  const namesTab = referenceSheet.getSheetByName('StudentList');
  const namesData = namesTab.getDataRange().getValues();

  // TODO Get the base Spreadsheet to replicate
  // TODO Set the target directory to have new sheets moved to
  // TODO Get the names of the tabs to work with
  // TODO Loop of reading the sheet row by row
    // TODO within loop, create copy the base sheet with name First Last JAT
    // TODO add the associated email to the shared list for that file only
    // TODO move the file if necessary to the target directory
}