let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector("#name")
    const textError = document.querySelector('.text-error')
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = ""
            return
        }
        try {
            (new EmployeePayrollData).name = name.value
            textError.textContent = ""
        } catch (e) { textError.textContent = e }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value
    });

    checkForUpdate();


});
const year = document.getElementById('year')
const month = document.getElementById('month')
const day = document.getElementById('day')
const dateError = document.querySelector('.date-error')
year.addEventListener('change', function() {
    try {
        dateValidation()
    } catch (e) { dateError.textContent = e }
});
month.addEventListener('change', function() {
    try {
        dateValidation()
    } catch (e) { dateError.textContent = e }
});
day.addEventListener('change', function() {
    try {
        dateValidation()
    } catch (e) { dateError.textContent = e }
});

function dateValidation() {
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
        getInputValueById('#year')
    let newDate = Date.parse(date)
    let currDate = new Date()
    let miliDate = Date.parse(currDate) - 2592000000
    if (newDate < miliDate) {
        dateError.textContent = ""
        return
    } else throw 'Incorrect Date'
}

function save() {
    try {
        let employeePayrollData = createEmpPayroll();
        createAndUpdateStorage(employeePayrollData)
    } catch (e) { return }
}

function createAndUpdateStorage(empPayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"))
    if (employeePayrollList != undefined) {
        employeePayrollList.push(empPayrollData)

    } else {
        employeePayrollList = [empPayrollData]
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

function createEmpPayroll() {
    let employeePayrollData = new EmployeePayrollData()
    try {
        employeePayrollData.name = getInputValueById('#name')
    } catch (e) {
        setTextValue('.text-error', e)
        throw e
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop()
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop()
    employeePayrollData.departent = getSelectedValues('[name=departent]')
    employeePayrollData.salary = getInputValueById('#salary')
    employeePayrollData.note = getInputValueById('#notes')
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
        getInputValueById('#year')
    employeePayrollData.startDate = date
    employeePayrollData.id = Date.parse(new Date());
    alert(EmployeePayrollData.toString());

    return employeePayrollData

}


const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value)
    });
    return selItems;

}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=departent]', employeePayrollObj._departent);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
    setValue('#notes', employeePayrollObj._note);

}

const setSelectedValues = (propertyValue, value) => {
        let allItems = document.querySelectorAll(propertyValue);
        allItems.forEach(item => {
            if (Array.isArray(value)) {
                if (value.includes(item.value)) {
                    item.checked = true;
                }
            } else if (item.value === value)
                item.checked = true;
        })
    }
    //Use Case 13
    // const resetForm = () => {
    //     setValue('#name', '');
    //     unsetSelctedValues('[name=profile]');
    //     unsetSelctedValues('[name=gender]');
    //     unsetSelctedValues('[name=departent]');
    //     setValue('#salary', '');
    //     setValue('#notes', '');
    //     setValue('#day', '1');
    //     setValue('#month', 'january');
    //     setValue('#year', '2020');
    // }

// const unsetSelctedValues = (propertyValue) => {
//     let allItems = document.querySelectorAll(propertyValue);
//     allItems.forEach(item => {
//         item.checked = false;
//     });
// }
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}