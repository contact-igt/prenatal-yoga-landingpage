/**
 * BirthWave prenatal-yoga enquiry receiver.
 *
 * 1. Create/open the destination Google Sheet.
 * 2. In Extensions > Apps Script, replace this file with this code.
 * 3. Set SPREADSHEET_ID, SHEET_NAME and WEBHOOK_SECRET below.
 * 4. Deploy as Web app: Execute as Me, Who has access: Anyone.
 * 5. Put the deployment URL in GOOGLE_APPS_SCRIPT_URL and the same secret in
 *    GOOGLE_APPS_SCRIPT_SECRET on the Next.js server.
 */

const SPREADSHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "Prenatal Enquiries";
const WEBHOOK_SECRET = "REPLACE_WITH_A_LONG_RANDOM_SECRET";

const HEADERS = [
  "timestamp",
  "fullName",
  "mobile",
  "email",
  "pregnancyWeeks",
  "question",
  "contactConsent",
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: "Missing request body" });
    }

    const payload = JSON.parse(e.postData.contents);
    if (payload.apiKey !== WEBHOOK_SECRET) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    if (!String(payload.fullName || "").trim() || !String(payload.mobile || "").trim() || payload.contactConsent !== true) {
      return jsonResponse({ ok: false, error: "Missing required fields" });
    }

    const sheet = getSheet();
    ensureHeaders(sheet);
    sheet.appendRow(HEADERS.map(function (header) {
      return payload[header] === undefined || payload[header] === null ? "" : payload[header];
    }));

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: "Unable to save enquiry" });
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: "birthwave-enquiry" });
}

function getSheet() {
  const spreadsheet = SPREADSHEET_ID === "PASTE_GOOGLE_SHEET_ID_HERE"
    ? SpreadsheetApp.getActiveSpreadsheet()
    : SpreadsheetApp.openById(SPREADSHEET_ID);

  if (!spreadsheet) {
    throw new Error("Set SPREADSHEET_ID or bind this script to a Google Sheet");
  }

  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders(sheet) {
  if (sheet.getMaxColumns() < HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), HEADERS.length - sheet.getMaxColumns());
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    return;
  }

  const existing = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (existing.join("|") !== HEADERS.join("|")) {
    throw new Error("Row 1 headers do not match the expected enquiry field names");
  }
}

function jsonResponse(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
