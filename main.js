let countTime = 15;
let timerInterval;
let score = 0;
let img = createImage('q1image.png');
let questionAnsweredCorrectly = false;

function createImage(src, callback) {
    let img = new Image();
    img.style.width = '100%';
    img.style.height = '300px';
    img.style.borderRadius = '50px';
    img.style.transition = 'height 0.3s ease-in-out, width 0.3s ease-in-out';

    img.onload = function () {
        callback(img);
    };

    img.src = src;

    img.addEventListener('mouseover', function () {
        img.style.width = '470px';
        img.style.height = '310px';
    });
    img.addEventListener('mouseout', function () {
        img.style.width = '100%';
        img.style.height = '300px';
    });

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
        options: ['Squirtle', 'Bulbasaur', 'Pikachu', 'Charmander', 'Gengar'],
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
        options: ['Meowth', 'Pikachu', "Zapdos", 'Mewtwo', 'Mew'],
        correctAnswer: 'Pikachu'
    },
    {
        images: {
            question: createImage('q5image.png'),
            correct: createImage('q5image-correct.png')
        },
        options: ['Pikachu', 'Snorlax', 'Voltrobe', 'Electrode', 'Jigglypuff'],
        correctAnswer: 'Jigglypuff'
    },
    {
        images: {
            question: createImage('q6image.png'),
            correct: createImage('q6image-correct.png')
        },
        options: ['Mewtwo', 'Dragonite', 'Lapras', "Pikachu", 'Charizard'],
        correctAnswer: "Pikachu"
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

document.getElementById('nextBtn').addEventListener('click', function () {
    // Check if there are more questions
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        initializeQuestion(questions[currentQuestionIndex]);

        // Reset the timer to 15 seconds
        countTime = 15;

        // Clear the existing timer interval
        clearInterval(timerInterval);

        // Call the updateTimer function again to restart the countdown
        updateTimer();

        // Reset the questionAnsweredCorrectly flag
        questionAnsweredCorrectly = false;

        // Update the score display
        document.getElementById('score').innerText = `SCORE: ${score}/${questions.length}`;
    } else {
        // Quiz is complete, change the button to restart
        document.getElementById('nextBtn').innerText = 'Restart';
        document.getElementById('nextBtn').addEventListener('click', restartQuiz);

        // Remove the buttons from quiz-container
        document.getElementById('wtp').style.display = 'none';
        document.getElementById('choiceA').style.display = 'none';
        document.getElementById('choiceB').style.display = 'none';
        document.getElementById('choiceC').style.display = 'none';
        document.getElementById('choiceD').style.display = 'none';
        document.getElementById('choiceE').style.display = 'none';

        // Display a thank you message and the final score
        document.getElementById('question-container').innerHTML = `<p>Thank you for playing!</p><p>Final Score: ${score}/${questions.length}</p>`;
        document.getElementById('question-container').style.color = 'white';
        document.getElementById('question-container').style.fontFamily = "'Pokemon Solid', sans-serif";
        document.getElementById('question-container').style.fontSize = '35px';
        document.getElementById('question-container').style.color = 'yellow';
        document.getElementById('question-container').style.letterSpacing = '5px';
        document.getElementById('question-container').style.webkitTextStrokeWidth = '3px';
        document.getElementById('question-container').style.webkitTextStrokeColor = 'rgb(63, 63, 165)';

        // Remove the timer display
        document.getElementById('timer').style.display = 'none';
        document.getElementById('score').style.display = 'none';
    }
});

