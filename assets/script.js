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


function loadStartScreen(){

}

function quiz(){



    quizFinishedScreen(score);
}

function quizFinishedScreen(score){

}

function highscoresScreen(){

}

function clearHighscores() {

}

function clearMainContent()
{
    document.getElementById(mainContent).innerHTML = "";
}
