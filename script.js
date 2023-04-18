const $photo = document.getElementById('photo')
const $form = document.getElementById('form')
const $date = document.getElementById('date')
const $favourites = document.getElementById('favourites')
const $tofavourites = document.getElementById('tofavourites')
const $image = document.getElementById('image')
const $mainContainer = document.querySelector('.main-container')
let json = null

const ls = localStorage.getItem('logs')
const logs = ls ? JSON.parse(ls) : []
renderHistory(logs)

function createLog (json) {
  const $el = document.createElement('div')
  $el.classList.add('list-group-item')
  if (json) {
    $el.innerHTML = `<img src=${json.url}><span>${json.title}</span><span>${json.date}</span>`
  } else {
    $el.innerHTML = '<span>JSON data is missing or undefined</span>'
  }
  const $delete = document.createElement('button')
  $delete.textContent = 'Delete'
  $delete.classList.add('delete-btn')
  $delete.addEventListener('click', function () {
    const index = logs.indexOf(json)
    logs.splice(index, 1)
    saveHistory(logs)
    renderHistory(logs)
  })
  $el.appendChild($delete)
  return $el
}

function renderHistory (logs) {
  $favourites.innerHTML = ''
  logs.forEach(log => {
    $favourites.appendChild(createLog(log))
  })
}

function saveHistory (logs) {
  localStorage.setItem('logs', JSON.stringify(logs))
}

$form.addEventListener('submit', async function (e) {
  e.preventDefault()
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=Vkf8rBFWzLYFQZDGiepTqq7S0DbIWtiXw5CeLBdO&date=${$date.value}`)
  json = await response.json()
  console.log(json)
  $photo.innerHTML = `<img class='photo-hdurl' src=${json.url}><h1>${json.title}</h2><span>${json.date}</span><span class='explanation'>${json.explanation}</span>`
})

$tofavourites.addEventListener('click', function (e) {
  e.preventDefault()
  const latestLog = json
  logs.unshift(latestLog)
  saveHistory(logs)
  renderHistory(logs)
})

$photo.addEventListener('click', function (e) {
  if (e.target.classList.contains('photo-hdurl')) {
    const img = document.createElement('img')
    img.src = json.hdurl
    $image.append(img)
    $image.style.display = 'block'
  }
})

$image.addEventListener('click', function () {
  $image.textContent = ''
  $image.style.display = 'none'
})
