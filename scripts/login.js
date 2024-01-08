document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const errDisplay = document.getElementById('error-display');
  errDisplay.style.display = 'none';
  
  try {
    const username = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const loginResponse = await axios.post('http://localhost:3000/user/login', {
      username,
      password
    });
    const token = loginResponse.data.token;
    localStorage.setItem('accessToken', token);
    window.location.href = 'company.html';
  } catch (err) {
    errDisplay.textContent = err.response.data.message;
    errDisplay.style.display = 'block';
  }
  
});
