const http = require("http");

const server = http.createServer(function (req, res) {
    res.end("Hello from server");
});

 server.listen(3009); 
// () => {
//     console.log("Server is running on http://localhost:3000");
// });


