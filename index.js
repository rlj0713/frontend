
const puzzlesUrl = "http://localhost:3000/puzzles.json"

const randomPuzzleForm = document.querySelector("#random-puzzle")
const randomPuzzleButton = document.getElementById('random-puzzle-submit')
const createPuzzleButton = document.getElementById("submit-puzzle")

let puzzleSpace = document.getElementById("interactive-puzzle")

// The Generate Random Puzzle Button calls getPuzzle() based on selected difficulty
randomPuzzleButton.addEventListener("click", function(e) {
    e.preventDefault()
    getPuzzle()
});

// The Create Puzzle Button calls scramble() on the user input
createPuzzleButton.addEventListener('click', function(e) {
    e.preventDefault()
    scramble()
});


// This returns a random puzzle object at the selected difficulty level
// This function calls makString on that puzzle object
function getPuzzle() { 
    let selectedDifficutly = document.querySelector("#puzzle-difficulty").value
    fetch(puzzlesUrl)
    .then(resp => resp.json())
    .then(data => {
        array = []
        
        data['data'].forEach( obj => {
            if (obj.relationships.difficulty.data.id == document.querySelector("#puzzle-difficulty").value) {
                array.push(obj)
            }
        })
        let puzzleObject = array[Math.floor(Math.random() * array.length)];
        console.log(selectedDifficutly)
        makeString(puzzleObject)
    })
};

// This returns a puzzle string given a puzzle object.
// The function calls scramble on that string.
function makeString(puzzleObject) {
    solution = puzzleObject.attributes.solution
    scramble(solution)
};

// This returns a crypto-valid array of letters given a string.
// The solution is currently printing to the console.
// The crypto-valid array is appended to the DOM.
function scramble(input) {
    let userSubmittedString = document.querySelector("#puzzle-solutiion").value || input
    let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let sentenceArray = []
    let scrambledSentence = []
    let letters = /\w/
    let randomNumber = Math.floor(Math.random() * 26) || 1

    userSubmittedString = userSubmittedString.toUpperCase();
    sentenceArray = userSubmittedString.split("");
    sentenceArray.forEach((character) => {
    if (character.match(/\w/)) {
        character = alphabet.indexOf(character) + randomNumber;
        scrambledSentence.push(alphabet[character]);
    } else {
        scrambledSentence.push(character);
    }
    });
    puzzleSpace.innerText = scrambledSentence.join('')
    console.log(sentenceArray.join(''))
};
