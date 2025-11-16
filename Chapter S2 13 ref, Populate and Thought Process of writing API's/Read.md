# 🚀 DevTinder Backend Project #

## Overview

This document outlines the **thought process**, **API design**, and **implementation** for handling **connection requests** in the DevTinder backend project.
Today’s focus is on using **`ref`**, **`populate`**, and following a **structured API development workflow**.

---

## 🔧 Key Concepts

### 1. `ref` in Mongoose

* The `ref` property defines **relationships** between MongoDB collections.
* It is used to reference documents from another collection.
* Example: Linking `toUserId` and `fromUserId` fields in a `ConnectionRequest` to the `User` collection.

### 2. `populate` in Mongoose

* The `populate()` method replaces document references (IDs) with the actual referenced document data.
* It helps in retrieving **related data** in a single query, making responses richer and more informative.

---

## 🧩 API 1: Review Connection Request

### **Endpoint**

```
POST /request/review/:status/:requestId
```

### **Purpose**

To **accept** or **reject** a connection request by updating its status based on specific conditions.

---

### 🧠 Thought Process for API Development

#### Steps:

1. **Get the Logged-In User**

   * Retrieve the user making the request using authentication middleware (e.g., JWT/session).
2. **Retrieve Parameters**

   * Extract `status` and `requestId` from the API parameters.
3. **Validate Input**

   * Ensure `status` contains valid values: `accepted` or `rejected`.
   * Return an error if invalid.
4. **Find the Connection Request**

   * Query the database for a request that:

     * Matches the provided `requestId`.
     * Has `toUserId` equal to the logged-in user’s ID.
     * Has status `"interested"`.
5. **Update the Status**

   * If found, update its `status` field to the new value.
   * Return a success message or the updated request data.

---

### ✅ **API Implementation**

```js
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      // Validate Status
      const allowedStatuses = ["accepted", "rejected"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid status or status not allowed",
          success: false,
        });
      }

      // Validate Request
      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).json({
          message: "Request not found",
          success: false,
        });
      }

      // Update Status
      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.status(200).json({
        message: `Connection request ${status}`,
        data,
        success: true,
      });
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);
```

---

## 🧩 API 2: Get Received Connection Requests

### **Endpoint**

```
GET /user/requests/received
```

### **Purpose**

Fetch all pending (interested) connection requests where the logged-in user is the **recipient** (`toUserId`).

---

### 🧠 Thought Process

1. **Set Up User Router**

   * Organize user-related operations in a dedicated router.
2. **Authenticate the API**

   * Use `userAuth` middleware to ensure the user is logged in.
3. **Fetch Connection Requests**

   * Query the `ConnectionRequest` collection for documents where:

     * `toUserId` equals the logged-in user’s ID.
     * `status` equals `"interested"`.
4. **Build Relationships**

   * Use `ref` in the schema to connect `fromUserId` to the `User` model.
5. **Populate Data**

   * Populate `fromUserId` with user details (`firstName`, `lastName`).

---

### ✅ **Schema Reference Example**

```js
fromUserId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
}
```

---

### ✅ **API Implementation**

```js
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);

    return res.status(200).json({
      connectionRequests,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});
```

---

## 🧩 API 3: Get User Connections

### **Endpoint**

```
GET /user/connections
```

### **Purpose**

Fetch all **accepted** connection requests where the logged-in user is either:

* The sender (`fromUserId`), or
* The receiver (`toUserId`).

---

### 🧠 Thought Process

1. **Fetch Connection Requests**

   * Find requests where:

     * `status` = `"accepted"`.
     * Either `fromUserId` or `toUserId` matches the logged-in user.
2. **Use Populate**

   * Populate user data for each connection.
3. **Return Relevant Fields**

   * Optimize the payload to include only essential user info.

---

### ✅ **API Implementation**

```js
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => row.fromUserId);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});
```

---

## 📚 Summary

| Concept            | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| **`ref`**          | Defines relationships between MongoDB collections.             |
| **`populate()`**   | Fetches referenced documents in a single query.                |
| **Status Values**  | `interested`, `accepted`, `rejected`                           |
| **Authentication** | Uses middleware (`userAuth`) to verify logged-in users.        |
| **Error Handling** | Consistent error responses with `message` and `success` flags. |





