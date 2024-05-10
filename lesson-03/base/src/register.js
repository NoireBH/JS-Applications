window.addEventListener('load', start)

function start(){
    document.querySelector('form').addEventListener('submit', onRegister);
}

async function onRegister(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    let email = data.email.trim();
    let password = data.password.trim();
    let rePass = data.rePass.trim();
  
    const url = "http://localhost:3030/users/register";
    const fetchInfo = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
  
    try {

        if (!email || !password) {
            throw new Error('The fields are required!');
        }

        if (rePass != password) {
          throw new Error('The passwords don\'t match!');
        }

      const res = await fetch(url, fetchInfo);
  
      if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message);
      }
  
      const userData = await res.json();
      localStorage.setItem('user', JSON.stringify(userData));
  
      window.location = '/lesson-03/base';
  
    } 
    catch (error) {
      alert(error.message);
    }
  }
  