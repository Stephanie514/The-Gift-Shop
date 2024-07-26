# **The Gift Shop**

Welcome to **The Gift Shop**, an e-commerce platform designed to connect users with shops, manage products, and handle orders seamlessly. This project showcases a robust backend and a user-friendly frontend, aimed at creating a comprehensive shopping experience.

## **Table of Contents**

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## **Overview**

The Gift Shop is a full-featured e-commerce application built to support a variety of online shopping needs. It allows users to:

- Browse and search for products
- Manage their shopping carts and orders
- View and edit their profiles
- Interact with different shops

Shops can manage their products, track orders, and view sales analytics.

## **Features**

- **User Management**: Sign up, log in, and manage user profiles.
- **Product Management**: Add, update, and delete products.
- **Shop Management**: Create and manage shops.
- **Order Processing**: Handle customer orders, track order statuses.
- **Cart System**: Add products to cart and manage quantities.
- **Search and Filters**: Advanced search and filtering options for products.

## **Technologies Used**

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, Context API, `useReducer` for state management
- **Authentication**: JWT
- **Deployment**: Docker, Vagrant

## **Installation**

### **Prerequisites**

- Node.js (>= 14.x)
- MongoDB (>= 4.x)
- Docker (for containerized setup)
- Vagrant (for virtual environments)

### **Steps**

1. **Clone the Repository**

    ```bash
    git clone https://github.com/Stephanie514/the-gift-shop.git
    cd the-gift-shop
    ```

2. **Install Dependencies**

    For the backend:

    ```bash
    cd backend
    npm install
    ```

    For the frontend:

    ```bash
    cd ../frontend
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the `backend` directory with the following content:

    ```
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the Development Server**

    For the backend:

    ```bash
    cd backend
    npm start
    ```

    For the frontend:

    ```bash
    cd ../frontend
    npm start
    ```

## **Usage**

- **Frontend**: Navigate to `http://localhost:3000` to access the application.
- **Backend API**: The backend API is accessible at `http://localhost:5000/api`.

## **API Documentation**

Refer to the [API Documentation](docs/API.md) for detailed information on available endpoints, request formats, and response structures.

## **Contributing**

We welcome contributions from the community! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## **Contact**

- **Project Maintainer**: Stephanie Chepkirui
- **Email**: chepkiruistephanie514@gmail.com
- **GitHub**: [Stephanie514](https://github.com/Stephanie514)

- **Project Maintainer**: Fiona Nyadero
- **Email**: fiona.nyadero@gmail.com
- **GitHub**: [Fiona-Nyadero](https://github.com/Fiona-Nyadero)



