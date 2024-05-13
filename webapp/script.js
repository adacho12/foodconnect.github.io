// script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wish-form');
    const wishList = document.getElementById('wish-list');
    const rankingList = document.getElementById('ranking-list');


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const text = document.getElementById('wish').value;
        saveWishToLocalStorage(name, email, text);
        loadWishesFromLocalStorage();
        form.reset();
    });

    function loadWishesFromLocalStorage() {
        const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
        wishList.innerHTML = '';
        
        wishes.forEach(wish => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${wish.name}</strong> (${wish.email}): ${wish.text}`;
            wishList.appendChild(listItem);
            listItem.style.animation = 'fadeIn 0.5s ease';
        });
    }
    
    function saveWishToLocalStorage(name, email, text) {
        const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
        wishes.push({ name, email, text });
        localStorage.setItem('wishes', JSON.stringify(wishes));
    }

});
var db = firebase.firestore();

// Función para guardar la donación en Firestore
function saveDonation(name, email, text) {
  db.collection("donations").add({
    name: name,
    email: email,
    text: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    // Aquí puedes realizar acciones adicionales después de guardar la donación, como mostrar un mensaje de éxito
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
    // Manejar errores, como mostrar un mensaje de error al usuario
  });
}

