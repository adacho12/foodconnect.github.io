import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

// Configura Firebase con tu información de proyecto
const firebaseConfig = {
    apiKey: "AIzaSyCb8iJ79GmMCuhHqnXXVkK1_6hGyLBmxnA",
    authDomain: "foodconnect-bd9bd.firebaseapp.com",
    projectId: "foodconnect-bd9bd",
    storageBucket: "foodconnect-bd9bd.appspot.com",
    messagingSenderId: "610471363565",
    appId: "1:610471363565:web:e4e1c1b29285c960329de4",
    measurementId: "G-1RVTD60300"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
    const wishForm = document.getElementById('wish-form');
    const wishList = document.getElementById('wish-list');

    // Función para cargar deseos desde Firebase
    function loadWishesFromFirebase() {
        const wishesRef = ref(database, 'wishes/');
        onValue(wishesRef, (snapshot) => {
            const wishes = snapshot.val();
            wishList.innerHTML = '';
            for (let id in wishes) {
                let li = document.createElement('li');
                li.textContent = `${wishes[id].name} (${wishes[id].email}): ${wishes[id].wish}`;
                wishList.appendChild(li);
            }
        });
    }

    // Función para guardar deseos en Firebase
    function saveWishToFirebase(name, email, wish) {
        const wishesRef = ref(database, 'wishes/');
        const newWishRef = push(wishesRef);
        set(newWishRef, {
            name: name,
            email: email,
            wish: wish
        });
    }

    // Manejar el evento de envío del formulario
    wishForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const wish = document.getElementById('wish').value;
        saveWishToFirebase(name, email, wish);
        wishForm.reset();
        alert("Donació enviada amb èxit!");
    });

    loadWishesFromFirebase();
});
