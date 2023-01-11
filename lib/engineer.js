const Employee = require("./employee");

class Engineer extends Employee {
  constructor(name, id, email, gitHubUsername) {
    //super calls parent constructor
    super(name, id, email);
    this.gitHubUsername = gitHubUsername;
  }

  getGitHub() {
    console.log(this.gitHubUsername);
    return this.gitHubUsername;
  }

  getRole() {
    console.log("Engineer");
    return "Engineer";
  }
}

module.exports = Engineer;
