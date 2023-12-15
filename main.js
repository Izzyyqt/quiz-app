let countTime = 15;
let timerInterval;
let score = 0;
let questionAnsweredCorrectly = false;
let answerSelected = false;

// for SOUNDS
const sound = new Audio('pokemon.mp3');
const bgSong = new Audio('bgSong.mp3');
const clickEfx = new Audio('clickEffect.mp3');
const hoverEfx = new Audio('hoverSnd.mp3');
const incorrectSnd = new Audio('wrong.mp3');
bgSong.loop = true;

function createImage(src, callback) {
    let img = new Image();
    img.style.width = '400px';
    img.style.height = '350px';
    img.style.borderRadius = '30px';
    img.style.transition = 'height 0.3s ease-in-out, width 0.3s ease-in-out, border-radius 0.5s ease-in-out';

    img.onload = function () {
        callback(img);
    };

    img.src = src;

    img.addEventListener('mouseover', function () {
        img.style.width = '470px';
        img.style.height = '360px';
        img.style.borderRadius = '10px';
    });
    img.addEventListener('mouseout', function () {
        img.style.width = '400px';
        img.style.height = '350px';
        img.style.borderRadius = '30px';
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
        options: ['Pikachu', 'Jigglypuff', 'Voltrobe', 'Electrode', 'Snorlax'],
        correctAnswer: 'Jigglypuff'
    },
    {
        images: {
            question: createImage('q6image.png'),
            correct: createImage('q6image-correct.png')
        },
        options: ['Mewtwo', 'Dragonite', 'Lapras', "Pikachu", 'Charizard'],
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

document.getElementById('nextBtn').addEventListener('click', function () {
    // Clear the existing timer interval
    clearInterval(timerInterval);
    // Check if there are more questions
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        initializeQuestion(questions[currentQuestionIndex]);

        // Reset the timer to 15 seconds
        countTime = 15;

        // Reset the questionAnsweredCorrectly and answerSelected flags
        questionAnsweredCorrectly = false;
        answerSelected = false;

        // Call the updateTimer function again to restart the countdown
        updateTimer();

        // Update the score display
        document.getElementById('score').innerText = `SCORE: ${score}/${questions.length}`;
        document.getElementById('wtp').innerText = `Who's that Pokemon?!`
    } else {
        // Quiz is complete, change the button to restart
        document.getElementById('nextBtn').innerText = 'Restart';
        document.getElementById('nextBtn').addEventListener('click', restartQuiz);

        // Remove the buttons from quiz-container
        document.getElementById('wtp').style.display = 'none';
        for (let i = 0; i <= 4; i++) {
            document.getElementById('choice' + String.fromCharCode(65 + i)).style.display = 'none';
        }

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

// RESTART GAME
function restartQuiz() {
    // Remove the existing event listener
    document.getElementById('nextBtn').removeEventListener('click', restartQuiz);

    // Reset variables and start the quiz again
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}/${questions.length}`;
    countTime = 15; // Reset the timer to 15 seconds
    document.getElementById('nextBtn').innerText = 'Next';
    initializeQuestion(questions[currentQuestionIndex]);
    updateTimer();
    document.getElementById('wtp').style.display = 'block';
    for (let i = 0; i <= 4; i++) {
        document.getElementById('choice' + String.fromCharCode(65 + i)).style.display = 'block';
    }
    document.getElementById('timer').style.display = 'block';
    document.getElementById('score').style.display = 'block';
}

// Initialize the question
function initializeQuestion(question) {
    // Reset the variable for the new question
    questionAnsweredCorrectly = false;
    answerSelected = false; // Reset the answer selection flag

    document.getElementById('question-container').innerHTML = '';
    document.getElementById('question-container').appendChild(question.images.question);

    for (let i = 0; i <= 4; i++) {
        const choiceId = 'choice' + String.fromCharCode(65 + i);
        const optionValue = question.options[i]; // Capture the current value

        // Remove the previous event listener
        document.getElementById(choiceId).removeEventListener('click', clickChoice);

        document.getElementById(choiceId).innerText = optionValue;

        // Add a new event listener
        document.getElementById(choiceId).addEventListener('click', clickChoice);
    }

    // Update button values for the next question
    if (currentQuestionIndex < questions.length - 1) {
        document.getElementById('nextBtn').innerText = 'Next Guess';
    } else {
        document.getElementById('nextBtn').innerText = 'Finish';
    }
}

function clickChoice() {
    if (!answerSelected) { // Check if the answer has not been selected
        const optionValue = this.innerText; // Get the selected option text
        checkAnswer(optionValue); // Pass the selected option text to checkAnswer
    }
}

initializeQuestion(questions[currentQuestionIndex]);

function checkAnswer(selectedAnswer) {
    // Check if the question has already been answered correctly or an answer is already selected
    if (questionAnsweredCorrectly || answerSelected) {
        return;
    }

    // Set the flag to indicate that an answer has been selected
    answerSelected = true;

    // Apply the dark transition effect to the correct answer image
    const correctImage = questions[currentQuestionIndex].images.correct;
    correctImage.classList.add('dark-transition');

    // Always display the correct image
    document.getElementById('question-container').innerHTML = '';
    document.getElementById('question-container').appendChild(correctImage);

    // Check if the selected answer is correct
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        score++;
        questionAnsweredCorrectly = true;
        // Display a message or effect for correct answer (optional)
        document.getElementById('score').innerText = 'Correct!';
        clickEfx.play();
    } else {
        // Display a message or effect for incorrect answer (optional)
        document.getElementById('score').innerText = 'Incorrect!';
        incorrectSnd.play();
    }
    document.getElementById('wtp').innerText = `It's ${questions[currentQuestionIndex].correctAnswer}!`;
    // CHINECHECK KO LANG SA CONSOLE KUNG TAMA YUNG SELECTED ANSWER KO AT SA CORRECT ANSWER
    console.log('Selected Answer:', selectedAnswer);
    console.log('Correct Answer:', questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctAnswer]);
}

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
// Call the updateTimer function to start the countdown
updateTimer();

// Play the background music
document.getElementById('bgMusic').addEventListener('click', function() {
    bgSong.play();
});