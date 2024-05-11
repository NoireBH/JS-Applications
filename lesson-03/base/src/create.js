window.addEventListener("load", start);

function start() {
  document.querySelector("form").addEventListener("submit", onCreate);
}

async function onCreate(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const body = JSON.stringify({
    name: data.name.trim(),
    img: data.img,
    ingredients: data.ingredients.split('\n').map(l => l.trim()).filter(l => l),
    steps: data.steps.split('\n').map(l => l.trim()).filter(l => l)
  });

  const token = sessionStorage.getItem('authToken');
    if (token == null) {
        return window.location = '/lesson-03/base';
    }

    try {
        const response = await fetch('http://localhost:3030/data/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body
        });
        
        if (response.ok) {
            window.location = '/lesson-03/base';
        } else {
            throw new Error(await response.json());
        }
    } catch (err) {
        console.error(err.message);
    }


}