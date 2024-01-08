function createDepartments(departments) {
  // gets an array of departments
  let departmentsDiv = document.getElementById('departments');
  for (let i = 0; i < departments.length; i++) {
    const departmentEle = document.createElement('div');
    departmentEle.classList.add = 'department';
    departmentEle.id = departments[i];

    const departmentTitleEle = document.createElement('h2');
    departmentTitleEle.innerText = departments[i];

    const ulEle = document.createElement('ul');
    ulEle.classList.add('employee-list');

    departmentEle.appendChild(departmentTitleEle);
    departmentEle.appendChild(ulEle);
    departmentsDiv.appendChild(departmentEle);
  }
}

function createEmployeeHeader(employee) {
  // gets an employee object
  // appends itself to its department
  const liEle = document.createElement('li');
  const headerEle = document.createElement('div');
  headerEle.classList.add('employee-header');
  liEle.classList.add('employee');
  liEle.id = employee._id;

  const nameDiv = document.createElement('div');
  nameDiv.classList.add('fullName');
  const nameEle = document.createElement('p');
  nameEle.innerText = `${employee.firstName} ${employee.lastName}`;
  nameDiv.appendChild(nameEle);

  const countryDiv = document.createElement('div');
  countryDiv.classList.add('country');
  const countryEle = document.createElement('p');
  countryEle.innerText = employee.country;
  countryDiv.appendChild(countryEle);

  const positionDiv = document.createElement('div');
  positionDiv.classList.add('position');
  const positionEle = document.createElement('p');
  positionEle.innerText = employee.position;
  positionDiv.appendChild(positionEle);

  const startEndDateDiv = document.createElement('div');
  startEndDateDiv.classList.add('start-end-date');
  const startEndDateEle = document.createElement('p');
  const startDate = new Date(employee.start_date);
  const endDate = new Date(employee.end_date);
  const shortMAndYear = Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short'});
  
  let dateStr;
  if (endDate.getFullYear() === 1969) {
    dateStr = `${shortMAndYear.format(startDate)} - present`;
  } else {
    dateStr = `${shortMAndYear.format(startDate)} - ${shortMAndYear.format(endDate)}`;
}

  startEndDateEle.innerText = dateStr;
  startEndDateDiv.appendChild(startEndDateEle);

  // const employeePage = createEmployeePage(employee);

  headerEle.appendChild(nameDiv);
  headerEle.appendChild(countryDiv);
  headerEle.appendChild(positionDiv);
  headerEle.appendChild(startEndDateDiv);
  liEle.appendChild(headerEle);
  // liEle.appendChild(employeePage);

  const departmentDiv = document.getElementById(employee.department);
  const ulEle = departmentDiv.getElementsByClassName('employee-list')[0];
  ulEle.appendChild(liEle);
}

function createEmployeePage(employee) {
  let employeePage = document.createElement('div');
  employeePage.classList.add('employee-page');
  
  const nameEle = document.createElement('h2');
  nameEle.innerText = `${employee.firstName} ${employee.lastName}`;

  let employeeItems = Object.entries(employee);
  employeeItems = employeeItems.filter((x) => {
    switch(x[0]) {
    case '_id':
      return false;
    case 'firstName':
      return false;
    case 'lastName':
      return false;
    case 'start_date':
      return false;
    case 'end_date':
      return false;
    case 'companyId':
      return false;
    case 'createdAt':
      return false;
    case 'updatedAt':
      return false;
    case '__v':
      return false;
    default:
      return true;
    }
    });

  employeeItems.forEach((x) => {
    const headerValue = x[0];
    const mainValue = x[1];

    const headerEle = document.createElement('h3');
    headerEle.innerText = headerValue;

    const mainEleWrapper = document.createElement('div');
    
    const mainEle = document.createElement('p');
    mainEle.innerText = mainValue;

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.innerText = 'Edit';

    mainEleWrapper.appendChild(mainEle);
    mainEleWrapper.appendChild(editButton);

    employeePage.appendChild(headerEle);
    employeePage.appendChild(mainEleWrapper);
  });
  return employeePage;
}

async function getCompanyName(companyId, token) {
  const company = await axios.get(`http://localhost:3000/companies/${companyId}`,
                                  { headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                  }});
  return company.data.companyName;
}

document.addEventListener('DOMContentLoaded', async (e) => {
  const token = localStorage.getItem('accessToken');
  try {
    const requestResult = await axios.get('http://localhost:3000/companies',
                                    { headers: {
                                      'Authorization': `Bearer ${token}`,
                                      'Content-Type': 'application/json'
                                    }});
    
    const employees = requestResult.data;
    if (Array.isArray(employees)) {
      let departmentList = employees.map((x) => x.department);
      departmentList = [...new Set(departmentList)];
      createDepartments(departmentList, token);
      employees.forEach((x) => createEmployeeHeader(x));
      const companyName = await getCompanyName(employees[0].companyId, token);
      document.getElementById('company-title').innerText = companyName;
      const companyHeader = document.getElementById('company-header');
      companyHeader.innerText = companyName;
      companyHeader.classList.add(employees[0].companyId);
    } else {
      const employee = employees.employee[0];
      const companyName = await getCompanyName(employee.companyId, token);
      createDepartments([employee.department]);
      createEmployeeHeader(employee);
      document.getElementById('company-title').innerText = companyName;
      const companyHeader = document.getElementById('company-header');
      companyHeader.innerText = companyName;
      companyHeader.classList.add(employee.companyId);
    } 
  } catch (err) {
    console.log(err);
  } 
});

document.addEventListener('click', async (e) => {
  const employeeId = e.target.closest('.employee').id;
  const companyId = Array.from(document.getElementById('company-header').classList)[0];
  if (employeeId) {
    window.location.href = `employee.html?companyId=${companyId}&employeeId=${employeeId}`;
  }
});


