//Node Modules//
const inquirer = require("inquirer");
const fs = require("fs");

//Team Profiles//
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Array of Adding Employees to the Team //
const addEmployeeArray = [];

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
        name: "name",
        message: "Enter the Employee's name",
      },
      {
        //Engineer ID//
        type: "input",
        name: "ID",
        message: "Enter the Employee's ID",
      },
      {
        //Engineer Email//
        type: "input",
        name: "email",
        message: "Enter the Employee's email address",
      },
      {
        //Engineer GitHub Username//
        type: "input",
        when: (input) => input.role === "Add an Engineer",
        name: "engineerGitHub",
        message: "Enter the Engineer's GitHub username",
      },
      {
        //Intern Education//
        type: "input",
        when: (input) => input.role === "Add Intern",
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
        name,
        email,
        ID,
        addEmployeeQuestions,
        gitHubUsername,
        education,
        addMore,
      } = employeeData;
      let employee;

      if (role === "Add an Engineer") {
        employee = new Engineer(name, ID, email, gitHubUsername);

        console.log(employee);
      } else if (role === "Add an Intern") {
        employee = new Intern(name, ID, email, education);

        console.log(employee);
      }
      addEmployeeArray.push(employee);

      if (confirm.addMore) {
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
