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
    type: "input",
    name: "engineerName",
    message: "Enter the Engineer's name",
  },
  {
    //Engineer ID//
    type: "input",
    name: "engineerId",
    message: "Enter the Engineer's Employee ID",
  },
  {
    //Engineer Email//
    type: "input",
    name: "engineerEmail",
    message: "Enter the Engineer's email address",
  },
  {
    //Engineer GitHub Username//
    type: "input",
    name: "engineerGitHub",
    message: "Enter the Engineer's GitHub username",
  },
];

const internQuestions = [
  {
    //Intern Name//
    type: "input",
    name: "internName",
    message: "Enter the Intern's name",
  },
  {
    //Intern Id//
    type: "input",
    name: "internId",
    message: "Enter Intern's Employee ID",
  },
  {
    //Intern Email//
    type: "input",
    name: "internEmail",
    message: "Enter Intern's email address",
  },
  {
    //Intern Education//
    type: "input",
    name: "internEducation",
    message: "Enter Intern's education",
  },
];
