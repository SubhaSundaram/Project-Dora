// let images = []
let selectedImg = []
let checkimg = []
let anim = document.getElementsByClassName('.anim')
let anime = anim[0]
let n = 1
let full = document.getElementById('full')
let display = document.getElementById('display')
function displayArray() {
  console.log('FULL ARRAY')
  display.innerHTML = ''
  // images = []
  for (let i = 1; i <= 20; i++) {
    let imgs = 'images/super-' + i + '.png'
    let image = document.createElement('img')
    image.setAttribute('id', 'square')
    image.setAttribute('src', imgs)
    // images.push(imgs)
    full.appendChild(image)
  }
  checkEquals()
}
function displayImage() {
  n++
  full.innerHTML = ''
  console.log(selectedImg.length)

  // while (selectedImg.length > 0) {
  //   console.log('Popping image out')
  //   selectedImg.pop()
  // }
  if (n > 3) quizCheck()
  else {
    for (let i = 0; i < n; i++) {
      let rand = Math.ceil(Math.random() * 20)
      let imgs = 'images/super-' + rand + '.png'
      console.log(imgs)
      let image = document.createElement('img')
      image.setAttribute('src', imgs)
      selectedImg.push(imgs)
      display.appendChild(image)
    }
    console.log(selectedImg)
    setTimeout(displayArray, 2000)
  }
}
function checkEquals() {
  let imagesview = document.querySelectorAll('img')
  imagesview.forEach((image) => {
    //Looping through images
    image.addEventListener('click', (e) => {
      checkimg.push(image.src.substring(image.src.indexOf('/') + 17))
      // checkimg.push(image.src.split('/')[(3, 4)])
      console.log('Selected image by event ' + checkimg)
    })
  })
}
function check() {
  console.log('check function')
  let x = compare(selectedImg, checkimg)
  if (x == true) {
    // anime.classList.add('.dora')
    displayImage()
    console.log('Images are same')
  } else {
    console.log('FALSE')
    let fail = document.createElement('img')
    let img = './dora-caught.png'
    fail.setAttribute('src', img)
    display.appendChild(fail)
  }
}

function compare(arr1, arr2) {
  let count = 0
  // arr1.forEach((e1) =>
  //   arr2.forEach((e2) => {
  //     if (e1 === e2) return true
  //   }),
  // )
  for (let i = 0; i < arr1.length && arr2.length; i++) {
    if (arr1[i] == arr2[i]) count++
  }
  if (count == 2) return true
}

function quizCheck() {
  console.log('Welcome to LEVEL 2')
  document.getElementById('full').innerHTML = 'Welcome to Level 2'
  axios
    .get('https://opentdb.com/api.php?amount=10&category=19&difficulty=easy')
    .then((res) => {
      console.log(res.data.results[1].question)
      document.getElementById('full').innerHTML += res.data.results[1].question
      // let array = res.data.results[1].incorrect_answers
      // array.push(res.data.results[1].correct_answer)
      // for (let i = 0; i < array.length; i++) {
      //   document.getElementById('full').innerHTML += array[i]
      // }
    })
}
