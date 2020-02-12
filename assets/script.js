/*

Elements to which I need to listen:
view highscores h4
start button - start screen
answer buttons - quiz screens
go back button - highscores screen
clear highscores - highscores screen
submit - all done screen
timer > timeCounter span


Screens to build:
Start screen (load by default or when 'go back' is clicked)
quiz screen - #, question, 4 clickable answers, content to display correct or incorrect message


*/


//grab needed HTML elements
const $highscoresLink = document.querySelector('#highscores');
const $time = document.querySelector('#time');
const $timer = document.querySelector('#timeCounter');
const $startContent = document.querySelector('#startContent');
const $quizContent = document.querySelector('#quizContent');
const $quizFinishedContent = document.querySelector('#quizFinishedContent');
const $highscoresContent = document.querySelector('#highscoresContent');
const $highscoreList = document.querySelector('#highscoreList');
const $clearHighscores = document.querySelector('#clearButton');
const $restartQuiz = document.querySelector('#restartButton');
const $startButton = document.querySelector('#startButton');
const $quizTitle = document.querySelector('#quizTitle');
const $quizText = document.querySelector('#quizText');
const $answerBlock = document.querySelector('#answerBlock');
const $finalScore = document.querySelector('#finishedScore');
const $initialsBox = document.querySelector('#initials');
const $submitBtn = document.querySelector('#submitButton');
const $answer1 = document.querySelector('#answer1');
const $answer2 = document.querySelector('#answer2');
const $answer3 = document.querySelector('#answer3');
const $answer4 = document.querySelector('#answer4');


//needed global event listeners
$startButton.addEventListener("click", quiz);
$submitBtn.addEventListener("click", submitScore);
$highscoresLink.addEventListener("click", highscoresScreen);
$clearHighscores.addEventListener("click", clearHighscores);
$restartQuiz.addEventListener("click", startQuizAgain);


//quizQuestions array contains 10 elements, each is a question array with 4 elements (title, question, answers, index of correct answer), each answer is an array with 4 elements
const quizQuestions = [
                        ["Question 1", 
                        "Commonly used data types DO NOT include", 
                            ["Strings",
                            "Booleans",
                            "Arrays",
                            "Alerts"],
                        4], 
                        ["Question 2", 
                        "JSON is an acronym which stands for...", 
                            ["Jimmy Should Obviously Not",
                            "Jamiroquai Shall Obtain Nobility",
                            "Javascript Object Notation",
                            "John-Jacob-Jingleheimer Schmidt, Only Name"],
                        3], 
                        ["Question 3", 
                        "The core languages of the web are...", 
                            ["HTML, CSS, JS",
                            "PHP, Ruby, XML",
                            "English, Spanish, Russian",
                           "Tubes, Memes, Trolling"],
                        1], 
                        ["Question 4", 
                        "A function which calls itself is said to be...", 
                            ["Narcissistic",
                            "Lonely",
                            "A Soliloquy",
                            "Recursive"],
                        4], 
                        ["Question 5", 
                        "A language-agnostic description of a program or function is known as...", 
                            ["Jibber Jabber",
                            "Pseudo-code",
                            "Mumbo Jumbo",
                            "A Jewel Poem"],
                        2], 
                        ["Question 6", 
                        "A rubber ducky is used for...", 
                            ["Laughing together",
                            "Crying together",
                            "Throwing",
                            "All of the above"],
                        4], 
                        ["Question 7", 
                        "Version Control systems ARE NOT used for", 
                            ["Managing collaborative work with multiple team members",
                            "Ensuring you have the correct version of your browser",
                            "Tracking changes iteratively as a program is built",
                            "Housing a decentralized repository of a program"],
                        2], 
                        ["Question 8", 
                        "The Javascript language has many built-in ______ which are used on objects to execute specific tasks", 
                            ["Cheerleaders",
                            "Mechanics",
                            "Methods",
                            "Scaffolds"],
                        3], 
                        ["Question 9", 
                        "In Javascript, the keyword used to specify a particular instance of an object is...", 
                            ["Guy",
                            "Johnny 5",
                            "This",
                            "That"],
                        3], 
                        ["Question 10", 
                        "Objectively, the best computer system is...", 
                            ["Linux",
                            "Windows",
                            "Mac",
                            "One which is used to code"],
                        4]
                    ];
let quizTime = 0;
let currentQuestion = 0;
let score = 0;
var interval;
let highscores = {Scores: [] };

function getHighScores(){
    let savedScores = JSON.parse(localStorage.getItem("highscores"));
    if (savedScores === null){
        return;
    }
    highscores = savedScores;
}

