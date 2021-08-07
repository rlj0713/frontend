
const puzzlesUrl = "http://localhost:3000/puzzles.json"

const randomPuzzleForm = document.querySelector("#random-puzzle")
const createPuzzleButton = document.getElementById("submit-puzzle")
const userSubmittedString = document.querySelector("#puzzle-solutiion").value
let puzzleSpace = document.getElementById("interactive-puzzle")
sentence = "Eventually this will be user input!!"

randomPuzzleForm.addEventListener("click", makeCallToApi)

createPuzzleButton.addEventListener('click', scramble(sentence))



// This returns a random puzzle object at the selected difficulty level
// This function calls makString on that puzzle object
function makeCallToApi() {  
    fetch(puzzlesUrl)
    .then(resp => resp.json())
    .then(data => {
        randomNumber = Math.floor(Math.random()*data['data'].length)
        let puzzle = data['data'][randomNumber]
        array = []

        data['data'].forEach( obj => {
            if (obj.relationships.difficulty.data.id == document.querySelector("#puzzle-difficulty").value) {
                array.push(obj)
            }
        })
        let puzzleObject = array[Math.floor(Math.random() * array.length)];
        makeString(puzzleObject)
    })
};

// This returns a string given a puzzle object.
// The function calls scramble on that string.
function makeString(puzzleObject) {
    solution = puzzleObject.attributes.solution
    scramble(solution)
};

// This returns a crypto-valid array of letters given a string.
// The solution is currently printing to the console.
// The crypto-valid array is appended to the DOM.
function scramble(sentence) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let sentenceArray = []
    let scrambledSentence = []
    let letters = /\w/
    let randomNumber = Math.floor(Math.random() * 26) || 1


    sentence = sentence.toUpperCase();
    sentenceArray = sentence.split("");
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
