DevTinder Project - Learning Notes
Code Demonstration Link
DevTinder Backend Repository
Middlewares and Error Handlers in Express
Route Handlers in Express
Overview
In Express, route handlers are functions that handle requests to a specific endpoint. You can use multiple route handlers for a single route, control the flow with next, and even wrap handlers into arrays for better modularity.

1. Multiple Route Handlers
Express allows defining multiple route handlers for a single route. Each handler can execute different logic or perform different tasks before sending a response.
Example:
app.get('/example', (req, res, next) => {
  console.log('First handler');
  next(); // Pass control to the next handler
}, (req, res) => {
  res.send('Second handler');
});
In the above example:
The first handler logs a message and then calls next().
The second handler sends a response after the first one completes
Understanding next and next() in Express
Overview
In Express, next is a callback function that allows you to control the flow of middleware functions and route handlers. It helps in moving the request to the next middleware or route handler in the stack.

1. What is next?
next is a function provided by Express, used to pass control to the next middleware function or route handler.
It must be called within a middleware function for the request to proceed further.
If not called, the request will be left hanging, and the server won't send a response.
2. How to Use next()
Basic Usage:

app.get('/example', (req, res, next) => {
  console.log('First handler');
  next(); // Passes control to the next middleware function or route handler
}, (req, res) => {
  res.send('Second handler');
});
In the above example:

The first function logs a message and then calls next() to proceed to the next handler.

The second function sends a response after the first handler completes

3. Using next() to Skip Route Handlers in Express
In Express, you can use the next() function to pass control to the next middleware function or route handler. By passing the string 'route' as an argument to next(), you can skip the remaining route handlers for a particular route.

How to Use next('route') to Skip Handlers
When next('route') is called, Express will skip the remaining handlers for the current route and move on to the next matching route handler.

This is useful when certain conditions are met, and you want to bypass specific middleware or handlers.

Basic Usage:

app.get('/skip', (req, res, next) => {
  console.log('This handler will be skipped');
  next('route'); // Skips to the next matching route handler
}, (req, res) => {
  res.send('You will not see this response because the handler is skipped');
});

// Next matching route handler
app.get('/skip', (req, res) => {
  res.send('Skipped to this route handler');
});
Here, the second handler will be skipped, and the request will be passed directly to the third handler.
Middlewares in Express.js
1. What is Middleware?
Middleware is a function that has access to the request (req), response (res), and the next middleware function in the request-response cycle.
Middleware functions can:
Execute any code.
Modify the request and response objects.
End the request-response cycle by sending a response.
Call the next middleware function in the stack using next().
2. Why Do We Need Middleware?
Modularity: Middleware helps in separating concerns like authentication, logging, validation, etc., into reusable functions.
Pre-processing: Middleware can be used to modify or check the request before it reaches the route handler.
Error Handling: Middleware is essential for catching errors and handling them gracefully without stopping the application.
Authorization/Authentication: Middleware ensures that only authorized users can access certain routes.
Request Logging: Middleware can log request details for monitoring or debugging.
3. How Express.js Handles Middlewares Behind the Scenes
When an HTTP request is received, Express executes all middleware functions in the order they are defined.
Each middleware function can:
Pass control to the next middleware by calling next().
End the request-response cycle by sending a response.
Middleware functions are executed sequentially unless next() is invoked, which passes control to the next middleware or route handler.
Behind the scenes, Express creates a middleware stack and processes it in order. If next() is not called, the request gets stuck and no further processing occurs.
Example of Middleware Flow
const express = require('express');
const app = express();

// Middleware 1: Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
});
// Middleware 2: Authorization Check
//Handle user authentication for all admin routes using middlewares
app.use("/admin", (req, res, next) => {
    const token = "999";
    const isAuthorizedAdmin = token === "999";
    if (!isAuthorizedAdmin) {
        res.status(401).send("Unauthorized Admin")
    } else {
        next();
    }
})
app.get("/admin/getAllData", (req, res) => {
    res.send("All data Generated")
})
app.get("/admin/deleteData", (req, res) => {
    res.send("Data Deleted")
})
app.listen(3000, () => console.log('Server is running on port 3000'));
HTTP Status Codes
HTTP status codes are standard response codes returned by web servers to indicate the result of a client's HTTP request. These codes help both the client and server understand what happened with the request and whether it was successful or encountered an error.

Categories of HTTP Status Codes:
1xx Informational: The request was received, and the process is continuing.
2xx Success: The request was successfully received, understood, and accepted.
3xx Redirection: Further action is required to complete the request.
4xx Client Error: The request contains bad syntax or cannot be fulfilled.
5xx Server Error: The server failed to fulfill a valid request.
Common HTTP Status Codes
1xx Informational
100 Continue: The server has received the request headers, and the client should proceed to send the request body.
2xx Success
200 OK: The request was successful, and the server responded with the requested data.
201 Created: The request was successful, and a new resource was created.
204 No Content: The request was successful, but there is no content to send in the response.
3xx Redirection
301 Moved Permanently: The resource has been permanently moved to a new URL. All future requests should use the new URL.
302 Found: The resource has been temporarily moved to a different URL, but future requests should still use the original URL.
304 Not Modified: The resource has not been modified since the last request, so the client can use the cached version.
4xx Client Error
400 Bad Request: The server could not understand the request due to invalid syntax.
401 Unauthorized: The client must authenticate itself to get the requested response.
403 Forbidden: The client does not have permission to access the requested resource.
404 Not Found: The server cannot find the requested resource. This usually occurs when the URL is incorrect.
5xx Server Error
500 Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.
502 Bad Gateway: The server, acting as a gateway, received an invalid response from the upstream server.
503 Service Unavailable: The server is currently unavailable, usually due to being overloaded or down for maintenance.
How to Use HTTP Status Codes in Express.js
In Express, you can send status codes using res.status() followed by the appropriate code:

app.get('/example', (req, res) => {
  res.status(200).send('Success');
});

app.get('/error', (req, res) => {
  res.status(404).send('Not Found');
});
Difference Between app.use() and app.all() in Express.js
Feature	app.use()	app.all()
Purpose	Mounts middleware functions or sub-routers to all or specific routes	Matches all HTTP methods (GET, POST, PUT, DELETE, etc.) on a specific route
Path Requirement	Can be used with or without a path	Requires a specific path
Applies to	All HTTP methods by default	All HTTP methods but only for the defined path
Common Use Case	Applying middleware logic across multiple routes or specific paths	Handling all HTTP methods (GET, POST, etc.) on one route
Functionality	Middleware is invoked sequentially until the next middleware or route handler is reached	Executes for any HTTP method (GET, POST, PUT, etc.) on the specified path
Examples
1. app.use() Example
// Middleware applied to all routes
app.use((req, res, next) => {
  console.log('Request received');
  next();
});

// Middleware applied to a specific path
app.use('/user', (req, res, next) => {
  console.log('User path accessed');
  next();
});
2. app.all() Example
// Match all HTTP methods on '/about' route
app.all('/about', (req, res) => {
  res.send('This route handles all HTTP methods');
});
Error-Handling Middleware in Express.js
Error-handling middleware in Express is used to catch and manage errors that occur during the processing of requests. It allows the application to respond with appropriate error messages and status codes.

Defining Error-Handling Middleware
Error-handling middleware is defined with four parameters: (err, req, res, next).
Express identifies it as an error handler because it includes the err parameter as the first argument.
Example of Error-Handling Middleware
// Define error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error details
  res.status(500).send('Something went wrong!'); // Send a 500 Internal Server Error response
});