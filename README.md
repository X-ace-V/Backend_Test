# Multilingual FAQ Management System

A backend application designed to manage Frequently Asked Questions (FAQs) with support for multiple languages, rich text formatting, and efficient caching mechanisms.

## Table of Contents

- Technologies Used
- Project Structure
- Setup Instructions
- API Endpoints
- Caching Mechanism
- Multi-language Translation Support
- Admin Panel
- Unit Tests & Code Quality
- Contribution Guidelines
- License

## Technologies Used

- Backend: Node.js, Express.js
- Database: MongoDB
- Caching: Redis
- Translation: Google Translate API
- Rich Text Editor: Integrated via a suitable middleware
- Testing: Mocha, Chai

## Project Structure

Backend_Test/
|-- backend/
|   |-- src/
|       |-- config/
|       |   |-- db.js
|       |   |-- redis-config.js
|       |   |-- serverConfig.js
|       |-- controllers/
|       |   |-- FAQController.js
|       |-- models/
|       |   |-- FAQ.js
|       |-- routes/
|       |   |-- v1/
|       |   |   |--index.js
|       |   |-- index.js
|       |-- services/
|       |   |-- FAQservices.js
|       |-- utils/
|       |   |-- htmlUtils.js
|       |-- index.js
|   |-- .env
|   |-- .env.example
|   |-- package.json
|-- .gitignore
|-- README.md

# Setup Instructions:- Backend

## Prerequisites

- Node.js: Ensure you have Node.js installed. Download Node.js
- MongoDB: Set up a MongoDB instance. This can be a local setup or a cloud-based service like MongoDB Atlas.
- Redis: Install and run a Redis server for caching purposes.
- Google Translate API: Obtain API credentials by setting up a project on the Google Cloud Console or download npm package of       google-translate.

# Installation

## Clone the Repository:

```bash
git clone https://github.com/X-ace-V/Backend_Test.git
cd Backend_Test/backend
```

## Install Dependencies:

```bash
npm install
```

## Configure Environment Variables: 

- Create a .env file in the backend directory with the following variables:

```bash
PORT=3000
DB_URL=your_mongodb_connection_string
REDIS_HOST=localhost
REDIS_PORT=6379
```


## Start the Server:

```bash
npm run dev
```

# API Endpoints

## Creating FAQ
- http://localhost:3000/api/v1/faq
- Post

```bash
{
  "question": "What is javascript?",
  "answer": "javascript is a language.",
  "answerHtml": "<p>javascript is a language.</p>",
  "languages": ["fr", "hi", "bn"]
}
```
- http://localhost:3000/api/v1/faqs :  
- GET

- go on postman, just set a get end point and click on send request and it  will populate all the FAQ's.


- http://localhost:3000/api/v1//admin/faq/:id
- delete

- just put the id of the FAQ and it will delete it. 

# Caching Mechanism

The application uses Redis to cache translated FAQs for improved performance. Cached translations are stored with keys based on the FAQ ID and language code.

# Multi-language Translation Support

Upon creating a new FAQ, the application automatically translates the question and answer into supported languages using the Google Translate API. The translations are stored in the database and served based on the lang query parameter in API requests.

# Admin Panel

An admin interface is available for managing FAQs. It provides functionalities to add and delete FAQs with rich text support for answers. The rich text editor is integrated to allow proper formatting of answers.

# Unit Tests & Code Quality

- Unit test is written using jest. To run the tests:

```bash
npm test
```

