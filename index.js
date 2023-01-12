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
      },
      {
        //Manager ID//
        type: "input",
        name: "managerId",
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
    ])
    .then((managerInput) => {
      const { managerName, managerId, managerEmail, managerOfficeNumber } =
        managerInput;
      const manager = new Manager(
        managerName,
        managerId,
        managerEmail,
        managerOfficeNumber
      );

      teamMembersArray.push(manager);
      console.log(manager);
    });
};

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
        choices: ["Add an Engineer", "Add an Intern"],
      },
      {
        //Engineer Name//
        type: "input",
        name: "engineerName",
        message: "Enter the Engineer's name",
      },
      {
        //Engineer ID//
        type: "input",
        name: "ID",
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
        when: (input) => input.addEmployeeQuestions === "Engineer",
        type: "input",
        name: "engineerGitHub",
        message: "Enter the Engineer's GitHub username",
      },
      {
        //Intern Name//
        type: "input",
        name: "internName",
        message: "Enter the Intern's name",
      },
      {
        //Intern Id//
        type: "input",
        name: "ID",
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
        when: (input) => input.addEmployeeQuestions === "Intern",
        type: "input",
        name: "internEducation",
        message: "Enter Intern's education",
      },
      {
        type: "confirm",
        name: "addMore",
        message: "Would you like to add one more employee to the team?",
        default: false,
      },
    ])
    .then((employeeInput) => {
      //DATA for Employees//

      let {
        engineerName,
        engineerEmail,
        internName,
        internEmail,
        addEmployeeQuestions,
        gitHubUsername,
        education,
        addMore,
      } = employeeInput;
      let employee;

      if (addEmployeeQuestions === "Engineer") {
        employee = new Engineer(
          engineerName,
          ID,
          engineerEmail,
          gitHubUsername
        );

        console.log(employee);
      } else if (addEmployeeQuestions === "Intern") {
        employee = new Intern(internName, ID, internEmail, education);

        console.log(employee);
      }
      teamMembersArray.push(employee);

      if (addMore) {
        return addEmployeeQuestions(teamMembersArray);
      } else {
        return teamMembersArray;
      }
    });
};

//Generate HTML page file using file system//
const writeFile = (data) => {
  fs.writeFile("./dist/index.html", data, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(
        "Your team profile has been successfully created! Please check out the index.html"
      );
    }
  });
};

managerQuestions()
  .then(addEmployeeQuestions)
  .then((teamMembersArray) => {
    return generateHTML(teamMembersArray);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .catch((err) => {
    console.log(err);
  });
