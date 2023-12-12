// Mike Sheliga - 12.9.23
// URI Challenge 4 - Dynamic Javascript - Timed Javascript Quiz with Scores
// myLog is great for debugging, but allows all console.logs to be removed at once.
myLog("Welcome to Mike Sheliga's Timed Javascript Quiz");

/* seems this must go first, or else uncaught ReferenceError. Can't access questions before initialization. */
// const questions = [];  /* global since used here and in displayQuestion */
init( ); 

function createStartScreen()
{
    myLog("Starting createStartScreen");
    var div = document.createElement("div");  // needed for button to work!! - arghhh
    var mainEl = document.getElementById("main");
    var btn = document.createElement("button");
    btn.innerHTML = "View High Scores";
    btn.setAttribute("id", "viewHighScoreButton");
    // btn.addEventListener("onclick", showScores);
    btn.onclick = showScores;
    div.appendChild(btn);
    mainEl.appendChild(div);

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


// show the array of scores
// since assignment didnt specify, I didn't sort this, nor save it to local storage. 
// I also didnt see a screen of hwo this must look, so I did it the easy way with 
// an alert. 
function showScores() {
    myLog("Entering showScores");
    if (scores.length === 0) {
        alert("There are no scores to show!");
    } else {
        var alertString = "Scores: \n";
        for (var i=0; i < scores.length; i++) {
            var score = scores[i];
            alertString += (i+1) + ". " + score.initials;
            alertString += " - " + score.score + "\n";
        }
        alert(alertString);
    }
}  // end method showScores

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
// Note: Do NOT display the high score buttons while taking the quiz.
function takeQuiz( ) {
    myLog("Starting take quiz.");
    const totalQuizTime = 20;  // change to 75 for real quiz
    const wrongPenaltyTime = 5;  // 15 in demo

    /* These 3 variables are effectively global inside the takeQuiz screen. */
    var timeLeftObj = { timeLeft: totalQuizTime}; 
    var questionNo = 0;
    var correctOrWrong = "First Question .... ";  // set by Check answer method

    var questions = getQuestions(); // uses lazy initialization to setup array
    const myInterval = setInterval(tHandler, 1000);  // myInterval must be available to tHandler method
    clearMain();  // clear html main section
    createQuizScreen(questionNo);  // create time Left part, and Questions
    updateDOMTime(timeLeftObj.timeLeft);

    // would prefer this external to takeQuiz, but myInterval must be available to ClearInterval here, so it seems like it 
    // it must be an inner function
    function tHandler() {
        subtractTime(timeLeftObj, 1);
    }

    // this accessory routine will subtract time from TimeLeft, update the html DOM (the screen), and exit if no time left.
    // must pass in an Object (timeLeftObj) in order to be able to change the value.
    function subtractTime(timeLeftObj, amountToSubtract) { 
        timeLeftObj.timeLeft = timeLeftObj.timeLeft - amountToSubtract;
        var timeLeft = timeLeftObj.timeLeft;   
        updateDOMTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(myInterval);
            alert("You Lost: No Time Left! Your score of 0 will not be recorded.");
            clearMain();
            createStartScreen();
            // display enter name screen
        }
    }

    // Must be inside takeQuiz to call checkAnswer
    // Create the quiz screen including time left, prompt and buttons for answers.
    function createQuizScreen(questionNo)
    {
        myLog("Starting createQuizScreen for question " + questionNo + " Last answer " + correctOrWrong);
        var mainEl = document.getElementById("main");
        var div = document.createElement("div");
        var timeLeftEl = document.createElement("p");
        timeLeftEl.textContent = "Time Left: ";
        timeLeftEl.setAttribute("id", "timeLeft");
        div.appendChild(timeLeftEl);
        mainEl.appendChild(div);
        // questions must be declared before this, at least if its a const.
        var questions = getQuestions();  // a finely organized object oriented type get method.
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
        promptEl.setAttribute("correct", correct);
        div.appendChild(promptEl);
        answerSection.appendChild(div); 
        for (var i = 0; i < answers.length; i++) {
            var div = document.createElement("div");  /* couldnt get multi-line display wout this despite display:block - arghhh! */
            var answerBtn = document.createElement("button");
            answerBtn.innerText = "" + (i+1) + ". " + answers[i];
            /* answerBtn.setAttribute("id", "answerBtn"); /* /* multiple buttons should not have same id */
            answerBtn.setAttribute("class", "answerBtn defaultBtn");
            answerBtn.setAttribute("answer", answers[i]);
            answerBtn.onclick = checkAnswer;  // beware not defined error - not sure why is previously occurred
            // answerBtn.addEventListener("onclick", checkAnswer);
            div.appendChild(answerBtn);
            answerSection.appendChild(div);
        }
        mainEl.appendChild(answerSection);
        var div = document.createElement("section");
        div.setAttribute("id", "correctOrWrongDiv");
        var par = document.createElement("p");
        par.setAttribute("id", "correctOrWrong");
        par.innerText = correctOrWrong;
        div.appendChild(par);
        answerSection.appendChild(div);

        myLog("Done creating quiz screen");
    }  // end createQuizScreen(QuestionNo)

    // Must be inside TakeQuiz to get timeLeftObj (unless we fetch timer from the DOM)
    function checkAnswer(ev) {
        myLog("Entering checkAnswer");
        var button = ev.target;
        myLog("Checking the answer for ev target " + button);
        var answer = button.getAttribute("answer");
        myLog("The answer is: " + answer);
        var promptEl = document.getElementById("prompt");
        var correct = promptEl.getAttribute("correct")
        myLog("Check Answer: Correct Answer: " + correct); 
        if (answer.trim().toLowerCase() === correct.trim().toLowerCase()) {
            myLog("Your correct answer was " + answer);
            correctOrWrong = "Correct!";
        } else {
            myLog("Your wrong answer was " + answer);
            correctOrWrong = "Wrong.";
            // subtractTime may exit the screen
            subtractTime(timeLeftObj, wrongPenaltyTime);
        }
        if (timeLeftObj.timeLeft <= 0) {  // subtractTime will have loaded new screen.
            return;
        }
        questionNo++;
        if (questionNo >= getNumberOfQuestions()) {
            // stop the clock immediately.
            clearInterval(myInterval);
            myLog("You have won - your score is " + timeLeftObj.timeLeft);
            alert("You have won! - Your Score is " + timeLeftObj.timeLeft);
            clearMain();
            createInitialsScreen(timeLeftObj);
        } else {
            myLog("Beginning question " + questionNo);
            clearMain();
            createQuizScreen(questionNo);
        }
    }   // end checkAnswer
}  // end TakeQuiz

