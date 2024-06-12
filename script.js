document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const menu = document.getElementById('menu');

    burger.addEventListener('click', () => {
        menu.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        burger.classList.toggle('active');
        menu.classList.toggle('active');
    });
    countdown();
});

function countdown(){
var countDownDate = new Date("July 1, 2024 00:00:00").getTime();
var x = setInterval(function() {
var now = new Date().getTime();
var distance = countDownDate - now;
var days = Math.floor(distance / (1000 * 60 * 60 * 24));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);
document.getElementById("countdown").innerHTML = days + " Days " + hours + " Hours "
+ minutes + " Minutes " + seconds + " Seconds ";

if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "READY FOR TAKE OFF! is out now!";
}
}, 1000);
}







// Fürs Forum

document.addEventListener("DOMContentLoaded", init);


var db = null;

function init() {
    
    document.getElementById("speichern").addEventListener('click', addBewertung);
    document.getElementById("aktualisieren").addEventListener('click', updateBewertung);
    if (indexedDB !== "undefined") {
        let transaction = indexedDB.open("DBAirplanefood");

        transaction.onupgradeneeded = function(event) {
            db = event.target.result;
            if (!db.objectStoreNames.contains("Bewertungen")) {
                db.createObjectStore("Bewertungen", { autoIncrement: true, keyPath: "id" });
            }
            console.log('upgrade needed!');
        };

        transaction.onsuccess = function(event) {
            db = event.target.result;
            getAllBewertungen();
        };

        transaction.onerror = function(event) {
            console.log('error!');
        };
    } else {
        console.log("Browser aktualisieren!");
    }
}

function addBewertung() {
    let bewertung = {
        song: document.getElementById("song").value,
        kommentar: document.getElementById("kommentar").value,
        bewertung: document.getElementById("bewertung").value,
    };

    let transaction = db.transaction(["Bewertungen"], "readwrite");
    let store = transaction.objectStore("Bewertungen");
    let request = store.add(bewertung);

    request.onsuccess = function(event) {
        console.log("Bewertung erfolgreich hinzugefügt");
        resetInputs();
        getAllBewertungen();
    };

    request.onerror = function(event) {
        console.log("Bewertung konnte nicht hinzugefügt werden");
    };
}

function getAllBewertungen(){
    let tbody = document.getElementById("table-content");
    tbody.innerHTML = "";

    let transaction = db.transaction(["Bewertungen"], "readonly");
    let store = transaction.objectStore("Bewertungen");
    let cursor = store.openCursor();

    cursor.onsuccess = function(event){
        let data = event.target.result;
        if(data){
            let cursorData = data.value;
            tbody.innerHTML += "<tr><td>"+cursorData.id+"</td><td>"+cursorData.song+"</td><td>"+cursorData.bewertung+"</td><td>"+cursorData.kommentar+"</td><td><button onclick='deleteBewertung("+cursorData.id+")' >Löschen</button><button onclick='getBewertung("+cursorData.id+")' >Bearbeiten</button></td></tr>";
            data.continue();
        }
    }

    cursor.onerror = function(event){
        console.log("Zugriff auf Bewertungen nicht möglich");
    }
}


function deleteBewertung(keyToDelete) {
    let transaction = db.transaction(["Bewertungen"], "readwrite");
    let store = transaction.objectStore("Bewertungen");
    let request = store.delete(keyToDelete);

    request.onsuccess = function(event) {
        console.log("Bewertung gelöscht");
        getAllBewertungen();
    };

    request.onerror = function(event) {
        console.log("Bewertung nicht gefunden bzw. nicht gelöscht");
    };
}


function formfuellen(bewertung) {
    document.getElementById("id").value = bewertung.id;
    document.getElementById("song").value = bewertung.song;
    document.getElementById("kommentar").value = bewertung.kommentar;
    document.getElementById("bewertung").value = bewertung.bewertung;
}

function getBewertung(key) {
    let keyToEdit = parseInt(key);
    if (isNaN(keyToEdit)) {
        console.log("Ungültiger Schlüssel: ", key);
        return;
    }

    let transaction = db.transaction(["Bewertungen"], "readonly");
    let store = transaction.objectStore("Bewertungen");
    let request = store.get(keyToEdit);

    request.onsuccess = function(event) {
        console.log("Bewertung gefunden!");
        let data = event.target.result;
        if (data) {
            formfuellen(data);
        }
    };

    request.onerror = function(event) {
        console.log("Bewertung nicht gefunden");
    };
}



function updateBewertung() {
    let updatedBewertung = {

        id: parseInt(document.getElementById("id").value),
        song: document.getElementById("song").value,
        kommentar: document.getElementById("kommentar").value,
        bewertung: document.getElementById("bewertung").value,
        
    };

    let transaction = db.transaction(["Bewertungen"], "readwrite");
    let store = transaction.objectStore("Bewertungen");
    let request = store.put(updatedBewertung);

    request.onsuccess = function(event){
        console.log("Bewertung wurde aktualisiert");
        resetInputs();
        getAllBewertungen();
    };

    request.onerror = function(event){
        console.log("Daten konnten nicht aktualisiert werden");
    }
}

function resetInputs(){
    document.getElementById("id").value = "";
    document.getElementById("song").value = "";
    document.getElementById("kommentar").value = "";
    document.getElementById("bewertung").value = 5;
}
