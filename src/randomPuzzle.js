
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


// Move this class to a separate file
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