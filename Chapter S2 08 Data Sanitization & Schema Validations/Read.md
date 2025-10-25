
# **DevTinder Project – Data Sanitization and Schema Validation in Mongoose**

### **Overview**

In today’s learning, I explored **data sanitization** and **schema validation** features in **Mongoose**. These features help ensure **data integrity**, **consistency**, and **security** by enforcing rules before data is saved to MongoDB.

---

## **Schema Types and Validations in Mongoose**

Mongoose provides various schema types and validation properties to control and sanitize the data stored in a collection.

### **1. `required`**

Ensures that a field must be provided before saving a document.

```javascript
firstName: {
  type: String,
  required: true,
  minLength: 3,
  maxLength: 50
}
```

---

### **2. `unique`**

Specifies that the field value must be unique across the collection.

```javascript
emailId: {
  type: String,
  lowercase: true,
  required: true,
  unique: true,
  trim: true
}
```

---

### **3. `default`**

Sets a default value if no value is provided for the field.

```javascript
about: {
  type: String,
  default: "Dev is in search for someone here"
}
```

---

### **4. `lowercase`**

Automatically converts a string value to lowercase before saving.

```javascript
emailId: {
  type: String,
  lowercase: true,
  required: true,
  unique: true,
  trim: true
}
```

---

### **5. `trim`**

Removes leading and trailing whitespace from a string before saving.

```javascript
emailId: {
  type: String,
  lowercase: true,
  required: true,
  unique: true,
  trim: true
}
```

---

### **6. `minLength` and `maxLength`**

Ensures that a string field’s length falls within a specified range.

```javascript
firstName: {
  type: String,
  required: true,
  minLength: 3,
  maxLength: 50
}
```

---

### **7. `min` and `max`**

Sets minimum and maximum values for numerical fields.

```javascript
age: {
  type: Number,
  required: true,
  min: 18
}
```

---

### **8. `validate` (Custom Validators)**

Allows you to define custom validation logic for more complex checks.

```javascript
gender: {
  type: String,
  required: true,
  trim: true,
  validate(value) {
    if (!["male", "female", "others"].includes(value)) {
      throw new Error("Not a valid gender (male, female, or others)");
    }
  }
}
```

---

### **9. `timestamps`**

Automatically adds `createdAt` and `updatedAt` fields to track document creation and modification times.

```javascript
{
  timestamps: true
}
```

---

## **Custom Validator Example**

Custom validators enforce specific rules that built-in validators might not cover.

```javascript
gender: {
  type: String,
  required: true,
  trim: true,
  validate(value) {
    if (!["male", "female", "others"].includes(value)) {
      throw new Error("Not a valid gender (male, female, or others)");
    }
  }
}
```

---

## **API-Level Validations**

### **PATCH API for Selective Field Updates**

At the API level, validations ensure that only specific fields can be updated—this adds a layer of **security and data integrity**.

```javascript
const ALLOWED_UPDATES = [
  "photoURL",
  "about",
  "gender",
  "skills",
  "firstName",
  "lastName",
  "age"
];

const isUpdateAllowed = Object.keys(data).every((key) =>
  ALLOWED_UPDATES.includes(key)
);

if (!isUpdateAllowed) {
  throw new Error("Update not allowed");
}
```

**Benefits:**

* Prevents unintended or unauthorized updates.
* Reduces data corruption risks.
* Enhances security by controlling which fields can be modified.

---

## **Advanced Validation with Validator.js**

The **validator.js** library provides advanced, easy-to-use validation methods for common data types like email, URL, and passwords.

### **1. Validating Email IDs**

**Method:** `isEmail`
Ensures that the email address is in a valid format.

```javascript
validate(value) {
  if (!validator.isEmail(value)) {
    throw new Error("Invalid Email: " + value);
  }
}
```

---

### **2. Validating Photo URLs**

**Method:** `isURL`
Checks if a string is a properly formatted URL (useful for validating profile photo links).

```javascript
validate(value) {
  if (!validator.isURL(value)) {
    throw new Error("Invalid URL: " + value);
  }
}
```

---

### **3. Validating Password Strength**

**Method:** `isStrongPassword`
Ensures that the password meets security standards such as length, uppercase/lowercase mix, numbers, and special characters.

```javascript
validate(value) {
  if (!validator.isStrongPassword(value)) {
    throw new Error("Enter a strong password: " + value);
  }
}
```

---

## **Benefits of Using Validator.js**

* **Improved Data Integrity:** Prevents invalid data from being saved.
* **Enhanced Security:** Blocks weak passwords, invalid URLs, and malformed emails.
* **Ease of Use:** Simplifies complex validation logic.
* **Standard Compliance:** Ensures data follows best practices and common standards.

---

## **Conclusion**

Schema validations and data sanitization in **Mongoose** are essential for building reliable and secure applications. By combining **Mongoose’s built-in validation** with **Validator.js**, the **DevTinder** backend ensures that all user data is accurate, consistent, and secure. This minimizes manual checks, prevents common errors, and maintains the overall integrity of the application’s database.

-