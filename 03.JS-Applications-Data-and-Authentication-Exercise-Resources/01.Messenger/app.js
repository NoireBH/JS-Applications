function attachEvents() {
  const sendBtn = document.getElementById("submit");
  const refreshBtn = document.getElementById("refresh");
  const author = document.getElementsByName("author")[0];
  const message = document.getElementsByName("content")[0];

  sendBtn.addEventListener("click", onSend);
  refreshBtn.addEventListener("click", onRefresh);

  async function onSend() {
  
    const url = "http://localhost:3030/jsonstore/messenger";
  
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: author.value,
        content: message.value,
      }),
    });
  }

}

async function onRefresh() {
  const url = "http://localhost:3030/jsonstore/messenger";

  const res = await fetch(url);
  const data = await res.json();
  let textAreaContent = document.getElementById("messages");
  textAreaContent.textContent = "";

  let commentArray = [];

  for (const key in data) {
    commentArray.push(`${data[key].author}: ${data[key].content}`);
  }

  textAreaContent.textContent = commentArray.join("\n");
}

attachEvents();
