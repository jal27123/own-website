function Datumanzeigen() {
    let ausgabe = document.getElementById("datum");
    ausgabe.textContent = "Heute ist: " + new Date().toLocaleDateString();
}

function NamenEintragen() {
    let name = prompt("Wie heißt du?");
    if (name) {
        // Namen aus Local Storage holen (oder leeres Array)
        let namen = JSON.parse(localStorage.getItem("gaestebuchNamen") || "[]");
        // Neuen Eintrag als Objekt mit Name, Datum und Uhrzeit speichern
        let jetzt = new Date();
        namen.push({
            name: name,
            datum: jetzt.toLocaleDateString(),
            uhrzeit: jetzt.toLocaleTimeString()
        });
        localStorage.setItem("gaestebuchNamen", JSON.stringify(namen));
        namenTabelleAktualisieren();
    }
}

// Tabelle aus Local Storage neu aufbauen
function namenTabelleAktualisieren() {
    let tabelle = document.getElementById("namensTabelle").getElementsByTagName('tbody')[0];
    tabelle.innerHTML = ""; // Tabelle leeren
    let namen = JSON.parse(localStorage.getItem("gaestebuchNamen") || "[]");
    namen.forEach((eintrag, index) => {
        let neueZeile = tabelle.insertRow();
        let nummerZelle = neueZeile.insertCell(0);
        let nameZelle = neueZeile.insertCell(1);
        let datumZelle = neueZeile.insertCell(2);
        nummerZelle.textContent = index + 1;
        nameZelle.textContent = eintrag.name;
        datumZelle.textContent = eintrag.datum + " " + (eintrag.uhrzeit || "");
    });
}

// Gästebuch zurücksetzen (alle Einträge löschen)
function gaestebuchZuruecksetzen() {
    if (confirm("Gästebuch wirklich zurücksetzen?")) {
        localStorage.removeItem("gaestebuchNamen");
        namenTabelleAktualisieren();
    }

// Beim Laden der Seite Tabelle füllen
window.onload = namenTabelleAktualisieren;
}