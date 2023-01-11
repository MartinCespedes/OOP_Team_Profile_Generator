const Employee = require("./employee");

class Intern extends Employee {
  constructor(name, id, email, education) {
    super(name, id, email);
    this.education = education;
  }

  getEducation() {
    console.log(this.education);
    return this.education;
  }

  getRole() {
    console.log("Intern");
    return "Intern";
  }
}

module.exports = Intern;
