//Node Modules//
const inquirer = require("inquirer");
const fs = require("fs");

//Team Profiles//
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

//Generate HTML//
const generateHTML = require("./src/generateHTML");

//Array of Team Members//
const teamMembersArray = [];

//Array of managerQuestions//
const managerQuestions = () => {
  return inquirer
    .prompt([
      {
        //Manager Name//
        type: "input",
        name: "managerName",
        message: "What is your name? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Enter the manager's name!");
            return false;
          }
        },
      },
      {
        //Manager ID//
        type: "input",
        name: "managerEmployeeId",
        message: "Enter your Employee ID",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("That is not a manager's ID!");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        //Manager Email//
        type: "input",
        name: "managerEmail",
        message: "Enter your Email",
        validate: (managerEmail) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            managerEmail
          );
          if (valid) {
            return true;
          } else {
            console.log("You need to enter an email!");
            return false;
          }
        },
      },
      {
        //Office Number//
        type: "input",
        name: "managerOfficeNumber",
        message: "Enter your office number",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("You need to enter the office number!");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((managerInput) => {
      const { managerName, managerEmployeeId, email, officeNumber } =
        managerInput;
      const manager = new Manager(
        managerName,
        managerEmployeeId,
        email,
        officeNumber
      );

      teamMembersArray.push(manager);
      console.log(manager);
    });
};

//Array of engineerQuestions//
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

//Array of internQuestions//
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

//Prompt to add new Employee//
const addEmployeeQuestions = () => {
  console.log(`
  =============================
  Adding Employees To The Team
  =============================
  `);

  return inquirer
    .prompt([
      {
        //Employee List Questions//
        type: "list",
        name: "addEmployeeQuestions",
        message: "To add employee select one of these options:",
        choices: ["Add an Engineer", "Add an Intern", "Finish and exit"],
      },
    ])
    .then((employeeData) => {
      //DATA for Employees//

      let {
        name,
        engineerEmail,
        internEmail,
        role,
        gitHubUsername,
        education,
        confirmAddEmployee,
      } = employeeData;
      let employee;

      if (role === "Engineer") {
        employee = new Engineer(name, id, engineerEmail, gitHubUsername);

        console.log(employee);
      } else if (role === "Intern") {
        employee = new Intern(name, id, internEmail, education);

        console.log(employee);
      }

      teamMembersArray.push(employee);

      if (confirmAddEmployee) {
        return addEmployeeQuestions(teamMembersArray);
      } else {
        return teamMembersArray;
      }
    });
};

//Generate HTML page file using file system//
const writeFile = (data) => {
  fs.writeFile("", data, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(
        "Your team profile has been successfully created! Check by going to your index.html"
      );
    }
  });
};

managerQuestions()
  .then(addEmployee)
  .then((teamMembersArray) => {
    return generateHTML(teamMembersArray);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .catch((err) => {
    console.log(err);
  });
