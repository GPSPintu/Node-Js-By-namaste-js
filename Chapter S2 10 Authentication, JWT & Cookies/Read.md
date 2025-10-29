DevTinder Project - Authentication, JWT & Cookies

Code Demonstration Link:
DevTinder Backend Repository:

This document explains the authentication flow in the DevTinder app, focusing on JWT (JSON Web Tokens), cookie management, and security best practices. Understanding these concepts ensures secure user authentication and efficient session handling.

1. Authentication

Key Concepts:

Authentication verifies a user’s identity by matching the email and password with database records.

Upon successful login:

The server generates a JWT token.

The token is sent to the client and stored in a cookie.

Subsequent requests use the token for validation.

2. Cookies

What are Cookies?
Cookies are small pieces of data stored on the client-side and sent to the server with every request.

JWT in Cookies:
Storing JWT tokens in cookies ensures that the server can validate user sessions without relying on client-side storage like localStorage.

Validation:

Every request includes the token stored in cookies.

The server verifies its authenticity.

Cookie Expiry:

Cookies can have an expiration time to enforce session limits.

This improves security and gives users control over sessions.

3. JWT (JSON Web Tokens)

Steps in Authentication Using JWT:

Password Validation

After verifying the email and password, generate a JWT.

Token Creation

A JWT token is created using the jsonwebtoken package:

const token = await jwt.sign({ _id: user._id }, "999@Akshad", { expiresIn: "1d" });


JWT Structure:

Header: Information about the token type and signing algorithm.

Payload: Contains user-specific data (e.g., _id).

Signature: Ensures token integrity.

Sending Token in Cookies

The generated token is added to cookies and sent to the client:

res.cookie("token", token, { 
    expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    httpOnly: true, // prevents JS access to cookie
    secure: true    // ensures cookie is sent over HTTPS
});

4. Middleware: User Authentication

Purpose:

Verifies JWT tokens sent in cookies for every protected route.

Ensures only authenticated users can access restricted resources.

Implementation:

const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) throw new Error("Invalid token!");

        const decodedObj = await jwt.verify(token, "999@Akshad");
        const { _id } = decodedObj;

        const user = await User.findById(_id);
        if (!user) throw new Error("User not found");

        req.user = user;
        next();
    } catch (err) {
        res.status(401).send("ERROR: " + err.message);
    }
};

module.exports = { userAuth };

5. Schema Methods in Mongoose

Definition:

Schema.methods allows you to define custom instance methods for a schema.

These methods are available on all documents created with the schema.

Use Cases in DevTinder:

JWT Generation
userSchema.methods.getjwt = async function() {
    const token = await jwt.sign({ _id: this._id }, "999@Akshad", { expiresIn: "1d" });
    return token;
};

Password Validation
userSchema.methods.validatePassword = async function(passwordInput) {
    const isValid = await bcrypt.compare(passwordInput, this.password);
    return isValid;
};


Advantages:

Encapsulation: Keeps document-specific logic within the schema.

Reusability: Define once and use across all instances.

Integration: Works seamlessly with Mongoose queries.

Common Use Cases in DevTinder:

Authentication: Hash and validate passwords.

JWT Integration: Generate tokens after password verification.

Data Transformation: Sanitize or format data before sending to the client.

6. Security Concepts

Cookie Hijacking:

Attackers may steal cookies via network vulnerabilities or client-side attacks.

Mitigation Strategies:

Use Secure and HttpOnly flags for cookies.

Implement HTTPS to encrypt cookie transmission.

Rotate tokens periodically to limit exposure.

This flow ensures that DevTinder's authentication is secure, modular, and maintainable, while leveraging Mongoose, JWT, and cookie-based session management effectively.