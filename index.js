"use strict";
let currentQuestion = 0;
let currentScore = 0;

function startQuiz() {
    beginQuiz();
    //renderQuestion();
    getUserAnswer();
    renderNextQuestion();
    startNewQuiz();
}

function beginQuiz() {
    $('.intro-screen').on('click', '.intro-button', function (event) {
        $('.intro-screen').remove();
        $('.question-form').css('display', 'flex');
        $('.current-question').text(1);
        renderQuestion();
    })
}

//render question
function renderQuestion() {
    console.log(QUESTIONS.length);
    console.log(currentQuestion);
    if (currentQuestion < QUESTIONS.length) {

        $('.question-form').html(createQuestion);
        //updateQuestion();
    } else {
        console.log('render Results');

        renderResults();

    }
}

//check answer display correct or wrong
function getUserAnswer() {
    $('.question-form').off();
    $('.question-form').on('click', '.submit-answer', function (event) {
        console.log('clicked');
        event.preventDefault();
        const userAnswer = $('input:checked').val();
        console.log(userAnswer);
        const correctAnswer = QUESTIONS[currentQuestion].correctAnswer;

        if (userAnswer === correctAnswer) {
            console.log('Answer is correct');
            displayCorrect();
            updateScore();
        } else {
            console.log('Answer is incorrect');
            displayWrong();
        }
    });
    
}

//update Score
function updateScore() {
    currentScore++;
    $('.score').text(currentScore);
}

function updateQuestion() {
    console.log('Updating question number');
    currentQuestion++;
    $('.current-question').text(currentQuestion + 1);
}

function renderNextQuestion() {
    $('main').on('click', '.next', function (event) {
        updateQuestion();
        renderQuestion();
        getUserAnswer();
    });
}

function createQuestion() {
    return `<div class="question-${currentQuestion}">
    <h2>${QUESTIONS[currentQuestion].question}</h2>
    <form>
     <fieldset>
         <label for="answer1">
             <input type="radio" value="${QUESTIONS[currentQuestion].answers[0]}" name="answer" id="answer1">
             <span>${QUESTIONS[currentQuestion].answers[0]}</span>
         </label>
         <label for="answer2">
             <input type="radio" value="${QUESTIONS[currentQuestion].answers[1]}" name="answer"  id="answer2">
             <span>${QUESTIONS[currentQuestion].answers[1]}</span>
         </label>
         <label for="answer3">
             <input type="radio" value="${QUESTIONS[currentQuestion].answers[2]}" name="answer"  id="answer3">
             <span>${QUESTIONS[currentQuestion].answers[2]}</span>
         </label>
         <label for="answer4">
             <input type="radio" value="${QUESTIONS[currentQuestion].answers[3]}" name="answer"  id="answer4">
             <span>${QUESTIONS[currentQuestion].answers[3]}</span>
         </label>
         <button type="button" class="submit-answer"><span>Submit Answer</span></button>
     </fieldset>
    </form>
    </div>`;
}

function displayCorrect() {
    $('.question-form').html(`<div class="feedback correct-answer"> 
    <div class="block">Congrats!! Your Answer is correct!</div>
    <div class="block">
        <button class="next">Next Question</button>
    </div>
    </div>`);
}

function displayWrong() {
    $('.question-form').html(`<div class="feedback wrong-answer">
    <div class="block">Your Answer was not correct! The correct answer is <span class="correct">'${QUESTIONS[currentQuestion].correctAnswer}'</span></div>
    <div class="block">
        <button class="next">Next Question</button>
    </div>
    </div>`)
}

function renderResults() {
    $('.current-question').text(QUESTIONS.length);
    $('.question-form').html(`<div class="results"><div class="block">Results:</div>
        <div class="block">Score: ${currentScore}/5</div>
            <div class="block">
                <button class="start-new">Begin new quiz</button>
            </div>
        </div>`);
}

function startNewQuiz() {
    $('.question-form').on('click', '.start-new', function (event) {
        console.log('start new');
        location.reload();
    });
}

$(startQuiz);