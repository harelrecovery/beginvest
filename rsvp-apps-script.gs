/**
 * Manny & Kimera — RSVP backend
 *
 * This script turns a Google Sheet into a free API endpoint that your
 * index.html RSVP form can submit to. Every RSVP becomes a new row in
 * the Sheet, so you track responses exactly like a spreadsheet — because
 * it is one.
 *
 * SETUP — see README.md for the full walkthrough. Short version:
 * 1. Create a Google Sheet, add header row: Timestamp | Full Name | Email
 *    | Attending | Adults | Kids | Guest Names | Dietary / Notes
 * 2. Extensions > Apps Script, paste this file in, save.
 * 3. Deploy > New deployment > Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the deployment URL into SCRIPT_URL in index.html.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RSVPs')
    || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.fullName || '',
    data.email || '',
    data.attending || '',
    data.adults || '',
    data.kids || '',
    data.guestNames || '',
    data.dietary || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: lets you sanity-check the deployment by visiting the web
// app URL directly in a browser.
function doGet(e) {
  return ContentService
    .createTextOutput('RSVP endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
