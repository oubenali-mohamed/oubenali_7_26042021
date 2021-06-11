let formValid = document.getElementById("btnLogin");
formValid.addEventListener("click", function (e) {
     e.preventDefault();
        let erreur = "";
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        
        if (!/@/.test(email)) {
            erreur += "Votre email est invalide </br>";
          }
        if (!password) {
            erreur += "Votre mot de passe est incorrect </br>";
          }
        if (erreur) {
           document.getElementById("erreur").innerHTML = erreur;
          }else {
              let userLogin = {
                  email: email,
                  password: password,
                  };
                
                    
                let url = "http://localhost:3000/api/auth/login";

                fetch(url , {
                    method: "POST",
                    body: JSON.stringify(userLogin),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .then(function (response) {
                    if (response.ok) {
                      response.json().then(function (data) {
                      localStorage.setItem('token', data.token);
                      localStorage.setItem('userId', data.userId);
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

