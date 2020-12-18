window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml =
        "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let empPayrollData = createEmployeePayrollJSON()[1];
    const innerHtml = `${headerHtml}
    <tr>
        <td>
            <img class="profile" alt="" src="${empPayrollData._profilePic}">
        </td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDepHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${empPayrollData._startDate}</td>
        <td>
            <img id="1" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
            <img id="1" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
        </td>
    </tr> `;
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [{
            _name: 'Dhanashri Sakharkar',
            _gender: 'male',
            _department: [
                'Eingineering',
                'Finance'
            ],

            _salary: '500000',
            _startDate: '29 oct 2019',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -7.png'

        },
        {
            _name: 'Abhiti Ghumde',
            _gender: 'female',
            _department: [
                'Sales'
            ],
            _salary: '400000',
            _startDate: '29 Oct 2019',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/profile-images/Ellipse -1.png'
        }
    ];
    return empPayrollListLocal;
}

const getDepHtml = (depList) => {
    let deptHtml = '';
    for (const dept of depList) {
        deptHtml = `${deptHtml} <div class='dept=label'>${dept}</div)`
    }
    return deptHtml;
}