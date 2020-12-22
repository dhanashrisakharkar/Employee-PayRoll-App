let empPayrollList
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmpPayrollDataFromStorage()
    document.querySelector(".emp-count").textContent = empPayrollList.length
    localStorage.removeItem('editEmp')
    createInnerHtml()
});

function getEmpPayrollDataFromStorage() {
    return localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : []
}

function createInnerHtml() {
    const headerHtml = `<tr><th></th><th>Name</th><th>Gender</th><th>Department</th>
        <th>Salary</th><th>start Date</th><th>Actions</th></tr>`
    if (empPayrollList.length == 0) return
    let innerHtml = `${headerHtml}`
    for (let empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
        <tr>
        <td><img src="${empPayrollData._profilePic}" class="profile" width="30px" alt=""></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._departent)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${empPayrollData._startDate}</td>
        <td>
            <img id="${empPayrollData._id}" onclick="remove(this)" alt="delete" width="30px" src="../assets/icons/delete-black-18dp.svg">
            <img id="${empPayrollData._id}" onclick="update(this)" alt="edit" width="30px" src="../assets/icons/create-black-18dp.svg">
        </td>
    </tr>`
    }
    document.querySelector('#display').innerHTML = innerHtml
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div)`
    }
    return deptHtml;
}

function remove(node) {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id)
    if (!empPayrollData) return;
    let index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
    empPayrollList.splice(index, 1)
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList))
    document.querySelector(".emp-count").textContent = empPayrollList.length
    createInnerHtml();
}