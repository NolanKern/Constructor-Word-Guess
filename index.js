var Word = require('./word.js');
var prompt = require('prompt');

console.log("Hello welcome to Node Hangman!")
console.log("Guess a letter that could appear in the blanks below.");
console.log("--------------------------");
prompt.start();

hangman = {
    words:["deviljho","odogoron","rathalos","kulve taroth", "nergigante", "kushala daora", "teostra"],
    wins: 0,
    guessesRemaining: 0,
    currentWord: null,

    startGame: function (wrd) {
        this.resetGuesses();
        this.currentWord = new Word(this.words[Math.floor(Math.random()* this.words.length)]);
        this.currentWord.getLet();
        this.promptUser();
        console.log(this.currentWord.target);
    },

    resetGuesses: function(){
        this.guessesRemaining = 10;
    },

    promptUser: function(){
        var self = this;
        prompt.get(['guessLet'], function(err, result){
            console.log("You guessed: " + result.guessLet);
            console.log(self.currentWord.wordRender());
            var manyGuessed = self.currentWord.checkLetter(result.guessLet);
            if(manyGuessed ==0) {
                
                console.log("WRONG");
                self.guessesRemaining--;
                
            } else {
                console.log("CORRECT");
                    if(self.currentWord.findWord()){
                        console.log("You won!");
                        console.log("-------------------");
                        return;
                    }
                    console.log(self.currentWord.wordRender());
            }

            console.log("Guesses remaining: " + self.guessesRemaining);
            console.log("-------------------");
            if((self.guessesRemaining > 0) && (self.currentWord.found == false)){
                self.promptUser();
            }
            else if(self.guessesRemaining ==0){
                console.log("Game over. Correct Word ", self.currentWord.target);
            } else {
                console.log(self.currentWord.wordRender());
            }
        });
    }
};

hangman.startGame();