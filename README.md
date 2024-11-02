# Online Clipboard

A simple web-based application that functions as an online clipboard, allowing users to save and manage text snippets. Built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

---

## File Structure

The project is divided into two main directories:

```bash
/online-clipboard
│
├── /client          # Frontend code (React.js)
│   ├── /public
│   ├── /src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── /server          # Backend code (Node.js, Express.js)
│   ├── /config      # Configuration files
│   ├── /models      # Database models
│   ├── /routes      # API routes
│   ├── server.js    # Main server file
│   └── package.json
│
└── README.md  
```bash      
# Project documentation
## Getting Started

Follow these steps to get the project up and running on your local machine:

### Prerequisites

Make sure you have the following installed:
- **Node.js**: [Download here](https://nodejs.org)
- **MongoDB**: Ensure your local MongoDB server is running.

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/online-clipboard.git
   cd online-clipboard

   ## Set Up the Backend

1. **Navigate to the `backend` Directory**
   ```bash
   cd backend

2. **Install Dependencies**
   - Run the following command to install the required packages for the backend:
   ```bash
   npm install

3. **Create Environment Variables**
   - Create a `.env` file in the `server` directory and add the following environment variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

4. **Start the Backend Server**
   ```bash
   npm run dev

### Set Up the Frontend

1. Navigate to the `client` directory and install dependencies:
   ```bash
   cd ../frontend
   npm install

2. Start the React development server:
     ```bash
    npm run dev