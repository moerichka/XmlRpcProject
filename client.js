let xmlrpc = require("xmlrpc");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const client = xmlrpc.createClient({
  host: "localhost",
  port: 8888,
  path: "/",
}); //8888

app.get("/", (req, res) => {
  res.render("index", { value: "Message" });
  // res.render("index", { weather: "Message", error: null });
});

app.post("/", async (req, res) => {
  console.log("req.body: ", req.body);
  // const { weather, error } = await weatherReq(city);
  const infoArray = [];
  infoArray[0] = req.body.mes;
  infoArray[1] = Number(req.body.number);
  infoArray[2] = [req?.body?.designer, req?.body?.programmer];
  infoArray[3] = {
    name : req.body.name,
    surname : req.body.surname
  };

  client.methodCall("anAction", [infoArray], function (error, value) {
    console.log("Method response for " + value);
    res.render("index", { value });
  });

  // res.render("index", { value, error });
});

app.listen(3000, () => {
  console.log("Server has been started on port 3000...");
});