//RESTART GAME
function restartQuiz() {
    // Remove the existing event listener
    document.getElementById('nextBtn').removeEventListener('click', restartQuiz);

    // Reset variables and start the quiz again
    currentQuestionIndex = 0;
    score = 0;
    countTime = 15; // Reset the timer to 15 seconds
    document.getElementById('nextBtn').innerText = 'Next';
    initializeQuestion(questions[currentQuestionIndex]);
    updateTimer();
    document.getElementById('wtp').style.display = 'block';
    document.getElementById('choiceA').style.display = 'block';
    document.getElementById('choiceB').style.display = 'block';
    document.getElementById('choiceC').style.display = 'block';
    document.getElementById('choiceD').style.display = 'block';
    document.getElementById('choiceE').style.display = 'block';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('score').style.display = 'block';
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

    // Function to play hover sound effect
    // Declare playHoverSound function globally
    function playHoverSound() {
        hoverEfx.play().catch(error => console.error('Error playing hover sound effect:', error));
    }

    // Add mouseover event listeners to all answer choices
    document.getElementById('choiceA').addEventListener('click', function () {
        checkAnswer(question.options[0]);
    });
    document.getElementById('choiceA').addEventListener('mouseover', playHoverSound);

    document.getElementById('choiceB').addEventListener('click', function () {
        checkAnswer(question.options[1]);
    });
    document.getElementById('choiceB').addEventListener('mouseover', playHoverSound);

    document.getElementById('choiceC').addEventListener('click', function () {
        checkAnswer(question.options[2]);
    });
    document.getElementById('choiceC').addEventListener('mouseover', playHoverSound);

    document.getElementById('choiceD').addEventListener('click', function () {
        checkAnswer(question.options[3]);
    });
    document.getElementById('choiceD').addEventListener('mouseover', playHoverSound);

    document.getElementById('choiceE').addEventListener('click', function () {
        checkAnswer(question.options[4]);
    });
    document.getElementById('choiceE').addEventListener('mouseover', playHoverSound);
}
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

    // Function to play hover sound effect
    // Declare playHoverSound function globally
    function playHoverSound() {
        hoverEfx.play().catch(error => console.error('Error playing hover sound effect:', error));
    }

    // Add mouseover event listeners to all answer choices
    document.getElementById('choiceA').addEventListener('click', function () {
        checkAnswer(question.options[0]);
    });
    document.getElementById('choiceA').addEventListener('mouseover', playHoverSound);

    document.getElementById('choiceB').addEventListener('click', function () {
        checkAnswer(question.options[1]);
    });
    document.getElementById('choiceB').addEventListener('mouseover', playHoverSound);

    document.getElementById('choiceC').addEventListener('click', function () {
        checkAnswer(question.options[2]);
    });
    document.getElementById('choiceC').addEventListener('mouseover', playHoverSound);

    document.getElementById('choiceD').addEventListener('click', function () {
        checkAnswer(question.options[3]);
    });
    document.getElementById('choiceD').addEventListener('mouseover', playHoverSound);

    document.getElementById('choiceE').addEventListener('click', function () {
        checkAnswer(question.options[4]);
    });
    document.getElementById('choiceE').addEventListener('mouseover', playHoverSound);
}

function checkAnswer(selectedAnswer) {
    // Check if the question has already been answered correctly
    if (questionAnsweredCorrectly) {
        return;
    }

    clickEfx.play();

    // Apply the dark transition effect to the correct answer image
    const correctImage = questions[currentQuestionIndex].images.correct;
    correctImage.classList.add('dark-transition');

    // Always display the correct image
    document.getElementById('question-container').innerHTML = '';
    document.getElementById('question-container').appendChild(correctImage);

    // Check if the selected answer is correct
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        // Increment the score and set the flag to true if the answer is correct
        score++;
        questionAnsweredCorrectly = true;

        // Display a message or effect for correct answer (optional)
        document.getElementById('score').innerText = 'Correct!';
    } else {
        // Display a message or effect for incorrect answer (optional)
        document.getElementById('score').innerText = 'Incorrect!';
    }

    // Remove the dark transition class after a short delay
    const timeoutId = setTimeout(() => {
        countTime = 15;
        correctImage.classList.remove('dark-transition');
    }, 1000); // Adjust the delay time to match the transition duration
}


// for SOUNDS
const sound = new Audio('pokemon.mp3');
const bgSong = new Audio('bgSong.mp3');
const clickEfx = new Audio('clickEffect.mp3');
const hoverEfx = new Audio('hoverSnd.mp3');
bgSong.loop = true;

sound.play();

// FOR TIMERS
function updateTimer() {
    document.getElementById('timer').innerHTML = countTime;

    // Check if the countdown time is 15 seconds (or adjust as needed)
    if (countTime === 15) {
        // Play the sound when the timer starts ticking down at 15 seconds
        sound.play();
    }
    if (countTime === 0) {
        clickEfx.play();
    }
    // Clear the existing timer interval
    clearInterval(timerInterval);

    timerInterval = setInterval(function () {
        if (countTime <= 0) {
            document.getElementById('timer').innerHTML = 'Time is up!';
            clearInterval(timerInterval); // Stop the timer interval
            // Automatically trigger the "Next" button click event
            document.getElementById('nextBtn').click();
        } else {
            // Decrement the countdown time
            countTime--;
            document.getElementById('timer').innerHTML = countTime;

            // Check if the countdown time is reset to 15 seconds
            if (countTime === 15) {
                console.log('Playing sound...');
                sound.play().catch(error => console.error('Error playing sound:', error));
            }
        }
    }, 1000);
}

document.getElementById('score').innerText = `SCORE: ${score}/${questions.length}`;
// Call the updateTimer function to start the countdown and play the sound
updateTimer();

// Play the background music
document.getElementById('bgMusic').addEventListener('click', function() {
    bgSong.play();
});