class Score{
    constructor(htmlid, gameid){
        this.htmlid = htmlid
        this.scores = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
        this.game = gameid
        //this.setUpHighScores()
        this.showTopTen()
    }

    showTopTen(){
        // Writes in the html element scores the top ten of the game
        var i = 1
        for(var j in this.scores){

            var name = 'name'+String(i)
            var score = 'score'+ String(i)

            document.getElementById(score).innerHTML = String(this.scores[j][0])
            document.getElementById(name).innerHTML = String(this.scores[j][1])

            i = i+1
        }
    }
         
    setUpHighScores(){
        // Gets the highScores from the server
        try{
            fetch('/getScore?game='+JSON.stringify(this.game)).then((response) => {
                return response.json();
            }).then((myJson) => {
                this.scores = myJson['result']}).then(this.showTopTen.bind(this))
        } catch(TypeError){
            console.log('lol')
        }
    }

    addNewHighScores(newscore){
        // Updates the High socores in the server

        if (newscore > this.scores[9][1]){

            var newScore = [prompt('You are in the top ten. Type your name:'), newscore]

            var index = 0
            while(newScore[1] < this.scores[index][1]){
                index = index + 1
            }
            var slice1 = this.scores.slice(0,index)
            var slice2 = this.scores.slice(index)
            slice2.pop()
            
            this.scores = slice1.concat([newScore].concat(slice2))
            
            try{
                fetch('/setScore?newScore='+JSON.stringify(this.scores)+'&game='+JSON.stringify(this.game))
            }catch(error){

            }
        }
        
    }


}

class Feedback{
    send(id, game){
        try{
            fetch('/giveFeedback?feedback='+ JSON.stringify(document.getElementById(id).value)+'&game='+JSON.stringify(game))
        }catch(error){

        }
    }
}

