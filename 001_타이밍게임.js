//사용변수
const GAME_TIME = 3;
let score = 0; //점수는 변경이 일어나는 변수라서 let으로 선언
let time = GAME_TIME; //time은 기본 9초로 설정
let isPlaying = false;
let timeInterval; 
let words =[];

const wordInput = document.querySelector('.word-input') //input값 가져오자
const wordDisplay = document.querySelector('.word-display')
const scoreDisplay = document.querySelector('.score')
const timeDisplay  = document.querySelector('.time')
const button = document.querySelector('.button')


//사용하는 변수들을 화면에 렌더링 되었을때 바로 선언을 하자
// init을 사용하면, Hello글씨를 불러올것

init();

function init(){
  getWords()
  wordInput.addEventListener('input',checkMatch);
}

//버튼 누르면 게임 실행
function run(){
  isPlaying = true;
  time=GAME_TIME;
  //버튼을 누르면, 인풋창에 포커스가 가게 하기
  wordInput.focus()
  scoreDisplay.innerText= 0;
  timeInterval = setInterval(countDown,1000);
  checkInterval = setInterval(checkStatus,50)
  buttonChange("게임중")
}

function checkStatus(){
  if(!isPlaying&&time===0){
    buttonChange("게임종료...")
    clearInterval(checkInterval)
  }
}

//단어불러오기
function getWords(){
  words = ["Hello","Banana","Apple","Cherry"]
  buttonChange("게임시작")
}

//단어일치체크
function checkMatch(){
  if(wordInput.value.toLowerCase()===wordDisplay.innerText.toLowerCase()){
      //input창 초기화, score점수가 계속 올라가는 걸 막기위해
        wordInput.value = "";
        //게임중이 아닌데, 작성을 하게되면, 점수를 올려주면 안되고, return을 시켜야함
        //return을 쓰면 밑에있는 score++ 와 같이 작동이 안됨
        if(!isPlaying){
          return
        }
        score++
        scoreDisplay.innerText = score;
        //랜덤함수를 만들어서, 랜덤한 인덱스로 단어들을 랜덤하게 나오도록 만들고, wordDisplay 업데이트하게 만들어줌
        //배열 길이만큼 곱하기를 해주게 되면 랜덤한 수가 나오게됨
        //Math.random()은 0~1 구간 부동소수점 난수 생성
        const randomIndex = Math.floor(Math.random()*words.length);
        wordDisplay.innerText = words[randomIndex]
        
        
      }
}

// wordInput.addEventListener('input',()=>{
//   if(wordInput.value.toLowerCase()===wordDisplay.innerText.toLowerCase()){
//     score++
//     scoreDisplay.innerText = score;
//     //input창 초기화, score점수가 계속 올라가는 걸 막기위해
//     wordInput.value = "";
//   }
// })

function checkMatch(){
  if(!isPlaying && time ===0){
    buttonChange("게임종료")
    clearInterval(checkInterval)
  }
}

//함수를 매초마다 실행시켜주는 setInterval만들기
function countDown(){
  //시간이 0초 이상일 경우 1초를 빼주고, 아닐경우 isPlaying을 false로 해줘
  time>0 ? time--:isPlaying = false;
  if(!isPlaying){
    clearInterval(timeInterval)
  }
  //시간을 화면에 보여주기
  timeDisplay.innerText =time;
  // console.log(time)
}

function buttonChange(text){
  button.innerText = text;
  text === "게임시작" ? button.classList.remove('loading') : button.classList.add('loading')

}