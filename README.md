# Grocery Scanner

## Overview

Grocery Scanner is a web application that utilizes computer vision to recognize grocery items and their weights using a camera. The application captures video from the camera, processes the frames to detect products and weights, and logs the data into a Google Sheets document.

## Features

- **Weight Recognition**: Uses Tesseract.js for Optical Character Recognition (OCR) to read weights displayed on scales.
- **Product Recognition**: Utilizes TensorFlow.js and the COCO-SSD model to identify common grocery items in the camera's view.
- **Data Logging**: Automatically logs recognized product names and weights into a Google Sheets document with timestamps.

## Requirements

- Docker
- A Google account to access Google Sheets
- Internet connection for loading models and accessing Google Sheets

## Setup Instructions

1. **Clone the Repository**: 
   Clone this repository to your local machine.

   ```bash
   git clone <repository-url>
   cd grocery-scanner
   ```

2. **Create a Google Sheet**:
   - Create a new Google Sheet and note its ID from the URL (the part after `/d/` and before `/edit`).
   - Update the `SPREADSHEET_ID` variable in `Code.gs` with your Google Sheet ID.

3. **Set Up Google Apps Script**:
   - Open the Google Sheet, go to `Extensions` -> `Apps Script`.
   - Replace the default code with the code from `Code.gs` in this repository.
   - Deploy the script as a web app (make sure to allow access to anyone, or set appropriate permissions).

4. **Create a Docker Image**:
   - Ensure you have Docker installed and running.
   - Open a terminal in the project directory and build the Docker image:

   ```bash
   docker build -t grocery-scanner-app .
   ```

5. **Run the Docker Container**:
   - Start the Docker container:

   ```bash
   docker run -p 8080:8000 --name grocery-scanner grocery-scanner-app
   ```

6. **Access the Application**:
   - Open your web browser and go to `http://localhost:8080` to access the Grocery Scanner application.
   - If you want to access it from a mobile device, you can use a tool like ngrok to expose your local server to the internet.

## Usage Instructions

1. **Start the Camera**: Click the "Start Camera" button to enable the camera feed.
2. **Recognize Weight**: Position the scale's display within the red overlay and click "Recognize Weight" to capture and log the weight.
3. **Recognize Product**: Position the grocery item within the red overlay and click "Recognize Product" to identify the item.
4. **Send Data**: After recognizing both weight and product, click "Send Data" to log the information into Google Sheets.

## Notes

- Ensure good lighting and a clear view of the scale's display for optimal OCR results.
- The application may require adjustments based on the specific grocery items and scales used.
