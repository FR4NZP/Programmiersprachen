const gridContainer = document.getElementById('Spielfeld');
const button4x4 = document.getElementById('btn4x4');
const button8x5 = document.getElementById('btn8x5');
const button8x8 = document.getElementById('btn8x8');

let rows = 5;
let columns = 8;

// Hintergrundfarbe der Kartenrückseite
const cardBack = '';

// Array mit den Farben für die Vorderseiten der Karten
const cardColors = [
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'pink',
  'cyan',
  'brown',
  'teal',
  'lime',
  'maroon',
  'navy',
  'olive',
  'silver',
  'aquamarine',
  'fuchsia',
  'indigo',
  'gold',
  'coral',
  'lightblue',
  'darkgreen',
  'salmon',
  'lavender',
  'slategray',
  'chartreuse',
  'tomato',
  'peru',
  'plum',
  'crimson',
  'orchid',
  'turquoise',
  'saddlebrown'
];

// Array für die Zuordnung der Paare
const pairAssignment = [];

// Fülle das pairAssignment-Array mit den Paaren
for (let i = 0; i < rows * columns / 2; i++) {
  pairAssignment.push(i);
  pairAssignment.push(i);
}

// Mische die Reihenfolge der Paare zufällig
shuffleArray(pairAssignment);

// Funktion zum Mischen der Elemente in einem Array (Fisher-Yates Algorithmus)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// Variablen zur Verwaltung der aufgedeckten Karten
let firstCard = null;
let secondCard = null;
let canFlip = true;

// Anzahl der gefundenen Paare
let foundPairs = 0;



// Füge die Felder zum Raster hinzu und weise ihnen die Farben zu
function createGrid() {
  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateColumns = "repeat(" + columns + ", 1fr)";

  for (let i = 0; i < rows * columns; i++) {
    const gridItem = document.createElement('div');
    gridItem.style.backgroundImage = `url(${cardColors[i]})`
    gridItem.classList.add('grid-item');
    gridContainer.appendChild(gridItem);

    const pairIndex = pairAssignment[i];
    const cardColor = cardColors[pairIndex];
    gridItem.style.backgroundColor = cardBack;

    gridItem.addEventListener('click', function(event) {
      const clickedElement = event.target;
      const isFlipped = clickedElement.classList.contains('flipped');

      if (isFlipped || !canFlip) {
        // Karte ist bereits umgedreht oder das Umdrehen ist nicht erlaubt
        return;
      }

      // Karte umdrehen und Vorderseite anzeigen
      clickedElement.style.backgroundColor = cardColor;
      clickedElement.classList.add('flipped');

      if (firstCard === null) {
        // Erste Karte aufdecken
        firstCard = clickedElement;
        startTimer();
      } else {
        // Zweite Karte aufdecken
        secondCard = clickedElement;

        // Prüfen, ob die beiden Karten übereinstimmen
        if (firstCard.style.backgroundColor === secondCard.style.backgroundColor) {
          // Karten stimmen überein, lasse sie verschwinden
          firstCard.style.visibility = 'hidden';
          secondCard.style.visibility = 'hidden';
          firstCard = null;
          secondCard = null;

          // Erhöhe die Anzahl der gefundenen Paare
          foundPairs++;

          // Aktualisiere den Punktestand
          updateScore();

          // Prüfe, ob alle Paare gefunden wurden
          if (foundPairs === rows * columns / 2) {
            // Stoppe den Timer
            stopTimer();

            // Zeige eine Siegesmeldung 
            console.log('Herzlichen Glückwunsch! Du hast alle Paare gefunden!');
          }
        } else {
          // Karten stimmen nicht überein, drehe sie nach einer kurzen Verzögerung wieder um
          canFlip = false;
          setTimeout(function() {
            firstCard.style.backgroundColor = cardBack;
            secondCard.style.backgroundColor = cardBack;
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = null;
            secondCard = null;
            canFlip = true;
          }, 1000);
        }
      }
    });
  }
}



// Punktestand-Element erstellen und anzeigen
const scoreElement = document.createElement('div');
scoreElement.id = 'punktestand';
scoreElement.textContent = 'Punktestand: 0';
document.body.insertBefore(scoreElement, gridContainer);

// Timer-Element erstellen und anzeigen
const timerElement = document.createElement('div');
timerElement.id = 'timer';
timerElement.textContent = 'Zeit: 00:00';
document.body.insertBefore(timerElement, gridContainer);

// Funktion zum Aktualisieren des Punktestands
function updateScore() {
  scoreElement.textContent = 'Punktestand: ' + foundPairs;
}

// Timer-Variablen
let startTime = null;
let timerInterval = null;

// Funktion zum Starten des Timers
function startTimer() {
  if (startTime === null) {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
  }
}

// Funktion zum Stoppen des Timers
function stopTimer() {
  clearInterval(timerInterval);
}

// Funktion zur Aktualisierung des Timers
function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const minutes = Math.floor(elapsedTime / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const formattedTime = padNumber(minutes) + ':' + padNumber(seconds);
  timerElement.textContent = `Zeit: ${formattedTime}`;
}

// Funktion zur Vorformatierung von Zahlen mit führender Null
function padNumber(number) {
  return number.toString().padStart(2, '0');
}


// Event Listener für den 8x8-Button hinzufügen
button8x8.addEventListener('click', function() {
  rows = 5;
  columns = 10;
  createGrid();
  restartGame();
});

// Event Listener für den 4x4-Button hinzufügen
button4x4.addEventListener('click', function() {
  rows = 3;
  columns = 5;
  createGrid();
  restartGame();
});

// Event Listener für den 8x5-Button hinzufügen
button8x5.addEventListener('click', function() {
  rows = 5;
  columns = 8;
  createGrid();
  restartGame();
});

// Neustartknopf auswählen
const neustartButton = document.getElementById('neustartButton');

// Event Listener für den Neustartknopf hinzufügen
neustartButton.addEventListener('click', function() {
  // Spiel neu starten
  restartGame();
});

// Funktion zum Neustarten des Spiels
function restartGame() {
  // Alle Karten zurücksetzen
  const cards = document.getElementsByClassName('grid-item');
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.style.backgroundColor = cardBack;
    card.classList.remove('flipped');
    card.style.visibility = 'visible';
  }

  // Alle Variablen zurücksetzen
  firstCard = null;
  secondCard = null;
  canFlip = true;
  foundPairs = 0;
  updateScore();

  // Timer zurücksetzen
  stopTimer();
  startTime = null;
  document.getElementById('timer').textContent = 'Zeit: 00:00';
}

// Initialisiere das Raster
createGrid();

