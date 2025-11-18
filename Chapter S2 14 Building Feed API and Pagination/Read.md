
# 🚀 DevTinder Backend — Feed API with Pagination

This document explains the logic, filtering strategy, and pagination implementation for the `GET /user/feed` API in the DevTinder backend.

---

## 📌 **API Endpoint**

```
GET /user/feed
```

## 🎯 **Purpose**

Retrieve profiles of other users while excluding:

* The logged-in user
* Users who already have a connection with the logged-in user
* Ignored users
* Users who have already received a connection request from the logged-in user

This ensures that every user sees only **fresh**, **relevant**, and **non-duplicate** profiles in their feed.

---

# 🧠 Thought Process Behind the Feed API

## 1️⃣ **Filtering Out Unwanted Users**

### ✔️ Collecting User IDs to Hide

We gather all users connected to or interacting with the logged-in user by checking all connection requests where:

* `fromUserId` = logged-in user
* `toUserId` = logged-in user

A **Set** is used to store these IDs because:

* It automatically prevents duplicates
* It provides O(1) lookup time
* It ensures efficient filtering in MongoDB

### ✔️ MongoDB Filtering Operators

* **$nin** → exclude all user IDs stored in the Set
* **$ne** → ensure the logged-in user is not included

This results in a clean, fast query.

---

## 2️⃣ **Implementing Pagination**

### 🔎 Why Pagination?

Without pagination, fetching 1,000+ users in a single request would:

* Slow down the backend
* Waste bandwidth
* Hurt user experience

Pagination helps serve only the necessary number of profiles per request.

### Pagination Parameters

| Parameter | Purpose                                          |
| --------- | ------------------------------------------------ |
| **page**  | Helps determine which “slice” of data to return  |
| **limit** | Controls how many profiles are returned per page |

A safety cap is added to **limit = max 50** to prevent abuse.

### Skip Formula

```js
skip = (page - 1) * limit;
```

### MongoDB Pagination Functions

* **skip()** → skip past results of previous pages
* **limit()** → return only the specified number of items

---

# ✅ Final Feed API Code (Clean & Commented)

```js
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Pagination parameters
    const page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || 10);
    limit = Math.min(limit, 50); // limit capped at 50
    const skip = (page - 1) * limit;

    // Fetch all connection requests involving the logged-in user
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ],
    }).select("fromUserId toUserId");

    // Collect IDs to exclude using a Set
    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    // Query for users to show in the feed
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } }
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = userRouter;
```

---

# 🧩 Key Concepts Explained

### 🔹 **1. Set-Based Filtering**

Using a `Set()` ensures:

* No duplicate user IDs
* Faster lookup
* Cleaner MongoDB `$nin` queries

---

### 🔹 **2. MongoDB Query Optimization**

* **$nin** efficiently excludes multiple user IDs in a single operation
* **$ne** strictly ensures the current user's profile is not included
* Combined use helps create a **high-performance feed algorithm**

---

### 🔹 **3. Pagination for Performance**

Benefits:

* Prevents fetching huge datasets
* Faster API responses
* Smoother scrolling or “Load More” UI
* Scales easily as the platform grows

---

# 🏆 Benefits of This Approach

### ⚡ Improved Performance

Fetching only a subset of users drastically improves response times.

### 📈 Highly Scalable

Works efficiently even with hundreds of thousands of users.

### 💡 Better User Experience

Pagination supports:

* Infinite scrolling
* Smooth browsing
* Lower data usage

---

# 🎉 Conclusion

You have now implemented a **fully optimized user feed API** that supports:

* Smart filtering
* Set-based exclusion
* Efficient MongoDB querying
* Scalable pagination

This makes the DevTinder app **faster**, **cleaner**, and **better prepared** for future growth.


