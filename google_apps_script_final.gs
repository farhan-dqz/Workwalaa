/* ================= CONFIG ================= */

const JOB_SHEET = "Jobs";
const APPLICATION_SHEET = "Applications";
const MESSAGE_SHEET = "messages";


/* ================= DEBUG FUNCTION ================= */

function testDebug() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log("Spreadsheet name: " + ss.getName());
  
  // Check if messages sheet exists
  let sheet = ss.getSheetByName(MESSAGE_SHEET);
  if (!sheet) {
    Logger.log("Sheet '" + MESSAGE_SHEET + "' does not exist. Creating it...");
    sheet = ss.insertSheet(MESSAGE_SHEET);
    sheet.appendRow(["Date", "Type", "Name", "Phone", "Email", "Message"]);
    Logger.log("Sheet created successfully");
  } else {
    Logger.log("Sheet '" + MESSAGE_SHEET + "' exists");
  }
  
  // Test adding a row
  sheet.appendRow([
    new Date(),
    "test_type",
    "test_name", 
    "test_phone",
    "test_email",
    "test_message"
  ]);
  Logger.log("Test row added successfully");
}


/* ================= AUTO ID GENERATOR ================= */

function generateJobId(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return 1;

  const ids = sheet.getRange(2, 1, lastRow - 1).getValues().flat();
  const numericIds = ids.filter(id => !isNaN(id)).map(Number);

  return numericIds.length ? Math.max(...numericIds) + 1 : 1;
}


/* ================= GET JOBS ================= */

function doGet() {
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(JOB_SHEET);

    const data = sheet.getDataRange().getValues();
    data.shift();

    const jobs = data.map(row => ({
      id: row[0],
      title: row[1],
      company: row[2],
      location: row[3],
      phone: row[4],
      gender: row[5],
      hrName: row[6],
      workingHours: row[7],
      type: row[8],
      salary: row[9],
      description: row[10],
      requirements: row[11],
      postedDate: row[12],
      status: row[13]
    }));

    return ContentService
      .createTextOutput(JSON.stringify(jobs))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


/* ================= ADD JOB ================= */

function addJob(data) {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(JOB_SHEET);

  const newId = generateJobId(sheet);

  sheet.appendRow([
    newId,
    data.title || "",
    data.company || "",
    data.location || "",
    data.phone || "",
    data.gender || "",
    data.hrName || "",
    data.workingHours || "",
    data.type || "",
    data.salary || "",
    data.description || "",
    data.requirements || "",
    new Date(),
    "active"
  ]);
}


/* ================= ADD APPLICATION ================= */

function addApplication(data) {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(APPLICATION_SHEET);

  sheet.appendRow([
    data.jobId || "",
    data.jobTitle || "",
    data.jobLocation || "",
    data.candidateLocation || "",
    data.fullName || "",
    data.email || "",
    data.phone || "",
    new Date(),
    "new"
  ]);
}


/* ================= ADD MESSAGE (CONTACT FORM) ================= */

function addMessageFromForm(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log("Spreadsheet: " + ss.getName());
    
    let sheet = ss.getSheetByName(MESSAGE_SHEET);
    
    // Create sheet automatically if missing
    if (!sheet) {
      Logger.log("Creating sheet: " + MESSAGE_SHEET);
      sheet = ss.insertSheet(MESSAGE_SHEET);
      sheet.appendRow(["Date", "Type", "Name", "Phone", "Email", "Message"]);
    } else {
      Logger.log("Sheet exists: " + MESSAGE_SHEET);
    }

    // Log the parameters received
    Logger.log("Parameters received:");
    Logger.log("type: " + (e.parameter.type || "NULL"));
    Logger.log("name: " + (e.parameter.name || "NULL"));
    Logger.log("phone: " + (e.parameter.phone || "NULL"));
    Logger.log("email: " + (e.parameter.email || "NULL"));
    Logger.log("message: " + (e.parameter.message || "NULL"));

    // Add the row
    sheet.appendRow([
      new Date(),
      e.parameter.type || "",
      e.parameter.name || "",
      e.parameter.phone || "",
      e.parameter.email || "",
      e.parameter.message || ""
    ]);
    
    Logger.log("Row added successfully to sheet: " + MESSAGE_SHEET);
    
  } catch (error) {
    Logger.log("Error in addMessageFromForm: " + error.toString());
    throw error;
  }
}


/* ================= CORS HANDLER ================= */

function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}


/* ================= POST ROUTER ================= */

function doPost(e) {
  try {
    Logger.log("doPost called");
    Logger.log("Parameters: " + JSON.stringify(e.parameter));
    
    // 🔹 Handle FormData (contact form)
    if (e.parameter && e.parameter.name) {
      Logger.log("Handling FormData contact form");
      addMessageFromForm(e);
      
      return ContentService
        .createTextOutput("success")
        .setMimeType(ContentService.MimeType.TEXT)
        .setHeader("Access-Control-Allow-Origin", "*")
        .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        .setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    // 🔹 Handle JSON (jobs or applications)
    else if (e.postData && e.postData.contents) {
      const data = JSON.parse(e.postData.contents);

      if (data.title !== undefined) {
        addJob(data);
      }
      else if (data.jobTitle !== undefined) {
        addApplication(data);
      }
      else if (data.message !== undefined) {
        const sheet = SpreadsheetApp
          .getActiveSpreadsheet()
          .getSheetByName(MESSAGE_SHEET);

        sheet.appendRow([
          new Date(),
          data.userType || "",
          data.name || "",
          data.phone || "",
          data.email || "",
          data.message || ""
        ]);
      }

      return ContentService
        .createTextOutput("success")
        .setMimeType(ContentService.MimeType.TEXT)
        .setHeader("Access-Control-Allow-Origin", "*")
        .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        .setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    Logger.log("No matching condition in doPost");
    return ContentService
      .createTextOutput("success")
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type");

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return ContentService
      .createTextOutput("error: " + error.toString())
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
}
