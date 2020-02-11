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
const $timer = document.querySelector('#timeCounter');
const $startContent = document.querySelector('#startContent');
const $quizContent = document.querySelector('#quizContent');
const $quizFinishedContent = document.querySelector('#quizFinishedContent');
const $highscoresContent = document.querySelector('#highscoresContent');
const $startButton = document.querySelector('#startButton');
const $quizTitle = document.querySelector('#quizTitle');
const $quizText = document.querySelector('#quizText');
const $answerBlock = document.querySelector('#answerBlock');
const $answer1 = document.querySelector('#answer1');
const $answer2 = document.querySelector('#answer2');
const $answer3 = document.querySelector('#answer3');
const $answer4 = document.querySelector('#answer4');



//quizQuestions array contains 10 elements, each is a question array with 4 elements (title, question, answers, index of correct answer), each answer is an array with 4 elements
const quizQuestions = [
                        ["Question 1", 
                        "Commonly used data types DO NOT include", 
                            ["Strings",
                            "Booleans",
                            "Arrays",
                            "Alerts"],
                        3], 
                        ["Question 2", 
                        "Commonly used data types DO NOT include", 
                            ["Strings",
                            "Booleans",
                            "Arrays",
                            "Alerts"],
                        0], 
                        ["Question 3", 
                        "Commonly used data types DO NOT include", 
                            ["Strings",
                            "Booleans",
                            "Arrays",
                           "Alerts"],
                        0], 
                        ["Question 4", 
                        "Commonly used data types DO NOT include", 
                            ["Strings",
                            "Booleans",
                            "Arrays",
                            "Alerts"],
                        0], 
                        ["Question 5", 
                        "Commonly used data types DO NOT include", 
                            ["Strings",
                            "Booleans",
                            "Arrays",
                            "Alerts"],
                        0], 
                        ["Question 6", 
                        "Commonly used data types DO NOT include", 
                            ["Strings",
                            "Booleans",
                            "Arrays",
                            "Alerts"],
                        0], 
                        ["Question 7", 
                        "Commonly used data types DO NOT include", 
                            ["Strings",
                            "Booleans",
                            "Arrays",
                            "Alerts"],
                        0], 
                        ["Question 8", 
                        "Commonly used data types DO NOT include", 
                            ["Strings",
                            "Booleans",
                            "Arrays",
                            "Alerts"],
                        0], 
                        ["Question 9", 
                        "Commonly used data types DO NOT include", 
                            ["Strings",
                            "Booleans",
                            "Arrays",
                            "Alerts"],
                        0], 
                        ["Question 10", 
                        "Commonly used data types DO NOT include", 
                            ["Strings",
                            "Booleans",
                            "Arrays",
                            "Alerts"],
                        0]
                    ];
let quizTime = 0;
let currentQuestion = 0;
$startButton.addEventListener("click", quiz);





function loadStartScreen(){
    switchScreen('start');
    $timer.textContent = quizTime;
}

function quiz(event){
    $answerBlock.addEventListener("click", answerChosen);

    switchScreen('quiz');
    quizTime = 75;
    quizTimer();
    let score = 0;
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

    function answerChosen(event){
        let answer = event.target.getAttribute("name");
        currentQuestion++;
        if (answer === correctAnswer){
            score += 1047;
            displayCorrectAlert();
            displayQuestion(currentQuestion);            
        }
        else{
            displayIncorrectAlert();
            displayQuestion(currentQuestion);            
        }
    }
    
    function displayCorrectAlert(){
        
    }
    
    function displayIncorrectAlert(){
    
    }



}





function quizFinishedScreen(score){
    switchScreen('quizFinished');

}

function highscoresScreen(){
    switchScreen('highscores');

}

function clearHighscores() {

}

function quizTimer(){
    let interval = setInterval(function(){
        updateTimerDisplay();
        if (quizTime < 1){
            clearInterval(interval);
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


//initialize the quiz site
loadStartScreen();
