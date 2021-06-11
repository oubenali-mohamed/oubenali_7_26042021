let newPost = document.getElementById('btnSubmit');
newPost.addEventListener("click", function (e) {
    e.preventDefault();
        let erreur = "";
       let title = document.getElementById("title").value;
       let content = document.getElementById("content").value;
       let image = document.getElementById("picturePost").value;
        
       if (!title) {
           erreur += "Votre titre est vide </br>";
         } 
       if (!content) {
           erreur += "Votre contenu est vide </br>";
         }
         if (!image) {
           erreur += "Veuillez ajouter la photo de votre post </br>";
         } 
       if (erreur) {
          document.getElementById("erreur").innerHTML = erreur;
         }else {
               let form = document.getElementById('form');
               let formData = new FormData(form);
               
               let url = "http://localhost:3000/api/post";

               fetch(url , {
                   method: "POST",
                   body: formData,
                   headers: {
                    'authorization': 'bearer ' + localStorage.getItem('token'),
                },
                  })
                 .then(function (response) {
                   if (response.ok) {
                     response.json().then(function (data) {
                       alert("vous post à été ajouté")
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

