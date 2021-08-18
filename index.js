
const puzzlesUrl = "http://localhost:3000/puzzles.json"

const randomPuzzleForm = document.querySelector("#random-puzzle")
const randomPuzzleButton = document.getElementById('random-puzzle-submit')
const createPuzzleButton = document.getElementById("submit-puzzle")
const checkPuzzleButton = document.querySelector("#check-puzzle")
let puzzleSpace = document.getElementById("interactive-puzzle")
const puzzleInteractArea = document.querySelector("#interact-area")

let currentScore = 0
let perfectScore = 0

// The Generate Random Puzzle Button calls getPuzzleAtDifficulty() based on selected difficulty
randomPuzzleButton.addEventListener("click", function(e) {
    e.preventDefault()
    document.querySelector("#puzzle-solutiion").value = ""
    getPuzzleAtDifficulty()
});

// The Create Puzzle Button calls scramble() on the user input
createPuzzleButton.addEventListener('click', function(e) {
    e.preventDefault()
    postPuzzleToBackEnd()
    clearInputField()
    removeLastPuzzle()
});

// The user's cursor is bumped to the next letter after each keystroke
puzzleInteractArea.addEventListener('keyup', function(e) {
    e.preventDefault()
    if (e.code == "Backspace") {
        moveCursorBk()
    } else if (e.code != 'Tab') {
        moveCursorFwd()
    }
});

// Clears the create a puzzle form
function clearInputField() {
    document.querySelector("#puzzle-solutiion").value = ""
}

// The Check Puzzle Button calls checkPuzzle() when the user clicks
checkPuzzleButton.addEventListener('click', function(e) {
    e.preventDefault()
    checkPuzzle(document.querySelector("#interact-area"))
});

// This matches a random puzzle object with the selected difficulty level
// This function calls makeString() on the appropriate puzzle object
function getPuzzleAtDifficulty() {
    let selectedDifficutly = parseInt(document.querySelector("#puzzle-difficulty").value)
    let array = []
    
    if (selectedDifficutly == 1) {
        array = RandomPuzzle.easy
    } else if (selectedDifficutly == 2) {
        array = RandomPuzzle.medium
    } else if (selectedDifficutly == 3) {
        array = RandomPuzzle.hard
    } else if (selectedDifficutly == 4) {
        array = RandomPuzzle.expert
    }
    
    let puzzleObject = array[Math.floor(Math.random()*array.length)];
    makeString(puzzleObject)
    clearResult();
};

// This returns a puzzle string given a puzzle object.
// The function calls scramble on that string.
function makeString(puzzleObject) {
    solution = puzzleObject.solution
    scramble(solution)
    clearResult()
};

// This returns a crypto-valid array of letters given a string.
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
        perfectScore += 1
    } else {
        scrambledSentence.push(character);
    }
    });
    puzzleSpace.innerText = scrambledSentence.join('')
    createLetterForms(scrambledSentence, userSubmittedString)
};

// Given 2 arrays - solution + scrambled, this updates the DOM with input fields
// Each input field has an ID that matches the solution letter
// Event listeners for each field print "hooray to the screen"
function createLetterForms(arrayOfLetters, solution) {
    solutionArray = solution.split('')
    console.log(`Solution: ${solution}`)

    let puzzleArea = document.getElementById('puzzle-area')
    let interactArea = document.querySelector("#interact-area")
    interactArea.innerHTML = ""
    
    solutionArray.forEach(letter => {
        if (letter.match(/\w/)) {
            let letterForm = `<form id=${letter} class="letters"><input size="1" type="text" name="letters" id="letters"></form>`
            interactArea.innerHTML += letterForm;                    
        } else {
            interactArea.innerHTML += `${letter}`
        }
    })
};

// Displays "winner" or "keep trying" after user clicks 'check puzzle'
function checkPuzzle(div) {
    let i = 0;
    collection = div.children
    let target = document.querySelector("#result-area")
    let wTarget = document.querySelector('#result-area-win')
    
    for (item of collection) { 
        if (item[0] != undefined && item[0].value.toUpperCase() == item.id) {
            i += 1
            if (i == collection.length) {
                target.innerText = "Winner!"
                target.id = 'result-area-win'
                break
            } else if (wTarget != null) {
                wTarget.innerText = "    You already won, try a new puzzle."
                break
            } 
        } else {
            target.innerText = "Keep Trying..."
        }
    }
};

// Moves cursor to next field after entering one letter
function moveCursorFwd() {
    let currentPosition = document.activeElement
    if (currentPosition.parentElement.nextElementSibling != null) {
        currentPosition.parentElement.nextElementSibling.firstElementChild.focus()
    }
};

// Moves cursor to previous field after using the delete key
function moveCursorBk() {
    let currentPosition = document.activeElement
    if (currentPosition.parentElement.previousElementSibling != null) {
        currentPosition.parentElement.previousElementSibling.firstElementChild.focus()
    }
};

// This removes the last user-created puzzle from the database
// ***********************************
// REFACTOR TO OO
// ***********************************
// Move to services class
// No changes necessary
// Call this on an instance of PuzzleServices class
function removeLastPuzzle() {

    fetch(puzzlesUrl)
    .then(resp => resp.json())
    .then(data => {
        let id = data.data.slice(-1)[0].id
        
        // Idea, abstract number 8 (which is the number of approved puzzles) to change as an admin approves new puzzles.
        if (id > 8) {
            const configObj = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
            
            fetch(`http://localhost:3000/puzzles/${id}`, configObj)
        }
    })
}

// Clears the text in the result div
function clearResult() {
    let target = document.querySelector("#result-area")
    let wTarget = document.querySelector('#result-area-win')
    
    if (target) {
        target.innerText = ""
    } else {
        wTarget.innerText = ""
        wTarget.id = 'result-area'
    }
}