function loadStartScreen(){
    switchScreen('start');
    $timer.textContent = quizTime;
}

function quiz(event){
    console.log(score);
    $answerBlock.addEventListener("click", answerChosen);
    switchScreen('quiz');
    quizTime = 75;
    quizTimer();
    let correctAnswer = 0;
    displayQuestion(currentQuestion);

    //function to update the quiz screen as new questions are needed
    function displayQuestion(questionNumber){
    //decrement number used to access array indexes
        correctAnswer = quizQuestions[questionNumber][3];
        $quizTitle.innerHTML = quizQuestions[questionNumber][0];
        $quizText.innerHTML = quizQuestions[questionNumber][1];
        $answer1.innerHTML =  quizQuestions[questionNumber][2][0];
        $answer2.innerHTML = quizQuestions[questionNumber][2][1];
        $answer3.innerHTML = quizQuestions[questionNumber][2][2];
        $answer4.innerHTML = quizQuestions[questionNumber][2][3];
    }

    //function which accepts a click event and determines if the answer chosen is correct. It will either trigger the next question to display or will go to the quiz finished screen
    function answerChosen(event){
        let answer = event.target.getAttribute("name");
        if (answer == correctAnswer){
            score += 1047;
            displayCorrectAlert();
        }
        else{
            quizTime -= 10;
            updateTimerDisplay();
            displayIncorrectAlert();
        }
        currentQuestion++;
        if (currentQuestion > 9){
            $answerBlock.removeEventListener("click", answerChosen);
            quizFinishedScreen();
        }
        else {
            displayQuestion(currentQuestion);            
        }
    }
    
    function displayCorrectAlert(){
  
    }
    
    function displayIncorrectAlert(){
    
    }
}

function quizFinishedScreen(){
    clearInterval(interval);
    switchScreen('quizFinished');
    $finalScore.textContent = score;
}

function submitScore(event){
    event.preventDefault();
    let initials = $initialsBox.value.trim();
    $initialsBox.value = "";
    let scoreObj = { 
        Initials: initials,
        Score: score
    };
    highscores.Scores.push(scoreObj);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    quizTime = 0;
    highscoresScreen();
}

function highscoresScreen(){
    //prevent exiting the quiz while time is ticking. This may break the operation of the quiz function
    if (quizTime != 0){
        return;
    }
    //reset screen for repeated playthroughs
    $highscoreList.innerHTML= "";
    switchScreen('highscores');
    $highscoresLink.style.display = "none";
    $time.style.display = "none";
    let highscoresToList = highscores.Scores;
    highscoresToList.forEach(function(hs){
        let nextScore = document.createElement("li");
        nextScore.setAttribute("class", "list-group-item");
        nextScore.innerHTML = hs.Initials + " : " + hs.Score;
        $highscoreList.appendChild(nextScore);
    })
}

function clearHighscores() {
    localStorage.removeItem("highscores");
    highscores = {Scores: [] };
    $highscoreList.innerHTML= "";

}

function startQuizAgain (){
    $highscoresLink.style.display = "inline";
    $time.style.display = "inline";
    currentQuestion = 0;
    score = 0;
    loadStartScreen();

}

function quizTimer(){
    interval = setInterval(function(){
        updateTimerDisplay();
        if (quizTime < 1){
            quizFinishedScreen();
        }
        quizTime--;
    }, 1000);

}

function updateTimerDisplay(){
    $timer.textContent = quizTime;
}

function switchScreen(screenToDisplay)
{
    switch(screenToDisplay) {
        case 'start':
            $startContent.style.display = "block";
            $quizContent.style.display = "none";
            $quizFinishedContent.style.display = "none";
            $highscoresContent.style.display = "none";
            break;
        case 'quiz':
            $startContent.style.display = "none";
            $quizContent.style.display = "block";
            $quizFinishedContent.style.display = "none";
            $highscoresContent.style.display = "none";
            break;
        case 'quizFinished':
            $startContent.style.display = "none";
            $quizContent.style.display = "none";
            $quizFinishedContent.style.display = "block";
            $highscoresContent.style.display = "none";
            break;
        case 'highscores':
            $startContent.style.display = "none";
            $quizContent.style.display = "none";
            $quizFinishedContent.style.display = "none";
            $highscoresContent.style.display = "block";
            break;
        default:
            $startContent.style.display = "block";
            $quizContent.style.display = "none";
            $quizFinishedContent.style.display = "none";
            $highscoresContent.style.display = "none";
            break;
    }

}


//initialize the quiz page
loadStartScreen();
getHighScores();
