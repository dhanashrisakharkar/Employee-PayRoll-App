let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector("#name")
        // const textError = document.querySelector('.text-error')
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            setTextValue('.test-error', "");
            return
        }
        try {
            (new EmployeePayrollData).name = name.value
            setTextValue('.text-error', "");
        } catch (e) {
            setTextValue('.text-error', e);
        }
    });

    const date = document.querySelector('#date');
    date.addEventListener('input', function() {
        let startDate = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');

        try {
            (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
            setTextValue('.date-error', "");
        } catch (e) {
            setTextValue('.date-error', e);
        }
    })



    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value
    });

    checkForUpdate();


});
// const year = document.getElementById('year')
// const month = document.getElementById('month')
// const day = document.getElementById('day')
// const dateError = document.querySelector('.date-error')
// year.addEventListener('change', function() {
//     try {
//         dateValidation()
//     } catch (e) { dateError.textContent = e }
// });
// month.addEventListener('change', function() {
//     try {
//         dateValidation()
//     } catch (e) { dateError.textContent = e }
// });
// day.addEventListener('change', function() {
//     try {
//         dateValidation()
//     } catch (e) { dateError.textContent = e }
// });

// function dateValidation() {
//     let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
//         getInputValueById('#year')
//     let newDate = Date.parse(date)
//     let currDate = new Date()
//     let miliDate = Date.parse(currDate) - 2592000000
//     if (newDate < miliDate) {
//         dateError.textContent = ""
//         return
//     } else throw 'Incorrect Date'
// }

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        // alert(e);
        return;
    }
}

const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._departent = getSelectedValues('[name=departent]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

function createAndUpdateStorage() {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"))
    if (employeePayrollList) {
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
        if (!empPayrollData) {
            employeePayrollList.push(createEmployeePayrollData());

        } else {
            //const index = employeePayrollList.map(empData._id).indexOf(empPayrollData._id);
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
        }
    } else {
        employeePayrollList = [empPayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}
const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.departent = employeePayrollObj._departent;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try {
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    } catch (e) {
        setTextValue('.date-error', e);
        throw e;
    }
}

const createNewEmployeeId = () => {
        let empID = localStorage.getItem("EmployeeID");
        empID = !empID ? 1 : (parseInt(empID) + 1).toString();
        localStorage.setItem("EmployeeId", empID);
        return empID;
    }
    // const createEmpPayroll = () => {

//     let employeePayrollData = new EmployeePayrollData();
//     try {
//         employeePayrollData.name = getInputValueById('#name');
//     } catch (e) {
//         setTextValue('.text-error', e);
//         throw e;
//     }

// employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop()
// employeePayrollData.gender = getSelectedValues('[name=gender]').pop()
// employeePayrollData.departent = getSelectedValues('[name=departent]')
// employeePayrollData.salary = getInputValueById('#salary')
// employeePayrollData.note = getInputValueById('#notes')
// let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
//     getInputValueById('#year')
// employeePayrollData.startDate = Date.parse(date);
// //employeePayrollData.id = Date.parse(new Date());
// alert(employeePayrollData.EmployeePayrollData.toString());

// return employeePayrollData
// }

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
const resetForm = () => {
    setValue('#name', '');
    unsetSelctedValues('[name=profile]');
    unsetSelctedValues('[name=gender]');
    unsetSelctedValues('[name=departent]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'january');
    setValue('#year', '2020');
}

const unsetSelctedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const setTextValue = (id, value) => {
    const element = document.querySelectorAll(id);
    element.textContent = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = () => {
    const element = document.querySelector(id);
    element.setSelectedIndex = index;
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}