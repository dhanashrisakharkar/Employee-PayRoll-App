class EmployeePayrollData {
    id;
    // get id() { return this._id }
    // set id(id) {
    //     this._id = id
    // }

    get name() { return this._name }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
        if (nameRegex.test(name))
            this._name = name
        else throw 'Name is Incorrect'
    }

    get profilePic() { return this._profilePic }
    set profilePic(profilePic) {
        this._profilePic = profilePic
    }

    get gender() { return this._gender }
    set gender(gender) {
        this._gender = gender
    }

    get departent() { return this._departent }
    set departent(departent) {
        this._departent = departent
    }

    get salary() { return this._salary }
    set salary(salary) {
        this._salary = salary
    }

    get note() { return this._note }
    set note(note) {
        this._note = note
    }

    get startDate() { return this._startDate }
    set startDate(startDate) {
        let now = new Date();
        if (startDate > now) throw 'Start Date is Future Date!';
        var diff = Math.abs(now.getTime() - startDate.getTime());
        if (diff / (1000 * 60 * 60 * 24) > 30)
            throw ' Start Date is beyount 30 days';
        this._startDate = startDate
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
        return "id=" + this.id + ", name=" + this.name + ", grnder=" + this.gender + ", profileImg=" + this.profilePic +
            ", department=" + this.departent + ", salary=" + this.salary + ", startDate=" + empDate +
            ", note=" + this.note
    }
}