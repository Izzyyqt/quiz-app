let countTime = 20;
let timerInterval;
let score = 0;
let img = createImage('q1image.png');
let questionAnsweredCorrectly = false;

function createImage(src) {
    let img = document.createElement('img');
    img.style.maxWidth = '500px';
    img.style.maxHeight = '500px';
    img.style.borderRadius = '50px';
    img.src = src;
    return img;
}

// QUESTIONS 
let currentQuestionIndex = 0;
let questions = [
    {
        images: {
            question: createImage('q1image.png'),
            correct: createImage('q1image-correct.png')
        },
        options: ['Charmander', 'Caterpie', 'Pikachu', 'Bulbasaur', 'Squirtle'],
        correctAnswer: 'Caterpie'
    },
    {
        images: {
            question: createImage('q2image.png'),
            correct: createImage('q2image-correct.png')
        },
        options: ['Squirtle', 'Gengar', 'Bulbasaur', 'Charmander', 'Pikachu'],
        correctAnswer: 'Pikachu'
    },
    {
        images: {
            question: createImage('q3image.png'),
            correct: createImage('q3image-correct.png')
        },
        options: ['Voltrobe', 'Pikachu', 'Electrode', 'Meowth', 'Jigglypuff'],
        correctAnswer: 'Electrode'
    },
    {
        images: {
            question: createImage('q4image.png'),
            correct: createImage('q4image-correct.png')
        },
        options: ['Meowth', 'Mew', 'Pikachu', 'Mewtwo', 'Zapdos'],
        correctAnswer: 'Pikachu'
    },
    {
        images: {
            question: createImage('q5image.png'),
            correct: createImage('q5image-correct.png')
        },
        options: ['Pikachu', 'Jigglypuff', 'Voltrobe', 'Electrode', 'Snorlax'],
        correctAnswer: 'Jigglypuff'
    },
    {
        images: {
            question: createImage('q6image.png'),
            correct: createImage('q6image-correct.png')
        },
        options: ['Mewtwo', 'Dragonite', 'Charizard', 'Pikachu', 'Lapras'],
        correctAnswer: 'Pikachu'
    },
    {
        images: {
            question: createImage('q7image.png'),
            correct: createImage('q7image-correct.png')
        },
        options: ['Pikachu', 'Onix', 'Goku', 'Saitama', 'Charizard'],
        correctAnswer: 'Pikachu'
    },
    {
        images: {
            question: createImage('q8image.png'),
            correct: createImage('q8image-correct.png')
        },
        options: ['Eggs', 'Exeggcute', 'Pikachu', 'Krillin', 'Saitama'],
        correctAnswer: 'Saitama'
    },
    {
        images: {
            question: createImage('q9image.png'),
            correct: createImage('q9image-correct.png')
        },
        options: ['Luffy', 'Snorlax', 'Psyduck', 'Gengar', 'Pikachu'],
        correctAnswer: 'Psyduck'
    },
    {
        images: {
            question: createImage('q10image.png'),
            correct: createImage('q10image-correct.png')
        },
        options: ['Saitama', 'Diglett', 'Dugtrio', 'Pikachu', 'Uncle Ben'],
        correctAnswer: 'Diglett'
    }
    // Add more questions as needed
];

initializeQuestion(questions[currentQuestionIndex]);

document.getElementById('nextBtn').addEventListener('click', function() {
    // Check if there are more questions
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        initializeQuestion(questions[currentQuestionIndex]);

        // Reset the timer to 20 seconds
        countTime = 20;

        // Clear the existing timer interval
        clearInterval(timerInterval);

        // Call the updateTimer function again to restart the countdown
        updateTimer();
    } else {
        // Quiz is complete, change the button to restart
        document.getElementById('nextBtn').innerText = 'Restart';
        document.getElementById('nextBtn').addEventListener('click', restartQuiz);
    }
});

//RESTART GAME
function restartQuiz() {
    // Reset variables and start the quiz again
    currentQuestionIndex = 0;
    score = 0;
    countTime = 20; // Reset the timer to 20 seconds
    document.getElementById('nextBtn').innerText = 'Next';
    initializeQuestion(questions[currentQuestionIndex]);
    updateTimer();
}

// Initialize the question
function initializeQuestion(question) {
    // Reset the variable for the new question
    questionAnsweredCorrectly = false;

    document.getElementById('question-container').innerHTML = '';  
    document.getElementById('question-container').appendChild(question.images.question);
    document.getElementById('choiceA').innerText = question.options[0];
    document.getElementById('choiceB').innerText = question.options[1];
    document.getElementById('choiceC').innerText = question.options[2];
    document.getElementById('choiceD').innerText = question.options[3];
    document.getElementById('choiceE').innerText = question.options[4];

    document.getElementById('choiceA').addEventListener('click', function() {
        checkAnswer(question.options[0]);
    });
    document.getElementById('choiceB').addEventListener('click', function() {
        checkAnswer(question.options[1]);
    });
    document.getElementById('choiceC').addEventListener('click', function() {
        checkAnswer(question.options[2]);
    });
    document.getElementById('choiceD').addEventListener('click', function() {
        checkAnswer(question.options[3]);
    });
    document.getElementById('choiceE').addEventListener('click', function() {
        checkAnswer(question.options[4]);
    });
}
function checkAnswer(selectedAnswer) {
    // Check if the question has already been answered correctly
    if (questionAnsweredCorrectly) {
        return;
    }

    // Always display the correct image
    document.getElementById('question-container').innerHTML = '';
    document.getElementById('question-container').appendChild(questions[currentQuestionIndex].images.correct);

    // Check if the selected answer is correct
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        // Update the score only if the answer is correct
        score++;
        questionAnsweredCorrectly = true; // Set the variable to true
    }

    // Update the score
    document.getElementById('score').innerText = `SCORE: ${score}/${questions.length}`;
}

// for SOUNDS
const sound = new Audio('pokemon.mp3');
const bgSong = new Audio('bgSong.mp3');
bgSong.loop = true;

function updateTimer() {
    document.getElementById('timer').innerHTML = countTime;

    // Check if the countdown time is 20 seconds (or adjust as needed)
    if (countTime === 20) {
        // Play the sound when the timer starts ticking down at 20 seconds
        sound.play();
    }

    // Clear the existing timer interval
    clearInterval(timerInterval);

    timerInterval = setInterval(function() {
        if (countTime <= 0) {
            document.getElementById('timer').innerHTML = 'Time is up!';
            clearInterval(timerInterval); // Stop the timer interval
            document.getElementById('nextBtn').click(); // Automatically trigger the "Next" button click event
        } else {
            // Decrement the countdown time
            countTime--;
            document.getElementById('timer').innerHTML = countTime;
        }
    }, 1000);
}


document.getElementById('score').innerText = `SCORE: ${score}/${questions.length}`;
// Call the updateTimer function to start the countdown and play the sound
updateTimer();

// Play the background music
bgSong.play();