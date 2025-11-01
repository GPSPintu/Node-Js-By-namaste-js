

## **DevTinder Project – API Development with Express Router**

### **Code Demonstration Link**

**Repository:** DevTinder Backend

---

### **Overview**

Today’s focus was on finalizing the **DevTinder API endpoints** and structuring the backend using **Express Router** for improved modularity, maintainability, and scalability. The API was divided into multiple routers based on specific functionalities.

---

## **1. DevTinder API Endpoints**

### **Auth Router**

Manages user authentication and session handling.

**Endpoints:**

* **POST /signup** – Register a new user.
* **POST /login** – Authenticate user credentials and issue a JWT token.
* **POST /logout** – Log the user out and invalidate the session.

---

### **Profile Router**

Handles all user profile–related operations.

**Endpoints:**

* **GET /profile/view** – Retrieve the logged-in user’s profile information.
* **PATCH /profile/edit** – Update profile details with field validation.
* **PATCH /profile/password** – Change the user’s password securely.

---

### **Connection Request Router**

Manages sending, receiving, and reviewing user connection requests.

**Request Status Options:** `ignore`, `interested`, `accepted`, `rejected`

**Endpoints:**

* **POST /request/send/interested/:userId** – Send a connection request.
* **POST /request/ignored/:userId** – Mark a request as ignored.
* **POST /request/review/accepted/:requestId** – Accept a connection request.
* **POST /request/review/rejected/:requestId** – Reject a connection request.

---

### **User Router**

Handles user-related data such as connections, pending requests, and the feed.

**Endpoints:**

* **GET /user/connections** – Get all active connections.
* **GET /user/requests/received** – View all received connection requests.
* **GET /user/feed** – Fetch a feed of suggested users.

---

## **2. Structuring with Express Router**

### **Key Concepts**

#### **Creating a Routes Folder**

Each router is defined in its own file (e.g., `authRoutes.js`, `profileRoutes.js`) to ensure clean separation of concerns.

#### **Using Express Router**

`express.Router()` enables modular routing. Each route file exports its router, which is then mounted in the main application file.

**Example:**

```js
const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");

// Get profile details
profileRouter.get("/profile", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
});

module.exports = profileRouter;
```

---

### **Benefits of Express Router**

* **Modularity:** Separate files improve organization and readability.
* **Scalability:** Easier to extend as the app grows.
* **Reusability:** Common middleware can be applied across multiple routers.

---

## **3. Key API Implementations**

### **A. Logout API**

**Purpose:** Securely log users out by clearing authentication cookies.

**Implementation:**

```js
authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("User logged out successfully");
});
```

**Benefits:**

* Safely terminates user sessions.
* Prevents unauthorized access after logout.

---

### **B. Profile Edit API**

**Purpose:** Allow users to update specific profile fields securely.

**Implementation:**

```js
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditFields(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile was updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
```

**Validation & Security:**

* Only allows updates to approved fields (`firstName`, `about`, `profileURL`, etc.).
* Prevents modification of sensitive data like `_id` or `password`.
* Ensures input sanitization and validation for data integrity.

---

## **Conclusion**

By organizing the DevTinder backend with **Express Router** and clearly defined API endpoints, the project achieves a maintainable, modular, and secure architecture. This structure simplifies debugging, future development, and feature expansion while maintaining clean and scalable code.


