const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, ID, email, engineerGitHub) {
    //super calls parent constructor
    super(name, ID, email);
    this.engineerGitHub = engineerGitHub;
  }

  getGitHub() {
    return this.engineerGitHub;
  }

  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