// ----------- Enter Initials Section --------------------- 
    // Create the quiz screen including time left, prompt and buttons for answers.
    const scores = [];

    function createInitialsScreen(timeLeftObj)
    {
        myLog("Starting enterInitialsScreen, score " + timeLeftObj.timeLeft + " ... currently stored scores is " + (scores.length + 1));
        var mainEl = document.getElementById("main");
        var allDoneSection = document.createElement("section");
        mainEl.appendChild(allDoneSection);
        allDoneSection.setAttribute("id", "allDoneSection");

        var div = document.createElement("div");
        allDoneSection.appendChild(div);
        var allDone = document.createElement("h1");
        div.appendChild(allDone);
        allDone.textContent = "All Done!";
        allDone.setAttribute("id", "All Done");

        div = document.createElement("div");
        allDoneSection.appendChild(div); 
        var promptEl = document.createElement("h3");
        div.appendChild(promptEl);
        promptEl.innerText = "Your final score is " + timeLeftObj.timeLeft;
        promptEl.setAttribute("id", "finalScore");
        // need to store the score in the DOM, since cant pass to event handler.
        // promptEl.setAttribute("score", 33); // this works.
        promptEl.setAttribute("score", timeLeftObj.timeLeft);  // finally got this to work. Not sure why - arghhh!

        var EIdiv = document.createElement("div");
        allDoneSection.appendChild(EIdiv); 
        EIdiv.setAttribute("id", "enterInitDiv");  // Mainly to align enclosed objects l-r

        div = document.createElement("h2");
        EIdiv.appendChild(div);
        div.innerText = "Enter Initials";
        div.setAttribute("id", "EILabel");
        
        var textBox = document.createElement("INPUT");
        EIdiv.appendChild(textBox);
        textBox.setAttribute("type", "text");
        textBox.setAttribute("maxlength", "3");
        textBox.setAttribute("id", "nameTextBox");

        var div = document.createElement("div");  /* couldnt get multi-line display wout this despite display:block - arghhh! */
        var submitBtn = document.createElement("button");
        EIdiv.appendChild(submitBtn);
        submitBtn.setAttribute("id", "submitBtn");
        submitBtn.innerText = "Submit";  // pretend like a submit button, but really just a button
        submitBtn.setAttribute("class", "defaultBtn");
        submitBtn.onclick = storeResult;  // beware not defined error - not sure why is previously occurred

        allDoneSection.appendChild(div);
        myLog("Done creating enter initials screen");
    }  // end createEnterInitialsScreen( )

