window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

class Interface{

    constructor(){
        // Creating instances of Game and Score
        this.game = new Game()
        this.score = new Score('scores', 'snake')
        this.feedback = new Feedback()

        // Requesting the top scores
        this.score.setUpHighScores()

        // event listeners
            //keys
        addEventListener('keydown', this._keypressedHandler.bind(this))

            //buttons
        document.getElementById('ArrowUp').addEventListener('click', this._buttonHandler.bind(this,'ArrowUp'))
        document.getElementById('ArrowDown').addEventListener('click', this._buttonHandler.bind(this, 'ArrowDown'))
        document.getElementById('ArrowLeft').addEventListener('click', this._buttonHandler.bind(this, 'ArrowLeft'))
        document.getElementById('ArrowRight').addEventListener('click', this._buttonHandler.bind(this, 'ArrowRight'))
        document.getElementById('Enter').addEventListener('click', this._buttonHandler.bind(this, 'Enter'))
        document.getElementById('submitButton').addEventListener('mousedown', this._buttonHandler.bind(this, 'Feedback'))
    }

    run(){
        // gameloop
        this.game.level = parseInt(document.getElementById('level').value) 
        var interval = 150 -this.game.level *20 // Speed
        
        console.log(interval)
        this.gameloop = setInterval(this._run.bind(this), interval)
        
        
    }

    _run(){
        // condition for ending the game and trigger of addNewHIghScore method
        if (this.game.over & !this.game.snake.alive){
            clearInterval(this.gameloop)
            this.score.addNewHighScores(this.game.score)
            this.score.showTopTen()
            document.getElementById('level').disabled = false
            
        } 

        // updating the state of the game
        this.game.refresh()

        // rendering the game
        this.game.draw()
    }

    // Decides whether the order should be given to the game of the interface and summarizes the event in the keypressed
    _keypressedHandler(keypressed){

        var key = keypressed.key
        
        if(key== 'Enter'){
            this._interfaceManager(key) //Keys related with the interface
        } else {
            this.game.keyHandler(key) //keys related with the game
        }
        
    }

    // Decides whether the order should be given to the game of the interface
    _buttonHandler(key){

        if(key=='Enter' | key=='Feedback'){
            this._interfaceManager(key)
        } else {
            
            this.game.keyHandler(key)
        }
    }

    // Given a key, it decides what the interface have to do.
    _interfaceManager(key){
        if(key == 'Enter' & this.game.over & !this.game.snake.alive){
            document.getElementById('level').disabled = true
            this.score.setUpHighScores()
            this.game.restart()
            this.run()
            
        } else if (key == 'Enter' & this.game.over & this.game.snake.alive){
            document.getElementById('level').disabled = true
            this.score.setUpHighScores()
            this.game.over = false
        } else if (key == 'Feedback'){
            this.feedback.send('Feedback', 'snake')
            document.getElementById('Feedback').value = ''
            document.getElementById('Feedback').placeholder='Thank you!'
            
        }

    }

    
}

myInterface = new Interface()

myInterface.run()