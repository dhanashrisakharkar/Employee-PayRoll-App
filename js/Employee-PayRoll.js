//Use case 10
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    })


    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;

    });
});
const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData)
    } catch (e) {
        return;
    }
}

//Use Case 11
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name')
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.id = getSelectedValues('[name = id')
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]').pop();
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.salary = getInputValueById('#notes').pop();
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.date = Date.parse(data);
    alert(employeePayrollData.toString());
    return employeePayrollData;

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

// const getInputElementValue = (id) => {
//         let value = document.getElementById(id).value;
//         return value;
//     }
//Use Case 12


function createAndUpdateStorage(employee) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employee);
    } else {
        employeePayrollList = [employee]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

//Use Case 13
const resetForm = () => {
    setValue('#name', '');
    unsetSelctedValues('[name=profile]');
    unsetSelctedValues('[name=gender]');
    unsetSelctedValues('[name=department]');
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
    const element = document.querySelectorAll(id);
    element.value = value;
}