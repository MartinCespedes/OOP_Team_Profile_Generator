class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    console.log(`Name of Employee is ${this.name}`);
    return this.name;
  }

  getId() {
    console.log(`Id of Employee is ${this.id}`);
    return this.id;
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
