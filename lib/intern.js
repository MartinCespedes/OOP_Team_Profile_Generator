const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, ID, email, internEducation) {
    super(name, ID, email);
    this.internEducation = internEducation;
  }

  getEducation() {
    return this.internEducation;
  }

  getRole() {
    console.log("Intern");
    return "Intern";
  }
}

module.exports = Intern;
