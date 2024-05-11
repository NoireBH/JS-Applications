function attachEvents() {
    const BASE_URL = "http://localhost:3030/jsonstore/collections/books";
    const loadBooksBtn = document.getElementById("loadBooks");
  
    loadBooksBtn.addEventListener("click", loadAllBooksHandler);
    const submitBtn = document.querySelector("#form button");
    submitBtn.addEventListener("click", submitBookHandler);
  
    let formContainer = document.getElementById("form");
  
    let bookId = null;
    
    loadAllBooksHandler();
  
    async function loadAllBooksHandler() {
      const res = await fetch(BASE_URL);
      const data = await res.json();
  
      let tbodyContainer = document.querySelector("table tbody");
      tbodyContainer.innerHTML = "";
      let form_h3 = (formContainer.children[0].textContent = "FORM");
      let formBtn = (formContainer.children[5].textContent = "Submit");
  
      const titleInfo = document.getElementsByName("title")[0];
      const authorInfo = document.getElementsByName("author")[0];
      titleInfo.value = "";
      authorInfo.value = "";
  
      for (const key in data) {
        let tr = document.createElement("tr");
        let tdTitle = document.createElement("td");
        let tdAuthor = document.createElement("td");
        let tdAction = document.createElement("td");
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");
  
        editBtn.textContent = "Edit";
        deleteBtn.textContent = "Delete";
  
        let formBtn = formContainer.children[5];
        editBtn.addEventListener("click", editBookHandler);
        deleteBtn.addEventListener("click", deleteBookHandler);
        formBtn.addEventListener("click", submitBookHandler);
        tdTitle.textContent = data[key].title;
        tdAuthor.textContent = data[key].author;      
        editBtn.id = key;
        deleteBtn.id = key;
  
        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tdAction.appendChild(editBtn);
        tdAction.appendChild(deleteBtn);
        tr.appendChild(tdAction);
        tbodyContainer.appendChild(tr);
      }
    }
  
    async function submitBookHandler() {
      const titleInfo = document.getElementsByName("title")[0];
      const authorInfo = document.getElementsByName("author")[0];
      let title = titleInfo.value;
      let author = authorInfo.value;
  
      const httpHeaders = {
        method: "Post",
        body: JSON.stringify({ author, title }),
      };
  
      const res = await fetch(BASE_URL, httpHeaders);
      const data = await res.json();
  
      loadAllBooksHandler();
    }
  
    function editBookHandler(e) {
      let form_h3 = formContainer.children[0];
      let formBtn = formContainer.children[5];
      let titleInput = formContainer.children[2];
      let authorInput = formContainer.children[4];
      let trContainer = e.currentTarget.parentNode.parentNode;
      let title = trContainer.children[0];
      let author = trContainer.children[1];
      console.log(author);
      console.log(title);
      titleInput.value = title.textContent
      authorInput.value = author.textContent
      form_h3.textContent = "Edit FORM";
      formBtn.textContent = "Save";
      bookId = this.id;
  
      let editBtn = this;
      formBtn.removeEventListener("click", submitBookHandler);
      formBtn.addEventListener("click", saveBookChangesHandler);
    }
  
    async function deleteBookHandler(e) {
      bookId = this.id;
  
      const httpHeaders = {
        method: "Delete",
      };
  
      const res = await fetch(`${BASE_URL}/${bookId}`, httpHeaders);
      const data = await res.json();
  
      loadAllBooksHandler();
    }
  
    async function saveBookChangesHandler() {
      const titleInfo = document.getElementsByName("title")[0];
      const authorInfo = document.getElementsByName("author")[0];
      let title = titleInfo.value;
      let author = authorInfo.value;
  
      const httpHeaders = {
        method: "Put",
        body: JSON.stringify({ author, title }),
      };
  
      const res = await fetch(`${BASE_URL}/${bookId}`, httpHeaders);
      let formBtn = formContainer.children[5];
      formBtn.removeEventListener("click", saveBookChangesHandler);
      loadAllBooksHandler();
    }
  }
  
  attachEvents();
  