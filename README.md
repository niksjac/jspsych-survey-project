# 🧠 jsPsych Project

## 📌 Overview
This project is a **neuroscience-based survey** built using **jsPsych 6.3.1**.
It presents **images and videos** as stimuli, followed by randomized **multiple-choice questions**.

## 📁 Project Structure
```
/jspsych-project
│── index.html          # Main HTML file
│── script.js           # JavaScript code for jsPsych experiment
│── style.css           # Optional styling
│── media/              # Images & videos used in the survey
│── README.md           # Project documentation
```

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/niksjac/jspsych-survey-project.git
cd jspsych-survey-project
```

### 2️⃣ Open Locally
#### Option 1: Using Python (Recommended)
If you have Python installed, run:
```bash
python -m http.server 8000
```
Then, open **`http://localhost:8000`** in your browser.

#### Option 2: Open Directly in a Browser
Simply open `index.html` in your browser (some features may require a local server).

### 3️⃣ Running the Experiment
- The survey will start automatically when loaded in the browser.
- **Data is displayed at the end** (`jsPsych.data.displayData()`).

## 🛠 Dependencies
- **jsPsych 6.3.1** (included via CDN)