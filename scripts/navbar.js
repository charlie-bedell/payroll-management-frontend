function createNavElement(name, ref) {
  const liEle = document.createElement('li');
  const aEle = document.createElement('a');
  aEle.textContent = name;
  aEle.href = ref;
  liEle.appendChild(aEle);
  return liEle;
}

function navbar() {
  const navItems = [
    ['Home', 'index.html'],
    ['Log In', 'login.html'],
    ['Sign Up', 'signup.html'],
    ['Company', 'company.html']
  ];
  const navUlEle = document.createElement('ul');

  navItems.forEach((item) => {
    navUlEle.appendChild(createNavElement(...item));
  });

  const existingNav = document.getElementById('main-nav');
  if (existingNav) {
    existingNav.appendChild(navUlEle);
  } else {
    const nav = document.createElement('nav');
    nav.id = 'main-nav';
    nav.appendChild(navUlEle);
    const headerEle = document.getElementsByTagName('header')[0];
    console.log(headerEle);
    headerEle.appendChild(nav);
  }
}

navbar();
