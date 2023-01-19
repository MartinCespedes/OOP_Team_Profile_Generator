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
const inquirerObj = {
  addManager: function () {
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
              console.log("\n" + "Please enter a name!" + "\n");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "ID",
          message: "Please enter your ID. (Required)",
          validate: (nameInput) => {
            if (isNaN(nameInput)) {
              console.log("\n" + "Please enter a valid ID!" + "\n");
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
              console.log("\n" + "Please enter a valid email!" + "\n");
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
              console.log("\n" + "That is not an office number!" + "\n");
              return false;
            } else {
              return true;
            }
          },
        },
      ])
      .then((managerInput) => {
        console.log(generateHTML);
        const { name, ID, email, officeNumber } = managerInput;
        const manager = new Manager(name, ID, email, officeNumber);

        addEmployeeArray.push(manager);
        console.log(manager);
        this.addEmployeeQuestions();
      });
  },

  //Prompt to add new Employee//
  addEmployeeQuestions: function () {
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
          name: "choices",
          message: "To add employee select one of these options:",
          choices: ["Add an Engineer", "Add an Intern"],
        },
        {
          //Employee  Name//
          type: "input",
          name: "name",
          message: "Enter the Employee's name",
        },
        {
          //Employee  ID//
          type: "input",
          name: "ID",
          message: "Enter the Employee's ID",
        },
        {
          //Employee Email//
          type: "input",
          name: "email",
          message: "Enter the Employee's email address",
          validate: (email) => {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) {
              return true;
            } else {
              console.log("\n" + "Please enter a valid email!" + "\n");
              return false;
            }
          },
        },
        {
          //Engineer GitHub Username//
          type: "input",
          when: (input) => input.choices === "Add an Engineer",
          name: "engineerGitHub",
          message: "Enter the Engineer's GitHub username",
        },
        {
          //Intern Education//
          type: "input",
          when: (input) => input.choices === "Add an Intern",
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

        let { ID, name, email, engineerGitHub, internEducation } = employeeData;
        let employee;

        if (employeeData.choices === "Add an Engineer") {
          employee = new Engineer(name, ID, email, engineerGitHub);

          console.log(employee);
        } else if (employeeData.choices === "Add an Intern") {
          employee = new Intern(name, ID, email, internEducation);

          console.log(employee);
        }
        addEmployeeArray.push(employee);

        if (employeeData.addMore) {
          this.addEmployeeQuestions();
        } else {
          this.promiseChain(addEmployeeArray); //once finished return to next .then in chain
        }
      });
  },

  promiseChain: function (array) {
    generateHTML(array) //promise
      .then((pageHTML) => {
        return writeFile(pageHTML); //promise?
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

inquirerObj.addManager();
