# Scaling Chainsaw

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg&style=flat-square)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=flat-square&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300008f.svg?style=flat-square&logo=mysql&logoColor=white)

**Scaling Chainsaw** is a web application built with React on the frontend and Node.js on the backend, designed to help you reconnect with past friends based on shared connections like hometown, school, previous workplaces, and more. MySQL is used for storing user data and connections.

## Overview

This project aims to bridge the gap and make it easier to find and reconnect with people you've lost touch with over the years. By leveraging shared experiences and locations, Scaling Chainsaw helps rediscover those valuable connections from your past.

## Key Features

* **User Authentication:** Securely create accounts and log in.
* **Profile Creation:** Build a profile with information about your hometown, education, work history, and other relevant details.
* **Connection Matching:** Algorithmically suggests potential past friends based on shared profile information.
* **Search and Discovery:** Manually search for individuals and explore potential connections.
* **Messaging System (Potentially):** Communicate directly with rediscovered friends within the platform.
* **Real-time Updates (Potentially):** Receive notifications when potential connections are found.

## Technologies Used

* **Frontend:**
    * [React](https://react.dev/) - A JavaScript library for building user interfaces.
    * [Context API](https://react.dev/learn/passing-data-deeply-with-context) (Likely) - For managing application state.
    * [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - For making HTTP requests to the backend.
    * [Styled Components](https://styled-components.com/) or [CSS Modules](https://github.com/css-modules/css-modules) (Likely) - For styling components.
* **Backend:**
    * [Node.js](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
    * [MySQL](https://www.mysql.com/) - A popular open-source relational database management system.

## Getting Started

### Prerequisites

* Node.js and npm (or yarn) installed on your machine.
* MySQL server installed and running.

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Co-lest/scaling-chainsaw.git](https://github.com/Co-lest/scaling-chainsaw.git)
    cd scaling-chainsaw
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install  # or yarn install
    ```
    Configure your MySQL database connection details (e.g., in a `.env` file or a configuration file). You'll likely need to install a MySQL connector for Node.js (e.g., `mysql`).
    ```bash
    npm install mysql # or yarn add mysql
    ```
    Run the backend server:
    ```bash
    npm start # or yarn start
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install  # or yarn install
    ```
    Configure the API endpoint for the backend (e.g., in a configuration file).
    Run the frontend development server:
    ```bash
    npm start # or yarn start
    ```
    This will typically open the application in your web browser.

### Configuration

* **Backend:** Configure MySQL database connection details (host, user, password, database name, etc.) in your environment variables or configuration file.
* **Frontend:** Configure the backend API URL.

*(Provide more specific configuration instructions if needed, such as environment variable setup or configuration file details.)*

### Usage

1.  **Create an Account:** Sign up for a new account on the application.
2.  **Build Your Profile:** Fill in details about your past, including hometowns, schools, workplaces, and other relevant information.
3.  **Discover Connections:** Explore the suggested connections based on your profile.
4.  **Search for Friends:** Use the search functionality to find specific individuals.
5.  **Connect and Engage:** Reach out to rediscovered friends and start reconnecting!

*(You can add screenshots or more detailed user flow descriptions here.)*

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your fork.
5.  Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for more details.
