
const puzzlesUrl = "http://localhost:3000/puzzles.json"

const randomPuzzleForm = document.querySelector("#random-puzzle")
const createPuzzleButton = document.getElementById("submit-puzzle")
const userSubmittedString = document.querySelector("#puzzle-solutiion").value

randomPuzzleForm.addEventListener("click", makeCallToApi)
createPuzzleButton.addEventListener("click", scramble(userSubmittedString))

// This returns an array of objects at the selected difficulty level
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
        return array
    })
};

// This returns a crypto-valid array of letters given a sentence.
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
    //   return scrambledSentence;
    console.log(scramble(sentence));
}
