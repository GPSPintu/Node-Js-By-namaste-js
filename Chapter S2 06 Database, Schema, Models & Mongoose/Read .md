Databse, Schema & Models | Mongoose
Code Demonstration Link
DevTinder Backend Repository
1. Database Connection
This guide demonstrates how to connect to MongoDB directly using a connection string URL without using a .env file. This setup is convenient for testing but is not secure for production as it exposes sensitive information.

1. Install Mongoose
Make sure Mongoose is installed in your project:

npm install mongoose
2. Database Connection code:
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;

// MongoDB connection string URL
const databaseUrl = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority';

// Connect to MongoDB using Mongoose
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server only after database connection is successful
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
Important Note: Always ensure that the database connection is established before starting the server. This setup is best for development or testing but not for production, as it can expose credentials.

2. Database Schema in Mongoose
A schema in Mongoose defines the structure of documents in a MongoDB collection, including fields, data types, and validation. Using schemas allows for structured data models, making it easier to handle data validation and consistency within MongoDB.

What is a Database Schema?
A Mongoose schema outlines the fields and their types for a document in a MongoDB collection.
Schemas allow you to apply constraints, set defaults, and define validation rules for each field.
Mongoose schemas enable structured, schema-driven data handling similar to traditional SQL databases.
Example: Creating a User Schema
Below is an example of defining a simple user schema using Mongoose:

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] }
});

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
3. Saving a Document with a Schema in Mongoose
Once a schema is defined in Mongoose, you can create and save documents to MongoDB based on that schema. Mongoose provides a straightforward way to add documents with its .save() method, ensuring the data adheres to the schema’s structure and validation rules.

Example Schema: User Schema
First, define a simple User schema to structure the user documents:

const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path to where your User model is defined

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Create an instance of the User model
    const user = new User({
      firstname: 'Akshad',
      lastname: 'Jaiswal',
      email: 'Akshad@example.com',
      age: 22,
      gender: 'Male'
    });

    // Save the document to the database
    return user.save();
  })
  .then(doc => console.log('Document inserted:', doc))
  .catch(err => console.error('Error:', err))
  .finally(() => mongoose.disconnect());
3. Automatic Fields Added by MongoDB
MongoDB automatically adds certain fields to documents within collections. Understanding these fields is crucial for effective data management. This document outlines the two key automatic fields: _id and __v.

1. _id Field
Description
The _id field is a unique identifier for each document in a MongoDB collection. It serves as the primary key for the document.

Characteristics
Type: ObjectId
Uniqueness: Each document must have a unique _id value. If you attempt to insert a document with a duplicate _id, MongoDB will return an error.
Auto-generated: If not provided, MongoDB generates this field automatically when a document is created.
Example
{
  "_id": ObjectId("60d5b6f0d89a3c52a8d7c331"),
  "name": "John Doe"
}
Understanding the __v Field in MongoDB
The __v field is an automatic field added by MongoDB when using Mongoose to manage document versions. This README provides a detailed overview of the __v field, including its purpose, characteristics, and examples.

2. __v Field
The __v field is used to track the version of a document in a MongoDB collection. It helps manage concurrent updates and prevents overwriting changes made by other operations.

Characteristics
Type: Number
Purpose: The primary purpose of the __v field is to implement versioning for documents in Mongoose. It allows Mongoose to maintain the integrity of data during updates.
Auto-incremented: Each time a document is updated, the __v field increments automatically. This ensures that Mongoose can identify the version of the document and handle any conflicts that arise from concurrent updates.
Example
Document Structure
When you create a document in a MongoDB collection using Mongoose, the __v field is added automatically. Here's an example of a document with the __v field:

{
  "_id": ObjectId("60d5b6f0d89a3c52a8d7c331"),
  "name": "John Doe",
  "__v": 0
}