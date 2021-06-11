let signout = document.getElementById('signout');
signout.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.clear();
     window.location.href = "index.html";
})
