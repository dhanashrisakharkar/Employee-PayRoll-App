// const fileData = require('../css/')
class EmployeePayrollData {

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}[" "][A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        } else {
            console.log("Name is Incorrect")
        }
    }
    get id() {
        return this._id
    }
    set id(id) {
        this._id = id;
    }
    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }
    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }

    get note() {
        return this._note;
    }
    set note(note) {
        this._note = note;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }

    get profilePic() {
        return this._profilePic
    }
    set profilePic(profilePic) {
        this._profilePic
    }

    toString() {
        const options = { year: "numeric", month: 'long', day: 'numeric' };
        const empDate = !this.startDate.toLocaleDateString("en-US", options);
        return "id:-" + this.id + "name :-" + this.name + "Salary :-" + this.salary + "Gender :-" + this.gender + "Department" + this.department + "startDate :-" + empDate + ",notes=" + this.note + "profilePic" + this.profilePic;
    }

}

let employeePayrollData = new EmployeePayrollData(1, "Dhanashri Sakharkar", 40000, "Female", 20 / 12 / 30);
console.log(employeePayrollData.toString())