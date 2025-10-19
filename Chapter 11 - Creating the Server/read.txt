# Creating a Server

## Q: What is a server?
**A: Understanding Servers: Hardware and Software**

- What is `Server` ?
The term "server" can refer to both hardware and software, depending on the context. 
    -  `Hardware` : A physical machine (computer) that provides resources and services to other computers (clients) over a network

    - `Software` :  An application or program that handles requests and delivers data to clients.

- Deploying an Application on a Server

    -  When someone says "deploy your app on a server," they usually mean:
    
    1 **Hardware Aspect** : You need a physical machine (server) to run your application. This machine has a CPU, RAM, storage, etc.
 
    2 **Operating System OS** : The server hardware runs an operating system like Linux or Windows. Your application runs on this OS.
   
    3 **Server Software** : The software (e.g., a web server like Apache or an application server built with Node.js) that handles requests from users.

## Client-Server Architecture

 The term "client" refers to someone accessing a server. Imagine a user sitting at a computer wanting to access a file from a server. For this, the client needs to open a socket connection (not to be confused with WebSocket). Every client has an IP address, and every server has an IP address as well. The client could be a web browser.

To access the file, the client opens a socket connection. On the server side, there should be an application that is listening for such requests, retrieves the requested file, and sends it back to the client.

There can be multiple clients, and each client creates a socket connection to get data. After the data is received, the socket connection is closed. If the client needs to make another request, a new socket connection is created, data is retrieved, and the connection is closed again

## Q: Can I create multiple servers?
**A :** Yes, you can create multiple HTTP servers.

  Now, suppose a user is sending a request. How do we know which server it should go to?

 When I mention creating an HTTP server, it means we are setting up two different Node.js applications. The distinction between these servers is defined by a port, which is a 4-digit number (e.g., port 3000).

 For example, suppose an HTTP server with IP address `102.209.1.3`is running on port `3000` . This combination of IP address and port number (`102.209.1.3:3000` ) indicates which specific HTTP server the request should be routed to.

 Essentially, this means thereʼs a single computer (the server) that can run multiple applications, each with its internal servers. The port number determines which application or server the request is directed to.

 ##  Socket vs WebSockets
 When a user makes a request to a website, a socket connection is established between the client and the server. This connection is typically used for a single request-response cycle: the client sends a request, the server processes it, sends back the response, and then the socket is closed. This process involves opening a new connection for each request.

On the other hand, WebSockets introduce a more efficient method by allowing the connection to remain open. This means that after the initial connection is established, it stays active, allowing for continuous communication between the client and server. Both the client and server can send and receive data at any time without the need to re-establish the connection. This persistent connection is ideal for real-time applications, where continuous interaction is required, such as in chat applications, online gaming, or live updates.

## Creating a Server

 `localhost:999`

```
const http = require("node:http");
const port = 999;
const server = http.createServer(function (req, res) {
    res.end("server Created")
})
server.listen(port, () => {
    console.log("Server running on port " + port)
})

```
 Now, I want to handle different responses for the URL 
`localhost:3000/getsecretdata`

```
const http = require("node:http");
const port = 999;
const server = http.createServer(function (req, res) {
    if (req.url === "/getSecretData") {
        res.end("You are a human and the the secret so chill")
    }
    res.end("server Created")
})

server.listen(port, () => {
    console.log("Server running on port " + port)
})

```

`We use Express to create a server. Express is a framework built on top of Node.js that makes our lives easier`.