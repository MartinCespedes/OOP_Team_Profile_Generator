class Employee {
  constructor(name, ID, email) {
    this.name = name;
    this.ID = ID;
    this.email = email;
  }

  getName() {
    console.log(`Name of Employee is ${this.name}`);
    return this.name;
  }

  getId() {
    console.log(`Id of Employee is ${this.ID}`);
    return this.ID;
  }

  getEmail() {
    console.log(`Email of Employee is ${this.email}`);
    return this.email;
  }

  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
