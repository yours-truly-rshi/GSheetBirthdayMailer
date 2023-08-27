function sendwishes() {

  // Company specific details
  var company_name = "XYZ Company";
  var bcc = "admin@gmail.com";

  // Code
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[0]);
  var sheet = spreadsheet.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var startRow = 2;
  var employee_message = "Your dedication and hard work shine brightly every day. May this special day bring you joy, success, and a year filled with amazing accomplishments. Enjoy your day to the fullest!";
  var client_message = "Your partnership means a lot to us, and we're grateful for the trust you've placed in our services. May this year be prosperous and joyful for you. Cheers to celebrating another year of success!";
  for (var i =startRow ; i <= lastRow; i++) {
    if(sheet.getRange(i, 4).getValue()==true) {
      var name = sheet.getRange(i, 1).getValue();
      var recipient = sheet.getRange(i, 2).getValue();
      var category = sheet.getRange(i, 5).getValue();
      var message = "";
      if (category=="Client"){
        message = client_message;
      }
      else{
        message = employee_message;
      }
      var template_payload =
      {
        name: name,
        message: message,
        company_name: company_name
      };
      const subject = "Happy Birthday " + name;
      var emailTemplate = HtmlService.createTemplateFromFile('mail_template');
      emailTemplate.template_payload = template_payload;
      var emailBody = emailTemplate.evaluate().getContent();
      GmailApp.sendEmail(
        recipient,
        subject,
        "",
        {
          bcc: bcc,
          htmlBody: emailBody,
          name: company_name
        }
      );
    }
  }
}