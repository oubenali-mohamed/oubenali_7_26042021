let urlCom = "http://localhost:3000/api/commentaire";
const onePost = document.getElementById("onePost");
let url = window.location.search;
let searchParams = new URLSearchParams(url);

let id = searchParams.get("id");
let urlPost = "http://localhost:3000/api/post/" + id ;

//récupérer un post
fetch(urlPost, {
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
  .then((Post) => {
    let userId = Post.userId; 
    if(userId == localStorage.getItem('userId')) {
     document.getElementById('delete').style.display="inline-block";
    } else {
    document.getElementById('delete').style.display="none";
    } 
    onePost.innerHTML += `
        <h1>${Post.title}</h1> </br>
        <img class= "imgPost" src = "${Post.image}" </br>
        <p>${Post.content}</p>
        `;
  })

 
//supprimer un post
  const deletePost = document.getElementById("delete");
  deletePost.addEventListener("click", function(e) {
    e.preventDefault();
      fetch(urlPost, {
        method: 'DELETE',
        headers: {
          'authorization': 'bearer ' + localStorage.getItem('token')
        }, 
      })
      .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          ("votre post à bien été supprimé")
        window.location.href = "posts.html";
        });
      } else {
        Promise.reject(response.status);
      }
    }) 
    .catch(function (error) {
      console.log(error);
    });
  })

//nouveau commentaire
  let newCom = document.getElementById('btnCom');
  newCom.addEventListener("click", function (e) {
      e.preventDefault();
          let erreur = "";
         let contentCom = document.getElementById("commentaire").value;
         let postId = id;
        if (!contentCom) {
             erreur += "Votre contenu est vide </br>";
           }
        if (erreur) {
            document.getElementById("erreur").innerHTML = erreur;
           }else {
                 let commentaire = {content: contentCom,
                                    postId: postId};
                 commentaire = JSON.stringify(commentaire);
                  
                 fetch(urlCom, {
                     method: "POST",
                     body: commentaire,
                     headers: {
                      "Content-Type": "application/json",
                      'authorization': 'bearer ' + localStorage.getItem('token'),
                  },
                    })
                   .then(function (response) {
                     if (response.ok) {
                       response.json().then(function (data) {
                         alert("vous commentaire à été ajouté")
                       window.location.href = "posts.html";
                       });
                     } else {
                       Promise.reject(response.status);
                     }
                   })
                   .catch(function (error) {
                     console.log(error);
                   });
           } 
  });


//récupération des commentaires
const listCom = document.getElementById("listCom");
fetch(urlCom + '/post/' + id , {
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
  
  // Si la connection à réussi afficher tous les commentaire
  .then((Commentaire) => { 
    Commentaire.forEach((Commentaire) => { 
      listCom.innerHTML += ` 
      <a href="commentaire.html?id=${Commentaire.id}">
      <p>${Commentaire.content} </p>
      </a>`;
    });
  });    

  