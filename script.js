let questions = [
    {
        "question": "Wie viele Stunden pro Tag verbringen Pandabären normalerweise mit Fressen?",
        "answer_1": "4 Stunden",
        "answer_2": "6 Stunden",
        "answer_3": "10 Stunden",
        "answer_4": "12 Stunden",
        "right_answer": 3
    },
    {
        "question": "Wie viele Pandabären gibt es ungefähr noch in freier Wildbahn?",
        "answer_1": "Weniger als 1000",
        "answer_2": "Zwischen 1000 und 2000",
        "answer_3": "Zwischen 2000 und 3000",
        "answer_4": "Mehr als 3000",
        "right_answer": 2
    },
    {
        "question": "Was ist die Hauptnahrung von Pandabären?",
        "answer_1": "Fleisch",
        "answer_2": "Bambus",
        "answer_3": "Früchte",
        "answer_4": "Gras",
        "right_answer": 2
    },
    {
        "question": "In welchem Land sind Pandabären heimisch?",
        "answer_1": "China",
        "answer_2": "Indien",
        "answer_3": "Australien",
        "answer_4": "Südafrika",
        "right_answer": 1
    },
    {
        "question": "Welche Farbe haben die Baby von Pandabären bei der Geburt?",
        "answer_1": "Schwarz",
        "answer_2": "Weiß",
        "answer_3": "Grau",
        "answer_4": "Rosa",
        "right_answer": 4
    },
    {
        "question": "Wie Alt können Pandabären in freier Wildbahn ungefähr werden?",
        "answer_1": "10 Jahre",
        "answer_2": "20 Jahre",
        "answer_3": "30 Jahre",
        "answer_4": "40 Jahre",
        "right_answer": 3
    },
    {
        "question": "Warum sind Pandabären gefährdet?",
        "answer_1": "Klimawandel",
        "answer_2": "Lebensraumverlust",
        "answer_3": "Wilderei",
        "answer_4": "Alle oben genannten Antworten",
        "right_answer": 4
    },
];


let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio ('audio/success.mp3');
let AUDIO_FAIL = new Audio ('audio/fail.mp3');  


function startQuiz() {
    document.getElementById("headline").classList.add('none');
    document.getElementById('startButton').classList.add('none');
    document.getElementById('question_container').classList.remove('none');
    showQuestion();
}


function showQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById('question_container').classList.add('none');
        document.getElementById('endScreen').style = '';
        document.getElementById('questionNumber').innerHTML = questions.length;
        document.getElementById('amount-of-questions').innerHTML = rightQuestions;
    } else { // show question

        let percent = currentQuestion / questions.length;
        percent = Math.round(percent * 100);
        document.getElementById('progress-bar').innerHTML = `${percent} %`;
        document.getElementById('progress-bar').style = `width: ${percent}%;`;

        let question = questions[currentQuestion];
        document.getElementById('questiontext').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
    }
}


function answer(selection) {
    let question = questions[currentQuestion]; //zeigt Element aus dem JSON Array ander Stelle null, da currentQustion = 0 weiter oben so definiert wurde
    console.log('selected answer is', selection); // in Console bei angeklickter Antwort 2: 'selceted answer is 2' da der parameter ('answer_2') übergeben wurde, hier nur einfach selection genannt wird

    let selectedQuestionNumber = selection.slice(-1); //der letzte Charakter(Zahl/Buchstabe) des übergebenen Parameter 'answer_2' (heißt hier einfache selection) wird abgefragt
    console.log('selectedQuestionNumber is', selectedQuestionNumber); //Console:selectedQuestionNumber is der letzte Charakter des übergebenen Parameter 'answer_2', sprich "2" wird ausgegeben

    console.log('current question is', question['right_answer']); // Console gibt den Wert aus, aus dem JSON Array an der Stelle (in diesem Fall der Stelle) 0 von 'right_answer' aus, in diesem Fall die "3"

    //Vergleich ob der letzte Charakter des übergebenen Parameters 'answer_2' mit der 'right_answer': 3, übereinstimmt

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) { //wenn beide Zahlen gleich sind...
        console.log('Richtige Antwort!'); //... dann erscheint in der Console "Richtige Antwort"...
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else { //... wenn sie nicht gleich sind...
        console.log('Falsche Antwort!'); //... dann erscheint in der Console "Falsche Antwort!"
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('nestQuestion').disabled = false;
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('nestQuestion').disabled = true;
    resetAnswers();
    showQuestion();
}

function resetAnswers() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartGame() {
    rightQuestions = 0;
    currentQuestion = 0;
    document.getElementById('endScreen').classList.add('none');
    document.getElementById('question_container').classList.remove('none');
    showQuestion();
}