const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

const managerQuestions = [
  {
    type: "input",
    name: "managerName",
    message: "what is your name? (Required)",
  },
];
