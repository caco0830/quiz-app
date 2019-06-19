currentQuestion = 0;
currentScore = 0;

function beginQuiz(){
    $('.intro-screen').on('click', '.intro-button', function(event) {
        $('.intro-screen').remove();
        $('.question-form').css('display', 'block');
        $('.current-question').text(1);
    })
}

//render question
function createQuestion(){
    
 return `<div class="question-${currentQuestion}">
 <h2>${QUESTIONS[currentQuestion].question}</h2>
 <form>
     <fieldset>
         <label for="">
             <input type="radio" value="${QUESTIONS[currentQuestion].answers[0]}" name="answer">
             <span>${QUESTIONS[currentQuestion].answers[0]}</span>
         </label>
         <label for="">
             <input type="radio" value="${QUESTIONS[currentQuestion].answers[1]}" name="answer">
             <span>${QUESTIONS[currentQuestion].answers[1]}</span>
         </label>
         <label for="">
             <input type="radio" value="${QUESTIONS[currentQuestion].answers[2]}" name="answer">
             <span>${QUESTIONS[currentQuestion].answers[2]}</span>
         </label>
         <label for="">
             <input type="radio" value="${QUESTIONS[currentQuestion].answers[3]}" name="answer">
             <span>${QUESTIONS[currentQuestion].answers[3]}</span>
         </label>
         <button type="submit">Submit Answer</button>
     </fieldset>
 </form>
</div>`;
}

function renderQuestion(){
    console.log(QUESTIONS.length);
    console.log(currentQuestion);
    if(currentQuestion < QUESTIONS.length){
        
        $('.question-form').html(createQuestion);
        //updateQuestion();
    //console.log('Question Rendered');
    }else{
        console.log('render Results');
        
        renderResults();
        
    }
}

//check answer display correct or wrong
function getUserAnswer(){
    $('form').on('submit', function(event) {
        event.preventDefault();
        let userAnswer = $('input:checked').val();
        let correctAnswer = QUESTIONS[currentQuestion].correctAnswer;

        if(userAnswer === correctAnswer){
            console.log('Answer is correct');
            displayCorrect();
            updateScore();
    
        }else{
            console.log('Answer is incorrect');
            displayWrong();
        }
    });
}

function displayCorrect(){
    $('.question-form').html(`<div class="feedback correct-answer">Correct Answer 
    <div class="block">Congrats!! Your Answer is correct</div>
    <div class="block">
        <button class="next">Next Question</button>
    </div>
    </div>`);
}

function displayWrong(){
    $('.question-form').html(`<div class="feedback wrong-answer">Wrong Answer 
    <div class="block">Your Answer was not correct</div>
    <div class="block">
        <button class="next">Next Question</button>
    </div>
    </div>`)
}

//update Score
function updateScore(){
    currentScore++;
    $('.score').text(currentScore);
}

function updateQuestion(){
    console.log('Uupdating question number');
    currentQuestion++;
    $('.current-question').text(currentQuestion + 1);
}

function renderNextQuestion(){
    $('main').on('click', '.next',function(event){
        updateQuestion();
        renderQuestion();
        getUserAnswer();

    }); 
}

function renderResults(){
    $('.current-question').text(QUESTIONS.length);
    $('.question-form').html(`<div class="results">Results
    <div class="block">Score: ${currentScore}/5</div>
    <div class="block">
        <button class="start-new">Begin new quiz</button>
    </div>
</div>`);

}

function startNewQuiz(){
    $('.question-form').on('click', '.start-new', function(event){
        console.log('start new');
        location.reload();
    });

}

function startQuiz(){
    beginQuiz();
    renderQuestion();
    //console.log('quiz started');
    getUserAnswer();
    renderNextQuestion();
    startNewQuiz();
}

$(startQuiz);