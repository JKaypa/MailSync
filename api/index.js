const express = require("express");
const server = express();
const { readFileSync } = require("fs");
const { parse } = require("csv-parse/sync");
const fileupload = require("express-fileupload");
const { getList, saveContacts, addMember } = require("./helper");
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.use(fileupload());


server.get("/", async (req, res) => {
  const resp = await getList();
  res.status(200).json(resp);
});


server.post("/csv", async (req, res) => {
  try {
    const list = req.files.file;
    const path = __dirname + "/files/" + list.name;
    await list.mv(path);

    const csvFile = readFileSync(path, "utf-8");
    const jsonFile = parse(csvFile, { columns: true });
    const contacts = jsonFile.map((member) => {
      return {
        id: member["System record ID"],
        email: member["Email Addresses\\Email address"],
        name: member["First name"],
        lastName: member["Last/Organization/Group/Household name"],
      };
    });

    await saveContacts(contacts);
    res
      .status(201)
      .send(
        "Csv file uploaded successfully, please wait for all contacts to be added. Refresh the page in a moment."
      );
  } catch (error) {
    res.status(400).send("Error uploading csv file");
  }
});


server.post("/member", async (req, res) => {
  const { email, name, lastName } = req.body;
  try {
    await addMember(email, name, lastName);
    res.status(201).send("Contact added successfully.");
  } catch (error) {
    res.status(400).send("Contact could not be added.");
  }
});


server.listen(3001, () => {
  console.log("server listening on port 3001");
});
