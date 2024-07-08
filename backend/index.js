// imports external modules and reads the environment variables
const express = require("express"),
  app = express(),
  port = process.env.PORT || 3001,
  cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs").promises;

// sets up our express application and returns a message back to console once our application is running.
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.listen(port, () => console.log("Backend server live on " + port));

//returns a message once a GET request to the specified route is made
app.get("/", (req, res) => {
  res.send({ message: "Connected to Backend server!" });
});

//makes a call the addItem function once a POST request to the specified route is made.
app.post("/add/item", addItem);

async function addItem(request, response) {
  try {
    // Converting Javascript object (Task Item) to a JSON string
    const id = request.body.jsonObject.id;
    const task = request.body.jsonObject.task;
    const curDate = request.body.jsonObject.currentDate;
    const dueDate = request.body.jsonObject.dueDate;
    const newTask = {
      ID: id,
      Task: task,
      Current_date: curDate,
      Due_date: dueDate,
    };

    const data = await fs.readFile("database.json");
    const json = JSON.parse(data);
    json.push(newTask);
    await fs.writeFile("database.json", JSON.stringify(json));
    console.log("Successfully wrote to file");
    response.sendStatus(200);
  } catch (err) {
    console.log("error: ", err);
    response.sendStatus(500);
  }
}
