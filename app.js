const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is live on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.json({ message: "Hello From Api" });
});
