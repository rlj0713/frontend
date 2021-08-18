
// The RandomPuzzle Class fetches puzzles from the API and sorts them by difficulty
// RandomPuzzle.easy for example returns an array of easy puzzle objects
class RandomPuzzle {
    static all = [];
    static easy = [];
    static medium = [];
    static hard = [];
    static expert = [];
    static unapproved = [];

    constructor({solution, scrambled, difficulty_id, approved, id}) {
        this.solution = solution;
        this.scrambled = scrambled;
        this.difficulty_id = difficulty_id;
        this.approved = approved;
        this.id = id;

        RandomPuzzle.all.push(this);

        if (this.approved == false) {
            RandomPuzzle.unapproved.push(this);
        } else if (this.difficulty_id == 1) {
            RandomPuzzle.easy.push(this);
        } else if (this.difficulty_id == 2) {
            RandomPuzzle.medium.push(this);
        } else if (this.difficulty_id == 3) {
            RandomPuzzle.hard.push(this);
        } else if (this.difficulty_id == 4) {
            RandomPuzzle.expert.push(this);
        }
    };
}

// This class along with the RandomPuzzle class make RandomPuzzle.all globally available on DOM-Load
class RandomPuzzleServices {
    constructor(baseURL) {
        this.baseURL = baseURL;
    };

    getPuzzles() {
        fetch(this.baseURL)
        .then(resp => resp.json())
        .then(puzzles => {
            puzzles.data.forEach(puzzle => {
                const newPuzzle = new RandomPuzzle({id: puzzle.id, ...puzzle.attributes})
            });
        });
    }
};

const puzzleApi = new RandomPuzzleServices('http://localhost:3000/puzzles');
document.addEventListener("DOMContentLoaded", function(e) {
    e.preventDefault()
    puzzleApi.getPuzzles(puzzlesUrl);
});


// This POSTs the user's string to the DB and calls makeString() on the...
// ...object that is returned
// User submitted puzzles receive a rating based on length and a default of approved = false
function postPuzzleToBackEnd() {
    // Maybe separate into a different function
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
    // assignDifficulty()
    
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
        const newPuzzle = new RandomPuzzle({id: data['data'].id, ...data['data'].attributes})
        makeString(newPuzzle)
    });
    clearResult();
};