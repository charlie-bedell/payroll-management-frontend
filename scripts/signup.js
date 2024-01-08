document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const errDisplay = document.getElementById('error-display');
  errDisplay.textContent = '';
  errDisplay.style.display = 'none';
  try {
    const username = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const signupResponse = await axios.post('http://localhost:3000/user/signup', {
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
