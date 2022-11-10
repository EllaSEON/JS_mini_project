//전역변수

//변하지 않는 값으로 time을 셋팅한다.
//나중에 GAME_TIME 값만 바꾸면 알아서 time에는 GAME_TIME이 들어가기때문에
const GAME_TIME = 10;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let words = [];

//버튼을 클릭해서 run()을 실행시켰을때 게임시작이면 setInterval 
//게임종료이면 clearInterval 
let timeInterval;

//게임이 시작이되면 checkInterval
let checkInterval;

const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector('.button');


//사용하는 변수들을 화면이 렌더링 되었을때 바로 해주는게 좋다.
//init()메서드 만들고, 처음 초기값으로 셋팅할거를 넣어주면 편리할듯

init();

function init(){
  // 게임시작 
  buttonChange('게임중')
  //init을 하게되면 display상 단어들을 불러올것
  getWords();
  wordInput.addEventListener('input',checkMatch)
}

//버튼을 클릭하면 run()실행해주삼~
function run(){
  // isplaying이 true이면 아래함수를 종료시켜서 버튼을 클릭할수 없게 만들자
  if(isPlaying){
    return;
  }
  isPlaying = true;
  // 시간초기화
  time=GAME_TIME;
  // input창에 focus 가게해주삼
  wordInput.focus();
  //점수값 초기화
  scoreDisplay.innerText = 0;
 //버튼 클릭하면 1초마다 countDown함수 실행시켜줘
 timeInterval = setInterval(countDown,1000);
// 50마이크로마다 상태를 체크하도록 만들어주자
 checkInterval = setInterval(checkStatus,50);
 buttonChange('게임중')
}

//게임이 실시간으로 실행중인지 아닌지 체크하는 메서드 만들기
function checkStatus(){
  //게임중이아니고, 시간이 0초라면
  if(!isPlaying&&time===0){
    buttonChange("게임시작")
    clearInterval(checkInterval)
  }
}


//배열에 선언해서 하드코딩으로 단어들을 불러오자.
//나중에 단어 API를 통해서 랜덤한 단어를 사이트에서 받아오자
// function getWords(){
//   words = ['Hello','Banana','Apple','Cherry'];
//   buttonChange("게임시작");
// }


//AXIOS 라이브러리로 getWords API불러오자
function getWords(){
  axios.get('https://random-word-api.herokuapp.com/word?number=100')
  .then(function (response) {

    //API에 단어가 100개니까 단어를 걸러주자, 반복문을 돌리자
    response.data.forEach((word)=>{
      if(word.length<10){
        words.push(word);
      }
    })
    // 받아온 전체 데이터 response 중 data값만 보이게 할거야
    // words = response.data;
    // console.log(response);
    buttonChange('게임시작')
  })
  .catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
}


//단어일치체크
function checkMatch(){
    // input창의 값이랑 화면의 글자가 같으면 score 점수 올려줘
    // innerHTML이 아니라 innerText를 쓰는 이유는 innerHTML을 쓰면 html내부의 공백까지 가져오는데 innerText를 쓰면 글자만 가져와서
    //소문자 VS 소문자끼리 비교하고 싶을 때는 toLowerCase()메서드 쓰자
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
      // 꼼수로 점수 획득하는 걸 막기위해 input창 초기화
      wordInput.value = "";
      // 게임중이 아니면(false) 점수를 올려주면 안되니까 그대로 return해서 함수 종료
      if(!isPlaying){
        return
      }
      score++;
      // 브라우저에 score 점수 바꿔줘
      scoreDisplay.innerText = score;
      //wordDisplay에 랜덤한 단어가 나오도록 랜덤함수가 나오게 해줘야해
      const randomIndex = Math.floor(Math.random()*words.length)
      wordDisplay.innerText = words[randomIndex];
    }
}

//countDown함수를 1초마다 실행시켜주는 interval만들기
// setInterval(countDown,1000);
// buttonChange("게임종료")



//버튼을 눌렀을 때, 시간이 카운트다운을 할수있도록 만들자
function countDown(){
  // time이 0보다 클경우 1초 감소, 안그럴 경우 게임이 종료가 됬다는 걸 알려주자
  time > 0 ? time-- : isPlaying = false;
  //만약에 isPlaying이 false가 되면(느낌표를 붙여서 true로 만들어줘야 아래가 실행되니까) 아래 시간이 가는걸 멈춰줘
  if(!isPlaying){
    clearInterval(timeInterval);
  }
  timeDisplay.innerText = time;
}

//버튼을 눌렀을때 loading 클래스를 사라지게 하는 함수만들기
function buttonChange(text){
  button.innerText = text;
  //게임시작 텍스트가 들어오면 loading클래스 없애줘
  text ==='게임시작'? button.classList.remove('loading') : button.classList.add('loading');
}
