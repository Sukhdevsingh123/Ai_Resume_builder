<div align="center">
  <h1 align="center">🤖 AI Resume Builder</h1>
  <p align="center">
    A cutting-edge web application that leverages artificial intelligence to create perfectly tailored, professional resumes from PDF uploads.
    <br />
    <a href="https://github.com/Sukhdevsingh123/Ai_Resume_builder/issues">Report Bug</a>
    ·
    <a href="https://github.com/Sukhdevsingh123/Ai_Resume_builder/issues">Request Feature</a>
  </p>
</div>

<div align="center">

![License](https://img.shields.io/github/license/Sukhdevsingh123/Ai_Resume_builder?style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

<br>

<div align="center">
  <a href="https://airesume-builder-ni.vercel.app/">
    <img src="https://github.com/Sukhdevsingh123/Ai_Resume_builder/raw/main/frontend/src/assets/resume_builder2.png" alt="Project Screenshot">
  </a>
  <a href="https://airesume-builder-ni.vercel.app/">
    <img src="https://github.com/Sukhdevsingh123/Ai_Resume_builder/raw/main/frontend/src/assets/resume_builder.png" alt="Project Screenshot">
  </a>
</div>

---

## 🚀 Live Demo

Experience the application live at: **[airesume-builder-ni.vercel.app](https://airesume-builder-ni.vercel.app/)**

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#-key-features)
- [Technology Stack](#️-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage Guide](#-usage-guide)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## About The Project

The **AI Resume Builder** is a modern web application designed to streamline the resume creation process. It uses artificial intelligence to parse uploaded PDF resumes and intelligently restructures the data. By providing a job description, the AI generates an optimized resume that perfectly highlights the most relevant skills and experiences for any specific job application, saving users valuable time and effort.

---

## ✨ Key Features

### 🔧 Core Functionality
-   **PDF Resume Upload & Processing**: Upload existing resumes in PDF format for automatic data extraction.
-   **AI-Powered Resume Generation**: Advanced AI creates tailored resumes based on job descriptions.
-   **Employee Management**: Store and manage multiple employee profiles with ease.
-   **Dynamic Resume Customization**: Generate unique resumes optimized for different job applications on the fly.

### 🎨 User Experience
-   **Fully Responsive Design**: A seamless experience across mobile, tablet, and desktop devices.
-   **Intuitive Interface**: Clean, modern UI with a focus on usability and seamless navigation.
-   **Real-time Feedback**: Toast notifications provide instant feedback for user actions and system status.
-   **Interactive Elements**: Animated loading states and smooth transitions enhance the user experience.

### 📤 Export & Sharing
-   **One-Click Sharing**: Instantly share resumes to WhatsApp, Gmail, and Google Drive.
-   **Google Docs Integration**: Directly export resume content to Google Docs with proper formatting.
-   **High-Quality PDF Download**: Generate professional, high-quality PDFs for offline use.

---

## 🛠️ Technology Stack

This project is built with a modern MERN-stack architecture.

| Frontend                                                                                                                          | Backend                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **React 18** (with Hooks)                                                                                                         | **Node.js** & **Express.js** |
| **Vite** (Build Tool)                                                                                                             | **MongoDB** (Database)                                                                                                                 |
| **Tailwind CSS** (Styling)                                                                                                        | **OpenAI API** (AI Engine)                                                                                                             |
| **Axios** (HTTP Client)                                                                                                           | **Multer** (File Uploads)                                                                                                              |
| **React Toast Notifications** | **PDF-Parse** (Text Extraction)                                                                                                        |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   **Node.js**: `v16` or higher
-   **npm** or **yarn**
-   **MongoDB**: A local instance or a cloud URI (e.g., from MongoDB Atlas)
-   **OpenAI API Key**: Get one from [OpenAI](https://platform.openai.com/account/api-keys)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Sukhdevsingh123/Ai_Resume_builder.git](https://github.com/Sukhdevsingh123/Ai_Resume_builder.git)
    cd Ai_Resume_builder
    ```

2.  **Backend Setup:**
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `/server` directory and add the following variables:
    ```env
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    OPENAI_API_KEY=your_openai_api_key
    ```
    Start the backend server:
    ```bash
    npm start
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    ```
    Start the frontend development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 📖 Usage Guide

1.  **Add a New Employee**:
    -   Click the **"+ Add New"** button in the control panel.
    -   Upload an employee's resume in PDF format. The system will automatically parse and structure the data.

2.  **Generate a Tailored Resume**:
    -   Select an employee from the dropdown list.
    -   Paste the target job description into the text area.
    -   Click **"Generate Resume"**. The AI will process the request and display a new resume optimized for the job.

3.  **Export or Share**:
    -   Use the buttons to download a PDF, share via Gmail/WhatsApp, or export to Google Docs.

---

<details>
<summary><h3>🔧 API Endpoints</h3></summary>

-   **`GET /api/employees`**: Retrieve all employees.
-   **`POST /api/employees`**: Add a new employee by uploading a PDF resume.
-   **`POST /api/generate-resume`**: Generate an AI-powered resume.
    -   **Body**:
        ```json
        {
          "employeeId": "your_employee_id",
          "jobDescription": "The text of the job description..."
        }
        ```
</details>

<details>
<summary><h3>🎨 Responsive Design</h3></summary>

-   **📱 Mobile (320px+)**: Single-column layout, touch-optimized controls, and responsive typography.
-   **📱 Tablet (768px+)**: Two-column layout with optimized spacing for a wider view.
-   **💻 Desktop (1024px+)**: Full three-column layout with enhanced visual hierarchy and hover effects.
</details>

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

-   [OpenAI](https://openai.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [React](https://reactjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Shields.io](https://shields.io)

---
<p align="right">(<a href="#top">back to top</a>)</p>