// Store the score and the initials (storeage ordred by time, not high to low since not in instructions.)
function storeResult () {
    // Score passed in as hidden DOM attribute.
    var score = document.getElementById("finalScore").getAttribute("score");
    var textBox = document.getElementById("nameTextBox");
    var inits = document.getElementById("nameTextBox").value;
    myLog("Entering storeResults: Score is " + score + " Initials " + inits + " textBox " + textBox);
    var newResult = {score: score, initials: inits};
    scores.push(newResult);
    myLog("Score entered: " + scores.length);
    clearMain();
    createStartScreen();
}

// when counting down (or as part of answering) we update the timeLeft.
function updateDOMTime(timeLeft) {
    var timeText = document.getElementById("timeLeft");
    timeText.textContent = "Time Left: " + timeLeft; 
}

/* initialization routines -------------------------------------- */
/* Only need to create questions array once. */
function init ( ) {
    createStartScreen();  // creates start screen and displays it. 
}

// ----------------- Question psuedo-class -----------------------------------------
// this should really be private, but we haven't learned private or classes yet.
var questionsArray = [];
// Methods: initQuestions, getNumberOfQuestions, getQuestions

function initQuestions() {
    if (questionsArray.length > 0) { 
        return;  // questions already initializaed
    }
    myLog("Beginning to initialize Questions array ... current length: " + questionsArray.length);
    var prompt = "Commonly used data types do NOT include: ";
    var answers = ["strings", "booleans", "alerts", "numbers"];
    var correct = "alerts";
    var question = [prompt, answers, correct];  // cant reassign to a constant.
    questionsArray.push(question);
    prompt = "Arrays in javascript can be used to store: ";
    answers = ["numbers and strings", "other arrays", "booleans", "all of the above"];
    correct = "all of the above";
    question = [prompt, answers, correct];
    questionsArray.push(question);
    prompt = "String values must be enclosed in _________ when being assigned to variables";
    answers = ["commas", "curley brackets", "quotes", "parenthesis"];
    correct = "quotes";
    question = [prompt, answers, correct];
    questionsArray.push(question);    
    prompt = "A very useful tool during development and debugging for printing values is";
    answers = ["JavaScript", "terminal/bash", "for loops", "console.log"];
    correct = "console.log";
    question = [prompt, answers, correct];
    questionsArray.push(question);    
    myLog("End initQuestions. Number of quesions: " + questionsArray.length);
} 

function getNumberOfQuestions() {
    return questionsArray.length;
}

function getQuestions() {
    if (questionsArray.length === 0) {
        myLog("QuestionsArray empty, calling initQuestions ... ");
        initQuestions(); 
    }
    // yah, I know we should do a deep copy, or make the object immutable, but 
    // these are way beyone the scope
    return questionsArray;
}

// Accessory routines - good to remove all console.logs, in case grader requires it.
function myLog(text) {
    // console.log(text);
}