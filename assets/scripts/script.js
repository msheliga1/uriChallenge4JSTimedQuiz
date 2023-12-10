// Mike Sheliga - 12.9.23
// URI Challenge 4 - Dynamic Javascript - Timed Javascript Quiz with Scores

alert("Welcome to Mike Sheliga's Timed Javascript Quiz");
/* seems this must go first, or else uncaught ReferenceError. Can't access questions before initialization. */
const questions = [];  /* global since used here and in displayQuestion */
init( ); 

function createStartScreen()
{
    alert("Starting createStartScreen");
    var mainEl = document.getElementById("main");
    var btn = document.createElement("button");
    btn.innerHTML = "View High Scores";
    btn.setAttribute("id", "viewHighScoreButton");
    // btn.setAttribute("color", "purple");
    // btn.bgcolor = "#ff00ff";
    // btn.style.backgroundColor = "#ffffff"; 
    mainEl.appendChild(btn);
    var title = document.createElement("h1");
    title.innerText = "Coding Quiz Challenge";
    title.setAttribute("id", "quizTitle");
    mainEl.appendChild(title);
    var instr1 = document.createElement("p");
    instr1.innerHTML = "<h3> Try to answer the following code related questions within the time limit. </h3>";
    instr1.setAttribute("class", "instruction");
    mainEl.appendChild(instr1);
    var instruction2 = document.createElement("p");
    instruction2.innerHTML = "<h3> Incorrect answers will penalize your score by 10 seconds. </h3>";
    instruction2.setAttribute("class", "instruction");
    mainEl.appendChild(instruction2);
    var div = document.createElement("div");
    var startBtn = document.createElement("button");
    startBtn.innerText = "Start Quiz";
    startBtn.setAttribute("id", "startBtn");
    startBtn.setAttribute("class", "defaultBtn");
    startBtn.onclick = takeQuiz;
    div.appendChild(startBtn);
    mainEl.appendChild(div);
}

function createQuizScreen(questionNo)
{
    alert("Starting createQuizScreen for question " + questionNo + ". Questions is " + questions);
    var mainEl = document.getElementById("main");
    var div = document.createElement("div");
    var timeLeftEl = document.createElement("p");
    timeLeftEl.textContent = "Time Left: ";
    timeLeftEl.setAttribute("id", "timeLeft");
    div.appendChild(timeLeftEl);
    mainEl.appendChild(div);
    // questions must be declared before this, at least if its a const.
    var question = questions[questionNo];
    var maxQuestion = questions.length;
    var prompt = question[0];
    var answers = question[1];
    var correct = question[2]; 
    var answerSection = document.createElement("section"); 
    answerSection.setAttribute("id", "answerSection");  // need to make questions and choices left aligned near middle
    var div = document.createElement("div");
    var promptEl = document.createElement("h1");
    promptEl.innerText = "Q. (" + (questionNo + 1) + " of " + maxQuestion + "). " + prompt;
    // promptEl.textContent = "Hola";
    promptEl.setAttribute("id", "prompt");
    div.appendChild(promptEl);
    answerSection.appendChild(div); 
    for (var i = 0; i < answers.length; i++) {
        var div = document.createElement("div");  /* couldnt get multi-line display wout this despite display:block - arghhh! */
        var answerBtn = document.createElement("button");
        answerBtn.innerText = "" + (i+1) + ". " + answers[i];
        /* answerBtn.setAttribute("id", "answerBtn"); /* /* multiple buttons should not have same id */
        answerBtn.setAttribute("class", "answerBtn defaultBtn");
        answerBtn.onclick = checkAnswer;
        div.appendChild(answerBtn);
        answerSection.appendChild(div);
    }
    mainEl.appendChild(answerSection);
    alert("Done creating quiz screen");
}

function checkAnswer(ev) {
    alert("Checking the answer " + ev);
}


// Clear the main part of the screen - leave the title the same always
function clearMain( )
{
    var main = document.getElementById("main");
    var childNodes= main.childNodes;
    var children = childNodes.length;
    // delete nodes from end to avoid changinng indices
    for (var i=children-1; i >= 0; i--) {
        // need to delete elements here.
        main.removeChild(childNodes[i]);
    }
}

// Take the Quiz
function takeQuiz( ) {
    alert("You are taking the quiz");
    var timeLeft = 5; 
    var questionNo = 0;
    const myInterval = setInterval(tHandler, 1000);  // myInterval must be available to tHandler method
    clearMain();  // clear html main section
    createQuizScreen(questionNo);  // create time Left part, and Questions
    updateDOMTime(timeLeft);

    // would prefer this external to takeQuiz, but myInterval must be available to ClearInterval here, so it seems like it 
    // it must be an inner function
    function tHandler() {
        timeLeft--;
        updateDOMTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(myInterval);
            alert("You Lost: No Time Left!");
            // clear screen
            // display enter name screen
        }
    }
}  // end TakeQuiz

// when counting down (or as part of answering) we update the timeLeft.
function updateDOMTime(timeLeft) {
    var timeText = document.getElementById("timeLeft");
    timeText.textContent = "Time Left: " + timeLeft; 
}

/* initialization routines -------------------------------------- */
/* Only need to create questions array once. */
function init ( ) {
    createStartScreen();
    initQuestions(); 
}

function initQuestions() {
    // alert("Beginning to initialize Questions array ... current length: " + questions.length);
    var prompt = "Commonly used data types do NOT include: ";
    var answers = ["strings", "booleans", "alerts", "numbers"];
    var correct = "alerts";
    const question = [prompt, answers, correct];
    questions.push(question);
    alert("End initQuestions. Number of quesions: " + questions.length);
} 