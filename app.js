// let images = []
let start = document.getElementById('start')
let level
let rightans = 0
let sameWord = 1
let selectedImg = []
let quesCount = 1
let wordcount = 1
let checkimg = []
let anim = document.getElementById('anim')
let n = 1
let full = document.getElementById('full')
let display = document.getElementById('display')
function displayArray() {
  console.log('FULL ARRAY')
  display.innerHTML = ''
  // images = []
  let imgs
  for (let i = 1; i <= 20; i++) {
    imgs = 'images/super-0' + i + '.png'
    if (i > 9) {
      imgs = 'images/super-' + i + '.png'
    }
    let image = document.createElement('img')
    image.setAttribute('id', 'square')
    image.setAttribute('src', imgs)
    // images.push(imgs)
    full.appendChild(image)
  }
  checkEquals()
}
function displayImage() {
  document.getElementById('start').style.display = 'none'
  document.body.style.backgroundImage = "url('./Nature.jpg')"
  let imgs
  level = 1
  n++
  full.innerHTML = ''
  console.log(selectedImg.length)
  if (n > 3) {
    return
  } else
    for (let i = 0; i < n; i++) {
      let rand = Math.ceil(Math.random() * 20)
      if (rand < 10) {
        imgs = 'images/super-0' + rand + '.png'
      } else {
        imgs = 'images/super-' + rand + '.png'
      }
      console.log(imgs)
      let image = document.createElement('img')
      image.setAttribute('src', imgs)
      selectedImg.push(imgs)
      display.appendChild(image)
    }
  console.log('Images displayed in this level' + selectedImg)
  setTimeout(displayArray, 2000)
}

function checkEquals() {
  let imagesview = document.querySelectorAll('img')
  imagesview.forEach((image) => {
    //Looping through images
    image.addEventListener('click', (e) => {
      image.classList.add('highlight')
      // checkimg.push(image.src.substring(image.src.indexOf('/') + 17)) //adding selected images into an array
      console.log(image.src)
      checkimg.push(
        image.src.substring(image.src.length - 19, image.src.length),
      )
      console.log('Total pushed images' + checkimg)
    })
  })
}
function check() {
  if (level == 1) {
    let x = compare(selectedImg, checkimg) //comparing the random images with the selected one
    if (x == true) {
      // anim.classList.add('.active')
      displayImage()
      console.log('Images are same')
    } else {
      levelFail() //Caught by Sniper
    }
    if (n > 3) {
      anim.classList.add('active')
      setTimeout(quizCheck, 2000) //Once level is cleared, routing  to next level
    } else return
  }
  if (level == 2) {
    if (rightans >= 2) {
      console.log('Level 2 completed')
      anim.classList.add('active')
      spellCheck()
      return
    } else {
      levelFail()
    }
  }

  // console.log('check function')
}

function compare(arr1, arr2) {
  console.log('Comparing arr1 and arr2')
  let count = 0
  for (let i = 0; i < arr1.length && arr2.length; i++) {
    if (arr1[i] == arr2[i]) count++
  }
  if (count == arr1.length) {
    return true
  }
}
//LEVEL 2
function quizCheck() {
  document.body.style.backgroundImage = "url('./dora-quiz.jpg')"
  anim.classList.remove('active')
  let q = Math.ceil(Math.random() * 10)
  // console.log('Welcome to LEVEL 2')
  // document.getElementById('full').innerHTML = 'Welcome to Level 2'
  axios
    .get('https://opentdb.com/api.php?amount=10&category=19&difficulty=easy')
    .then((res) => {
      console.log(res.data.results[q].question)
      // document.getElementById('full').innerHTML += res.data.results[1].question
      let values = res.data.results[q].incorrect_answers
      values.push(res.data.results[q].correct_answer)
      console.log(values)
      var select = document.createElement('select')
      select.name = 'answers'
      select.id = 'answers'

      for (const val of values) {
        var option = document.createElement('option')
        option.value = val
        option.text = val.charAt(0).toUpperCase() + val.slice(1)
        select.appendChild(option)
      }

      var label = document.createElement('h1')
      label.innerHTML = res.data.results[q].question
      quesCount++
      label.htmlFor = 'questions'
      document.getElementById('quiz').appendChild(label).appendChild(select)
      checkAnswer(res.data.results[q].correct_answer)
    })
}
function checkAnswer(correctanswer) {
  console.log(correctanswer)
  let answers = document.querySelectorAll('select')
  console.log('checking answers for quiz')
  answers.forEach((answer) => {
    console.log(answer)
    // answer.onchange('')
    answer.addEventListener('change', (e) => {
      console.log('ANSWERS')
      console.log(answer.value)
      if (answer.value == correctanswer) {
        console.log("It's Correct answer")
        rightans++
      }
      if (quesCount <= 3) quizCheck()
      else {
        level = 2
        return
      }
      document.getElementById('full').innerHTML = 'Level 2 completed'
    })
  })
}

//LEVEL 3
function spellCheck() {
  document.getElementById('full').innerHTML = ''
  document.body.style.backgroundImage = "url('./pexels-pixabay-259915.jpg')"
  anim.classList.remove('active')
  document.getElementById('quiz').innerHTML =
    'Welcome to Level 3..... Find the correct word for the scrambled word displayd here.. A clue for you-  They are friends of Dora'
  level = 3

  var WORDS = ['Diego', 'Benny', 'Tico', 'Backpack']
  var SCRAMBLED = ['egiod', 'ynenb', 'oict', 'pbakckca']

  var randomNumber = Math.floor(Math.random() * WORDS.length)
  var randomWord = SCRAMBLED[randomNumber]
  let words = document.getElementById('words')
  words.innerHTML = randomWord

  wordcount++
  var input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('id', 'ans')
  let button = document.createElement('button')
  button.innerHTML = 'Check'
  full.appendChild(input)
  full.appendChild(button)

  button.onclick = function () {
    let inputVal = document.getElementById('ans').value
    // let inputVal = input.value
    console.log(inputVal)
    if (inputVal == WORDS[randomNumber]) {
      console.log('Great job!')
      sameWord++
    } else {
      console.log(
        'Sorry you were incorrect. The answer is: ' +
          '\n \t \t' +
          WORDS[randomNumber],
      )
    }
    if (wordcount < 5) spellCheck()
    else {
      if (sameWord >= 3) {
        console.log('Level 3 completed')
        document.getElementById('quiz').innerHTML =
          'Hurray....!! We reached Home .... Thank you friends for helping me all along the way'
        anim.classList.add('active')
        document.body.style.backgroundImage = "url('./Dora-final.jpg')"
        return
      } else {
        levelFail()
      }
      // anim.classList.remove('active')
    }
  }
}
//
function levelFail() {
  let doraimg = document.getElementById('dora')
  doraimg.setAttribute('src', '')
  // let img = './dora-caught.png'
  document.getElementById('full').innerHTML = ''
  document.getElementById('quiz').innerHTML = ''
  document.getElementById('words').innerHTML = ''
  document.getElementById('button').style.display = 'none'
  document.body.style.backgroundImage = "url('./dora-caught.png')"
}
