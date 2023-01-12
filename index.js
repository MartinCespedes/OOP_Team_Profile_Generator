//Node Modules//
const inquirer = require("inquirer");
const fs = require("fs");

//Team Profiles//
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

//Generate HTML//
const generateHTML = require("./src/generateHTML");

//Array of Adding Employees to the Team //
const addEmployeeArray = [];

// Manager Prompt Questions//
const addManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter your name. (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Please enter your ID. (Required)",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Please enter a valid ID!");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the manager's email. (Required)",
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            console.log("Please enter a valid email!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter the manager's office number",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("That is not an office number!");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((managerInput) => {
      const { name, id, email, officeNumber } = managerInput;
      const manager = new Manager(name, id, email, officeNumber);

      addEmployeeArray.push(manager);
      console.log(manager);
    });
};

//Prompt to add new Employee//
const addEmployeeQuestions = () => {
  console.log(`
  ================================
  Adding Employee(s) To The Team
  ================================
  `);

  return inquirer
    .prompt([
      {
        //Employee List Questions//
        type: "list",
        name: "role",
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
        type: "input",
        when: (input) => input.role === "Engineer",
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
        type: "input",
        when: (input) => input.role === "Intern",
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
    .then((employeeData) => {
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
      } = employeeData;
      let employee;

      if (role === "Engineer") {
        employee = new Engineer(
          engineerName,
          ID,
          engineerEmail,
          gitHubUsername
        );

        console.log(employee);
      } else if (role === "Intern") {
        employee = new Intern(internName, ID, internEmail, education);

        console.log(employee);
      }
      addEmployeeArray.push(employee);

      if (addMore) {
        return addEmployeeQuestions(addEmployeeArray);
      } else {
        return addEmployeeArray;
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

addManager()
  .then(addEmployeeQuestions)
  .then((addEmployeeArray) => {
    return generateHTML(addEmployeeArray);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .catch((err) => {
    console.log(err);
  });
