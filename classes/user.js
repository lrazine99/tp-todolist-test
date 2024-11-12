class User {
  constructor(firstName, lastName, age, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.password = password;
    this.todolist = [];
  }

  getAge() {
    return new Date().getFullYear() - this.age.getFullYear();
  }

  validPassword() {
    if (this.password.length < 8 || this.password.length > 40) {
      return false;
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

    return regex.test(this.password);
  }

  isValid() {    
    const emailRegex = new RegExp("^[\\w.-]+@[\\w-]+\\.[a-zA-Z]{2,}$");

    switch (true) {
      case this.firstName === "":
        return `Invalid firstName: ${this.age}`;

      case this.lastName === "":
        return `Invalid lastName: ${this.age}`;

      case this.age === "":
        return `Invalid age: ${this.age}`;

      case this.email === "":
        return `Invalid email: ${this.email}`;

      case this.email.match(emailRegex) === null:
        return `Invalid email: ${this.email}`;

      case this.age instanceof Date === false:
        return `Invalid age not instanceof Date Object: ${this.age}`;

      case this.getAge() < 13:
        return `Invalid age not above at minimum 13: ${this.getAge()}`;

      case this.validPassword() === false:
        return `Invalid password should be beetwen 8 and 40 characters in 
        length and have at least one uppercase letter, one lowercase letter and one number`;
      default:
        return true;
    }
  }
}

module.exports =  User ;
