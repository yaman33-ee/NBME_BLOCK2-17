//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 396000;
let countdown;

//Questions and Options array

 var quizArray=[]
for (let i = 54; i < 104; i++) {
    quizArray.push({
      id:i,
      questionImage: "questions/Slide"+i+".PNG",
      options:["A","B","C","D","E","F"],

    })
}


//console.log(quizArray)


//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    nextBtn.classList="hide";
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      window.location.href = "table-01/results.html";
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 30600;
      
      //timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  let myTimer;
  myTimer = setInterval(myClock, 1000);
  var c = 3610; //Initially set to 1 hour


  function myClock() {
      --c
      var seconds = c % 60; // Seconds that cannot be written in minutes
      var secondsInMinutes = (c - seconds) / 60; // Gives the seconds that COULD be given in minutes
      var minutes = secondsInMinutes % 60; // Minutes that cannot be written in hours
      var hours = (secondsInMinutes - minutes) / 60;
      // Now in hours, minutes and seconds, you have the time you need.
     
      timeLeft.innerHTML=hours + ":" + minutes + ":" + seconds;
      if (c == 0) {
          clearInterval(myTimer);
          window.location.href = "table-01/results.html";
      }
  }
}
  

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
   //console.log(i.id)
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("img");
    question_DIV.classList.add("question");
    question_DIV.src = i.questionImage;
    question_DIV.width = "500";
    div.appendChild(question_DIV);
    
    //options
    div.innerHTML += `
    <button class="option-div"  questionid ="${i.id}"onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div"  questionid ="${i.id}" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" questionid ="${i.id}" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" questionid ="${i.id}"  onclick="checker(this)">${i.options[3]}</button>
       <button class="option-div" questionid ="${i.id}"  onclick="checker(this)">${i.options[4]}</button>
       <button class="option-div" questionid ="${i.id}"  onclick="checker(this)">${i.options[5]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  //console.log(userSolution)
  if(userSolution!="")nextBtn.classList="show";
  //console.log(userOption);
  let userOptionId=userOption.getAttribute("questionid");
  //console.log(userOptionId)
  localStorage.setItem(userOptionId, userSolution);
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  
    userOption.classList.add("correct");
    

 
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
