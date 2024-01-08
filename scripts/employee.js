
function populateHTML(employee) {
  document.getElementById('head-title').innerText = `${employee.firstName} ${employee.lastName}`;

  document.getElementById('name-header').innerText = `${employee.firstName} ${employee.lastName}`;

  const departmentEle = document.getElementById('department');
  const countryEle = document.getElementById('country');
  const salaryEle = document.getElementById('salary');
  const bonusEle = document.getElementById('bonus');

  departmentEle.innerText = employee.department;
  departmentEle.value = employee.department;

  countryEle.innerText = employee.country;
  countryEle.value = employee.country;

  salaryEle.innerText = employee.salary;
  salaryEle.value = employee.salary;

  bonusEle.innerText = employee.bonus;
  bonusEle.value = employee.bonus;
}


function swapToInput(e) {
  const parent = e.target.parentElement;
  const pEle = parent.getElementsByTagName('p')[0];
  parent.removeChild(e.target);
  parent.removeChild(pEle);
  

  const inputEle = document.createElement('input');
  inputEle.type = 'text';
  inputEle.value = pEle.innerText;


  parent.appendChild(inputEle);
}

function getEmployeeFields() {
  const fieldContainer = document.getElementById('field-container');
  const valueWrappers = Array.from(fieldContainer.getElementsByClassName('value-wrapper'));
  
  const payload = {};
  console.log(valueWrappers[0].children);
  payload['department'] = valueWrappers[0].children[0].value;
  payload['country'] = valueWrappers[1].children[0].value;
  payload['salary'] = Number(valueWrappers[2].children[0].value);
  payload['bonus'] = Number(valueWrappers[3].children[0].value);

  return payload;
}

async function updateEmployee() {
  const token = localStorage.getItem('accessToken');
  const urlParams = new URLSearchParams(window.location.search);
  const companyId = urlParams.get('companyId');
  const employeeId = urlParams.get('employeeId');

  const payload = getEmployeeFields();

  const response = await axios.put(`https://payroll-api-e4a55d2c7bfa.herokuapp.com/companies/${companyId}/employees/${employeeId}`, payload, {headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }});

  window.location.href = `company.html`;
}

async function deleteEmployee() {
  const token = localStorage.getItem('accessToken');
  const urlParams = new URLSearchParams(window.location.search);
  const companyId = urlParams.get('companyId');
  const employeeId = urlParams.get('employeeId');

  const response = await axios.delete(`https://payroll-api-e4a55d2c7bfa.herokuapp.com/companies/${companyId}/employees/${employeeId}`, { headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }});
  window.location.href = 'company.html';
}


document.addEventListener('DOMContentLoaded', async (e) => {
  const token = localStorage.getItem('accessToken');
  const urlParams = new URLSearchParams(window.location.search);
  const companyId = urlParams.get('companyId');
  const employeeId = urlParams.get('employeeId');
  const result = await axios.get(`https://payroll-api-e4a55d2c7bfa.herokuapp.com/companies/${companyId}/employees/${employeeId}`,
                                   { headers: {
                                     'Authorization': `Bearer ${token}`,
                                     'Content-Type': 'application/json'
                                   }});
  const employee = result.data.employee[0];
  
  populateHTML(employee);
});

document.addEventListener('click', async (e) => {
  const targetClasses = Array.from(e.target.classList);
  if (targetClasses.includes('edit-btn')) {
    swapToInput(e);
  } else if (targetClasses.includes('update-btn')) {
    updateEmployee();
  } else if (targetClasses.includes('delete-btn')) {
    deleteEmployee();
  }
})
