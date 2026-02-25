const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));
app.get("/healthz", (_, res) => res.status(200).send("ok"));

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
