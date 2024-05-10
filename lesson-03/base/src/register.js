window.addEventListener('load', start)

function start(){
    document.querySelector('form').addEventListener('submit', onLogin);
}

async function onLogin(event) {
    event.preventDefault();

    const formData = new formData(event.target);
    const data = Object.fromEntries(formdata.entries());

    let email = data.email.trim();
    let password = data.password.trim();

    const url = 'http://localhost:3030/users/register'
    const fetchInfo = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email,password})
    }

    try {
         const res = await fetch(url,)
    } catch (error) {
        
    }
}