const posts = document.getElementById("posts");
let url = "http://localhost:3000/api/post";

let token = localStorage.getItem('token');

fetch(url , {
  headers: {
      "Content-Type": "application/json",
      'authorization': 'bearer ' + localStorage.getItem('token')
  },
  })
  .then((response) => {
    // vérification de la connection au serveur
   if (response.ok) { 
      return response.json();
      } else {
      return Promise.reject(response.status);
    }
  })
  
  // Si la connection à réussi afficher tous les posts
  .then((Post) => { 
    Post.forEach((Post) => {
      posts.innerHTML += ` 
           <a href="onePost.html?id=${Post.id}">
           <h1>${Post.title}</h1>
            <img class = "imgPost" src = "${Post.image}"> </br>
            <p>${Post.content}</p>
            </a>
            `;
    });
  }); 


  const deleteUser = document.getElementById("btnUser");
  let urlUser = "http://localhost:3000/api/auth/user";
  deleteUser.addEventListener("click", function(e) {
    e.preventDefault();
      fetch(urlUser, {
        method: 'DELETE',
        headers: {
          'authorization': 'bearer ' + localStorage.getItem('token')
        }, 
      })
      .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          alert("votre compte à bien été supprimé")
        window.location.href = "index.html";
        });
      } else {
        Promise.reject(response.status);
      }
    }) 
    .catch(function (error) {
      console.log(error);
    });
  })