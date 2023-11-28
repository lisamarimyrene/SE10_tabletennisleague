export class ScoreBoard extends HTMLElement {

    // * Player properties
    player1_name = '';
    player2_name = '';
    player_winner = '';
    winner_dialog = '';

    player1_points = 0;
    player2_points = 0;

    player1_sets = 0;
    player2_sets = 0;

    isServing = "Player 1";

    player_score = [];


    // * Constructor
    constructor() {
        super();

        // Attaching the shadow root
        this.shadow = this.attachShadow({ mode: 'open' });

        // Query selectors
        this.allQuerySelectors();

        this.gameOver = false;

    }

    connectedCallback() {
        // Setting attributes
        this._setAttributes();

        // Render content to the page
        this.render();

        // Event listeners
        this.handleClickEvents();

    }

    // * Collect all query selectors into one method, for easy access and less double-typing.
    allQuerySelectors() {
        this.player1_nameHTML = this.shadow.querySelector('#player1');
        this.player2_nameHTML = this.shadow.querySelector('#player2');

        this.sets1Div = this.shadow.querySelector('#sets1');
        this.sets2Div = this.shadow.querySelector('#sets2');
        this.player1_setsHTML = this.shadow.querySelector('#player1_sets');
        this.player2_setsHTML = this.shadow.querySelector('#player2_sets');

        this.resetBtn = this.shadow.querySelector('#resetBtn');

        this.matchResultsHTML = this.shadow.getElementById('matchResults');
    }

    // * All event listeners in one method
    handleClickEvents() {
        // Click events
        this.shadow.addEventListener('click', (event) => {
            if (!this.gameOver) {
                // Add points to player 1
                if (event.target.id === 'player1_points') {
                    // Increment with one point every time user clicks
                    this.player1_points += 1;
                    this.changeServe();
                    this.render();
                }
                // Add points to player 2
                else if (event.target.id === 'player2_points') {
                    // Increment with one point every time user clicks
                    this.player2_points += 1;
                    this.changeServe();
                    this.render();
                }
            }

            // Reset button
            if (!this.gameOver && event.target.id === 'resetBtn') {
                console.log("HEIIII");
                this.resetGame();
                this.render();
            }
        });
    }

    // * Custom Event
    fireCustomEvent() {
        console.log('custom event fired from web component')
        this.dispatchEvent(new CustomEvent("showResults", {
            detail: {
                player1_name: this.player1_name,
                player2_name: this.player2_name,
                player_score: this.player_score,
                player_winner: this.player_winner,
                dateAndTime: this.getDateAndTime()
            },
            bubbles: true
        }));
    }

    // * Get the attributes from the HTML
    _getAttributes() {
        const showplayers = this.getAttribute('showplayers') || true;
        const showsets = this.getAttribute('showsets') || true;
        const showprevioussets = this.getAttribute('showprevioussets') || true;
        const player1_name = this.getAttribute('player1_name');
        const player2_name = this.getAttribute('player2_name');

        return [showplayers, showsets, showprevioussets, player1_name, player2_name];
    }
    // * Defining the attributes
    _setAttributes() {
        const attributes = this._getAttributes();
        console.log(attributes)
        this.showplayers = attributes[0]
        this.showsets = attributes[1]
        this.showprevioussets = attributes[2]
        this.player1_name = attributes[3]
        this.player2_name = attributes[4]
    }

    // * Show and hide- players, sets, or previous results by changing the attributes to true or false.
    changeAttributes() {
        if (this.showplayers !== "true") {
            this.player1_nameHTML.style.display = "none";
            this.player2_nameHTML.style.display = "none";
        }
        if (this.showsets !== "true") {
            this.sets1Div.style.display = "none";
            this.sets2Div.style.display = "none";
        }
        if (this.showprevioussets !== "true") {
            this.matchResultsHTML.style.display = "none";
        }
    }

    // * Changing the serve between the players
    changeServe() {
        this.totalscore = this.player1_points + this.player2_points;

        //Give serve to one of the players if the score is over 11 (every one point)
        if (this.totalscore >= 20 && this.totalscore % 2 === 1) {
            //Player 1
            if (this.isServing === "Player 1") {
                this.isServing = "Player 2";
            }
            // Player 2
            else if (this.isServing === "Player 2") {
                this.isServing = "Player 1";
            }
        }

        // Give serve to one of the players if the score is under 11 (every second point)
        if (this.totalscore != 0 && this.totalscore % 2 === 0) {

            // Player 1
            if (this.isServing === "Player 1") {
                this.isServing = "Player 2";
            }

            // Player 2
            else if (this.isServing === "Player 2") {
                this.isServing = "Player 1";
            }
        }
    }

    // * Check who player has the serve, then add or remove serving-text by calling it in HTML.
    isPlayerServing(player) {
        if (this.isServing === player) {
            return 'serving';
        }
        return '';
    }

    // * Updates the player1s set
    updateSetsPlayer1() {
        //Increment the set with 1 if player 1 wins
        this.player1_setsHTML = this.player1_sets++;

        //Push the score into the player_score array
        this.player_score.push([`${this.player1_points} - ${this.player2_points}`]);
        console.log(this.player_score);

        //Reset points back to 0.
        this.resetPoints();
    }

    // * Updates the player2s set
    updateSetsPlayer2() {
        //Increment the set with 1 if player 2 wins
        this.player2_setsHTML = this.player2_sets++;

        //Push the score into the player_score array
        this.player_score.push([`${this.player1_points} - ${this.player2_points}`]);

        //Reset points back to 0.
        this.resetPoints();
    }

    // * Increment the winning player sets with 1, if they win the round. Then set the points back to 0.
    updateSets() {
        // If player 1 is bigger or equal to 11, AND player 1 points is bigger than player 2 points, then increment the player 1 winning sets with one.
        if (this.player1_points >= 11 && this.player1_points > (this.player2_points + 2)) {
            this.updateSetsPlayer1();
        }
        // If player 2 is bigger or equal to 11, AND player 2 points is bigger than player 1 points, then increment the player 2 winning sets with one.
        else if (this.player2_points >= 11 && this.player2_points > (this.player1_points + 2)) {
            this.updateSetsPlayer2();
        }
        // If the totalscore is bigger or equal to 20, AND player 1 points is bigger than player 2 points, then increment the player 1 winning sets with one.
        if (this.totalscore >= 20 && this.player1_points > (this.player2_points + 1)) {
            this.updateSetsPlayer1();
        }
        // If the totalscore is bigger or equal to 20, AND player 2 points is bigger than player 1 points, then increment the player 1 winning sets with one.
        else if (this.totalscore >= 20 && this.player2_points > (this.player1_points + 1)) {
            this.updateSetsPlayer2();
        }
    }

    // * Loops through the winning sets-array, and push it to list elements and to the ol in the shadowDOM.
    winningSetsTracker() {
        this.player_score.forEach((element) => {
            let listItem = document.createElement("li");
            let text = document.createTextNode(element);

            listItem.appendChild(text);
            this.matchResultsHTML.appendChild(listItem);
        })
    }

    // * Get the time of the match
    getDateAndTime() {
        //Source: https://www.w3schools.com/jsref/jsref_obj_date.asp

        //Get todays date
        this.today = new Date(); //Create new Date object
        this.day = this.today.getDate(); //Get the day
        this.month = this.today.getMonth() + 1; //Get the month (+1 to make it 1-12)
        this.year = this.today.getFullYear().toString(); //get the year, and take the two last digits.
        this.hours = this.today.getHours();
        this.minutes = this.today.getMinutes();
        this.seconds = this.today.getSeconds();

        //Format the date like I want it
        this.getDate = this.day + "/" + this.month + "/" + this.year;
        this.getTime = this.hours + ':' + this.minutes + ':' + this.seconds;

        //Return the properties
        return { getDate: this.getDate, getTime: this.getTime }
    }

    // * If one player wins 3 sets, then the game ends, and the winner is announced.
    announceWinner() {
        let winningPlayer = null;
    
        if (this.player1_sets === 3) {
            winningPlayer = this.player1_name;
        } 
        if (this.player2_sets === 3) {
            winningPlayer = this.player2_name;
        }
    
        if (winningPlayer) {
            this.player_winner = winningPlayer;
            this.winner_dialog = `The winner is ${this.player_winner}!`
            this.resetSets();
            this.gameOver = true;
            this.getDateAndTime();
            this.fireCustomEvent();
            this.render()
        }
    }

    // * Reset the points to 0.
    resetPoints() {
        this.player1_points = 0;
        this.player2_points = 0;
    }

    // * Reset the sets to 0.
    resetSets() {
        this.player1_sets = 0;
        this.player2_sets = 0;
    }

    // * When the game is over, the game stats will reset when clicking the reset button.
    resetGame() {
        this.player_winner = '';
        this.player1_sets = 0;
        this.player2_sets = 0;
        this.isServing = "Player 1";
        this.player_score = [];
        this.resetPoints();
        this.render();
    }

    // * Helper function to make the pointsBtn's unclickable when the game is over.
    isClickable() {
        return !this.gameOver;
    }

    // * HTML Template
    template() {
        return `
        ${this.getStyles()}
        <div>
            <div id="scoreboard-container">
                <div class="scoreboard">
                    <h3 class="playerTxt" id="player1">${this.player1_name}</h3>
                    <div class="winningSets" id="sets1">
                        <p class="setsText" id="player1_sets">${this.player1_sets}</p>
                    </div>
                    <div class="points">
                        <button class="pointsBtn" id="player1_points">${this.player1_points}</button>
                    </div>
                    <p id="player1_serve" class="serve ${this.isPlayerServing("Player 1")}">It's ${this.player1_name}'s serve</p>
                </div>

                <div id="pingpongTable">
                    <div id="tableFrame"></div>
                    <div id="centeredLine"></div>
                    <div id="net"></div>
                    <div id="racket1">
                        <div id="circle1"></div>
                        <div id="handle1"></div>
                    </div>
                    <div id="racket2">
                        <div id="circle2"></div>
                        <div id="handle2"></div>
                    </div>
                </div>

                <div class="scoreboard">
                    <h3 class="playerTxt" id="player2">${this.player2_name}</h3>
                    <div class="winningSets" id="sets2">
                        <p class="setsText" id="player2_sets">${this.player2_sets}</p>
                    </div>
                    <div class="points">
                        <button class="pointsBtn" id="player2_points">${this.player2_points}</button>
                    </div>
                    <p id="player2_serve" class="serve ${this.isPlayerServing("Player 2")}">It's ${this.player2_name}'s serve</p>
                </div>
            </div>
            <ol id="matchResults"></ol>
            <p id="winningPlayer">${this.winner_dialog}</p>
            <button id="resetBtn">Reset</button>
        </div>
        `
    }

    // * Styling
    getStyles() {
        return `
        <style>
            :root {
                --darkblue: #2B7288;
                --pink: #f96081;
                --yellow: #F8D377;
            }

            #winningPlayer {
                font-size: 2rem;
                color: #2B2B2B;
                text-align: center;
            }
            #scoreboard-container {
                display: flex;
                padding-bottom: 1vh;
                justify-content: center;
                max-width: 100%
                align-items: center;

            }
            .scoreboard {
                display: flex;
                flex-direction: column;
                margin: 1vh 10vw 0;
                align-items: center;
                max-width: 100%;
            }
            .playerTxt {
                font-size: 1.5rem;
                font-weight: 100;
            }
            .winningSets {
                background-color: #fff;
                color: var(--darkblue, #2B7288);
                border-radius: 20px;
                margin-bottom: 2vh;
                padding: 10px 45px;
                display: flex;
                justify-content: center;
                align items: center;
                flex-direction: column;
            }
            .setsText {
                font-size: 2rem;

            }
            .points {
                background-color: var(--darkblue, #2B7288);
                color: var(--yellow, #F8D377);
                border-radius: 20px;
                display: flex;
                justify-content: center;
                align items: center;
                flex-direction: column;
            }
            .pointsBtn {
                padding: 50px 55px;
                border-radius: 20px;
                cursor: pointer;
                background: none;
                color: #F8D377;
                border: none;
                font-size: 5rem;
            }
            .serve {
                padding-top: 1vh;
                display: none;
            }

            .serving {
                display: block;
            }

            #resetBtn {
                border: none;
                background-color: var(--darkblue, #2B7288);
                color: white;
                font-size: 1rem;
                padding: 12px 20px;
                border-radius: 25px;
                cursor: pointer;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            #resetBtn:hover {
                color: var(--yellow, #F8D377);
            }

            #matchResults {
                display: flex;
                width: 70vw;
                justify-content: center;
                align-items: center;
                padding: 1vw;
                margin: 0 auto 7vh auto;
                list-style: none;


            }
            #matchResults > li {
                background-color: #ffffff;
                color: #2B2B2B;
                padding: 10px;
                border-radius: 10px;
                margin: 5px;
                font-weight: 600;
            }



            /* ----------- Pingpong Table styling ----------- */

            #pingpongTable {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            #tableFrame {
                width: 25vw;
                height: 25vh;
                background-color: var(--pink, #f96081);
                border: 8px solid white;
                z-index: 10;
                box-shadow: 21px 26px 0px 1px var(--darkblue, #2B7288);
                position: absolute;
            }
            #centeredLine {
                width: 25vw;
                background-color: white;
                height: 8px;
                z-index: 20;
                position: relative;
                top: 18vh;
            }
            #net {
                height: 30vh;
                width: 13px;
                background-color: var(--darkblue, #2B7288);
                position: relative;
                z-index: 30;
                top: 2vh;
            }
            #racket1 {
                position: relative;
                z-index: 30;
                left: 9.5vw;
                bottom: 5.5vh;
            }
            #circle1 {
                height: 32px;
                width: 35px;
                border-radius: 50%;
                background-color: var(--darkblue, #293645);
                transform: rotate(15deg);
                box-shadow: 1px 2px 2px 1px rgba(44, 44, 44, 0.474);
            }
            #handle1 {
                height: 21px;
                width: 7px;
                background-color: white;
                transform: rotate(-60deg);
                left: 37px;
                bottom: -8px;
                position: absolute;
                border-radius: 2px;
                box-shadow: -1.5px 1px 2px 1px rgba(44, 44, 44, 0.872);
            }
            #racket2 {
                transform: rotate(175deg);
                position: relative;
                z-index: 30;
                left: -9.5vw;
                bottom: 25vh;
            }
            #circle2 {
                height: 32px;
                width: 35px;
                border-radius: 50%;
                background-color: var(--darkblue, #293645);
                transform: rotate(15deg);
                box-shadow: 2px -2px 2px 1px rgba(0,0,0,0.7);
            }
            #handle2 {
                height: 21px;
                width: 7px;
                background-color: white;
                transform: rotate(-60deg);
                left: 37px;
                bottom: -8px;
                position: absolute;
                border-radius: 2px;
                box-shadow: 2px 1px 2px 1px rgba(0,0,0,0.7);
            }

            @media screen and (max-width:800px) {
                #pingpongTable {
                    display: none;
                }
            }

            @media screen and (max-width:400px) {
                #pingpongTable {
                    display: none;
                }

                .winningSets {
                    padding: 0px 30px;
                }
                .pointsBtn {
                    padding: 30px 40px;
                }
                .scoreboard {
                    margin: 1vh 5vw 0;
                }

                #matchResults {
                    flex-wrap: wrap;
                    width: 30v;
                    heigth: auto;
                }
            }
        </style>
        `
    }

    // * Render method
    render() {
        this.shadow.innerHTML = this.template();
        this.allQuerySelectors();
        this.updateSets();
        this.winningSetsTracker();
        this.announceWinner();
        this.changeAttributes();

        if (this.gameOver) {
            this.resetBtn.style.display = 'none';
        } else {
            this.resetBtn.style.display = 'block';
        }
    }
}

customElements.define('score-board', ScoreBoard);