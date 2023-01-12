const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const teamMembersArray = [];

const managerQuestions = [
  {
    //Manager Name//
    type: "input",
    name: "managerName",
    message: "What is your name? (Required)",
  },
  {
    //Manager ID//
    type: "input",
    name: "managerEmployeeId",
    message: "Enter your Employee ID",
  },
  {
    //Manager Email//
    type: "input",
    name: "managerEmail",
    message: "Enter your Email",
  },
  {
    //Office Number//
    type: "input",
    name: "managerOfficeNumber",
    message: "Enter your office number",
  },
];
