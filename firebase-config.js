// firebase-config.js
// Usamos la sintaxis "compat" para funcionar en JS puro sin Node.js / Webpack

const firebaseConfig = {
    apiKey: "AIzaSyDp_JFkJb6Z69QKujbl3qMDakmgCN_W6_c",
    authDomain: "animestrikers.firebaseapp.com",
    databaseURL: "https://animestrikers-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "animestrikers",
    storageBucket: "animestrikers.firebasestorage.app",
    messagingSenderId: "796035806175",
    appId: "1:796035806175:web:c34950ed3b4cb775040a6a",
    measurementId: "G-0T988KW5DH"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Jugador temporal (luego se puede conectar con Google Auth)
const PLAYER_ID = "player_1";

// Función para cargar monedas del jugador
function loadUserStats() {
    const userRef = db.ref('users/' + PLAYER_ID);
    userRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("Datos del jugador desde la nube (RTDB):", data);
            // Actualizar la interfaz (Monedas y Gemas)
            const coinsElements = document.querySelectorAll('.stat-val');
            if (coinsElements.length >= 2) {
                coinsElements[0].textContent = (data.coins || 0).toLocaleString('en-US');
                coinsElements[1].textContent = (data.gems || 0).toLocaleString('en-US');
            }
        } else {
            // Si el jugador no existe, lo creamos
            console.log("Creando nuevo perfil de jugador en la nube...");
            userRef.set({
                coins: 100000,
                gems: 500,
                clubName: "Anime Strikers FC"
            });
        }
    });
}

// Función para guardar cartas en My Club
async function saveCardsToCloud(cardsArray) {
    try {
        console.log("Guardando cartas en Firebase RTDB...", cardsArray);
        
        const userCardsRef = db.ref('users/' + PLAYER_ID + '/myClub');
        const updates = {};

        cardsArray.forEach(card => {
            const newKey = userCardsRef.push().key; 
            updates[newKey] = {
                cardId: card.id,
                name: card.name,
                rating: card.rating,
                position: card.position,
                obtainedAt: firebase.database.ServerValue.TIMESTAMP
            };
        });

        await userCardsRef.update(updates);
        console.log("¡9 Cartas guardadas con éxito en la nube!");
        
        // Redirigir a packs.html para reiniciar o refrescar
        window.location.href = "packs.html";
    } catch (error) {
        console.error("Error al guardar las cartas:", error);
        alert("Hubo un error al guardar las cartas en la nube.");
    }
}

// Iniciar carga al cargar el script
document.addEventListener('DOMContentLoaded', () => {
    loadUserStats();
});
