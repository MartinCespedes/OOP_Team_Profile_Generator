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

const engineerQuestions = [
  {
    //Engineer Name//
    name: "engineerName",
    message: "Enter the Engineer's name?",
    type: "input",
  },
  {
    //Engineer ID//
    name: "engineerId",
    message: "Enter the Engineer's Employee ID?",
    type: "input",
  },
  {
    //Engineer Email//
    name: "engineerEmail",
    message: "Enter the Engineer's email address",
    type: "input",
  },
  {
    //Engineer GitHub Username//
    name: "engineerGitHub",
    message: "Enter the Engineer's GitHub username",
    type: "input",
  },
];
