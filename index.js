
const puzzlesUrl = "http://localhost:3000/puzzles.json"

const randomPuzzleForm = document.querySelector("#random-puzzle")
const randomPuzzleButton = document.getElementById('random-puzzle-submit')
const createPuzzleButton = document.getElementById("submit-puzzle")
const checkPuzzleButton = document.querySelector("#check-puzzle")
let puzzleSpace = document.getElementById("interactive-puzzle")
const puzzleInteractArea = document.querySelector("#interact-area")

let currentScore = 0
let perfectScore = 0


// The Generate Random Puzzle Button calls getRandomPuzzle() based on selected difficulty
randomPuzzleButton.addEventListener("click", function(e) {
    e.preventDefault()
    document.querySelector("#puzzle-solutiion").value = ""
    getRandomPuzzle()
});

// The Create Puzzle Button calls scramble() on the user input
createPuzzleButton.addEventListener('click', function(e) {
    e.preventDefault()
    postPuzzleToBackEnd()
    clearInputField()
});

// The user's cursor is bumped to the next letter after each keystroke
puzzleInteractArea.addEventListener('keyup', function(e) {
    e.preventDefault()
    moveCursorAlong()
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

// This returns a random puzzle object at the selected difficulty level
// This function calls makString on that puzzle object
function getRandomPuzzle() { 
    let selectedDifficutly = document.querySelector("#puzzle-difficulty").value
    fetch(puzzlesUrl)
    .then(resp => resp.json())
    .then(data => {
        array = []
        
        data['data'].forEach( obj => {
            if (obj.relationships.difficulty.data.id == document.querySelector("#puzzle-difficulty").value && obj.attributes.approved) {
                array.push(obj)
            }
        })
        let puzzleObject = array[Math.floor(Math.random() * array.length)];
        makeString(puzzleObject)
    })
};

// This POSTs the user's string to the DB and calls makeString() on the...
// ...object that is returned
// User submitted puzzles receive a rating based on length and a default of approved = false
function postPuzzleToBackEnd() {
    let userSubmittedString = document.querySelector("#puzzle-solutiion").value
    let l = userSubmittedString.length
    let difficulty = 0
    if (l <= 10) {
        difficulty = 4
    } else if (l > 10 && l <= 20) {
        difficulty = 3
    } else if (l > 20 && l <= 30) {
        difficulty = 2
    } else {
        difficulty = 1
    }    
    
    let formData = {
        solution: userSubmittedString,       
        difficulty_id: difficulty
    };

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };

    fetch(puzzlesUrl, configObj)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        puzzleObject = data.data
        makeString(puzzleObject)
    });
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
    let i = 0
    
    solutionArray.forEach(letter => {
        if (letter.match(/\w/)) {
            let letterForm = `<form id=${letter} class="letters"><input size="1" type="text" name="letters" id="letters"></form>`
            interactArea.innerHTML += letterForm;                    
            i += 1
        } else {
            interactArea.innerHTML += `${letter}`
            i += 1
        }
        if (i % 30 == 0) {
            interactArea.innerHTML += "<br>"
        }
    })
    document.querySelector("#result-area").innerHTML = ""    
};

// Displays "winner" or "keep trying" after user clicks 'check puzzle'
function checkPuzzle(div) {
    let i = 0;
    collection = div.children
    let target = document.querySelector("#result-area")

    for (item of collection) { 
        if (item[0] != undefined && item[0].value.toUpperCase() == item.id) {
            i += 1
            if (i == collection.length - 1) {
                target.innerHTML = "Winner!"
                target.id = 'result-area-win'
            }
        } else {
            target.innerHTML = "Keep Trying..."
        }
    }
};

// Moves cursor to next field after entering one letter
function moveCursorAlong() {
    let currentPosition = document.activeElement
    if (currentPosition.parentElement.nextElementSibling != null) {
        currentPosition.parentElement.nextElementSibling.firstElementChild.focus()
    }
}