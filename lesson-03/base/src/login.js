window.addEventListener("load", start);

function start() {
  document.querySelector("form").addEventListener("submit", onLogin);
}

async function onLogin(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  let email = data.email.trim();
  let password = data.password.trim();

  const url = "http://localhost:3030/users/login";
  const fetchInfo = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  try {
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
