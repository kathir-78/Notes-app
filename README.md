# Notes App

A simple note-taking application built with Node.js, Express, MongoDB, and EJS.

## Description

This application allows users to create, edit, delete, and search notes. It uses Google OAuth for authentication and stores user data in MongoDB.

## Features

- User authentication with Google OAuth
- Create, edit, and delete notes
- Search notes
- Responsive design with Bootstrap
- Multiple users

## Demo

[Click here to see the demo](http://your-demo-link.com)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/kathir-78/Notes-app.git
    cd Notes-app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a .env file in the root directory and add the following environment variables:
    ```env
    MONGODB_URI=your_mongodb_uri
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_CALLBACK_URL=your_google_callback_url
    ```

4. Start the application:
    ```sh
    npm start
    ```

## Usage

- Visit `http://localhost:3000` in your browser.
- Sign in with your Google account.
- Create, edit, delete, and search notes.


