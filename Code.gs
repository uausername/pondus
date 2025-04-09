/**
 * ID вашей Google Таблицы. Замените 'YOUR_SHEET_ID' на реальный ID.
 * Его можно найти в URL таблицы: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
 */
var SPREADSHEET_ID = 'YOUR_SHEET_ID'; 

/**
 * Имя листа в таблице, куда будут записываться данные.
 */
var SHEET_NAME = 'Sheet1'; // Или другое имя вашего листа

/**
 * Функция, обрабатывающая GET-запросы. 
 * Можно оставить пустой или возвращать простой ответ.
 */
function doGet(e) {
  return HtmlService.createHtmlOutput("API is active. Use POST requests to send data.");
}

/**
 * Функция, обрабатывающая POST-запросы от вашего веб-приложения.
 */
function doPost(e) {
  var productName = "N/A";
  var productWeight = "N/A";
  var statusMessage = "";

  try {
    // Пытаемся получить параметры из POST-запроса
    // Веб-приложение должно отправлять данные как form data (x-www-form-urlencoded)
    if (e && e.parameter) {
      productName = e.parameter.name ? e.parameter.name : "N/A";
      productWeight = e.parameter.weight ? e.parameter.weight : "N/A";
    } else {
       throw new Error("No parameters found in the request.");
    }

    // Вызываем функцию для записи данных в таблицу
    logEntry(productName, productWeight);
    
    statusMessage = "Success! Added: " + productName + " (" + productWeight + ")";
    
    // Возвращаем текстовый ответ об успехе
    return ContentService.createTextOutput(statusMessage).setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    // Логируем ошибку для отладки (Видно в Apps Script -> Executions)
    Logger.log("Error processing POST request: " + error.message);
    Logger.log("Request parameters: " + JSON.stringify(e ? e.parameter : {}));
    
    statusMessage = "Error processing request: " + error.message;
    
    // Возвращаем текстовый ответ об ошибке
    // В реальном приложении можно возвращать JSON с кодом ошибки
    return ContentService.createTextOutput(statusMessage).setMimeType(ContentService.MimeType.TEXT);
  }
}

/**
 * Записывает одну строку данных в таблицу.
 * @param {string} name Название продукта.
 * @param {string} weight Вес продукта.
 */
function logEntry(name, weight) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    // Если лист не найден, создаем его (опционально)
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Добавляем заголовки, если лист новый
      sheet.appendRow(['Timestamp', 'Product Name', 'Weight']);
    }
    
    // Получаем текущее время в нужном формате и часовом поясе скрипта
    var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
    
    // Добавляем новую строку с данными
    sheet.appendRow([timestamp, name, weight]);
    
    Logger.log("Logged entry: " + timestamp + ", " + name + ", " + weight);

  } catch (error) {
      Logger.log("Error in logEntry: " + error.message);
      // Перебрасываем ошибку, чтобы doPost мог ее обработать
      throw error; 
  }
}
