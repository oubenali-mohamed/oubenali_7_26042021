let formValid = document.getElementById("btnSignup");
formValid.addEventListener("click", function (e) {
     e.preventDefault();
         let erreur = "";
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let image = document.getElementById("photoProfil").value;
         
        if (!username) {
            erreur += "Votre username est invalide </br>";
          } 
        if (!/@/.test(email)) {
            erreur += "Votre email est invalide </br>";
          }
        if (!password) {
            erreur += "Votre mot de passe doit contenir minimum 8 caractéres, dont 2 chiffres, une majuscule et une miniscule, pas d'espace </br>";
          }
          if (!image) {
            erreur += "Veuillez ajouter votre photo de profil </br>";
          } 
        if (erreur) {
           document.getElementById("erreur").innerHTML = erreur;
          }else {
                let form = document.getElementById('form');
                let formData = new FormData(form);
                
                let url = "http://localhost:3000/api/auth/signup";

                fetch(url , {
                    method: "POST",
                    body: formData,
                   })
                  .then(function (response) {
                    if (response.ok) {
                      response.json().then(function (data) {
                        alert("vous etes bien inscrit veuillez vous connecter")
                      window.location.href = "login.html";
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

