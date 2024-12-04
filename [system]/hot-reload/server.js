const http = require("http");

// Set the port for the HTTP server
const PORT = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
  console.log("url", req.url);

  if (req.method !== "POST" || !req.url?.startsWith("/restart?resource=")) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Invalid request");
    return;
  }

  const resource = new URLSearchParams(req.url.split("?")[1]).get("resource");

  console.log("Resource to restart:", resource);

  if (resource !== "hot-reload") {
    ExecuteCommand(`restart ${resource}`);
  }

  // Handle the response
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Resource restarted");
});

// Start the server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`HTTP Server running on port ${PORT}`);
});
