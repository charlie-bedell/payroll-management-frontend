document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const errDisplay = document.getElementById('error-display');
  errDisplay.textContent = '';
  errDisplay.style.display = 'none';
  try {
    const username = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const signupResponse = await axios.post('https://payroll-api-e4a55d2c7bfa.herokuapp.com/user/signup', {
      username,
      password
    });
    errDisplay.textContent = signupResponse.data.message;
    errDisplay.style.color = 'black';
    errDisplay.style.display = 'block';
  } catch (err) {
    
    errDisplay.textContent = `${err.response.data.error}`;
    errDisplay.style.color = 'red';
    errDisplay.style.display = 'block';
  }
});
