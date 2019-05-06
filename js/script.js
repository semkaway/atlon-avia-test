
let start = document.getElementById('buttonStart')
let pause = document.getElementById('buttonPause')
let lap = document.getElementById('buttonLap')
let reset = document.getElementById('buttonReset')
let displayTime = document.getElementById('displayTime')
let running = false
let time = 0
let offset
let timer

// console.log("displayTime: ", displayTime.innerHTML)

function updateTime() {
    time += timePassed()
    let formatTime = formattedTime(time)
    displayTime.textContent = formatTime
}

function timePassed() {
    let now = Date.now()
    let difference = now - offset
    offset = now
    return difference
}

function formattedTime(inputTime) {
    let newTime = new Date(inputTime)
    let minutes = newTime.getMinutes().toString()
    let seconds = newTime.getSeconds().toString()
    let milliseconds = newTime.getMilliseconds().toString()

    if (minutes.length < 2) {
        minutes = "0" + minutes
    }

    if (seconds.length < 2) {
        seconds = "0" + seconds
    }

    while (milliseconds.length < 3) {
        milliseconds = "0" + milliseconds
    }

    return `${minutes}:${seconds}:${milliseconds}`
}

function startCount() {
    if (!running) {
        console.log("Start!!")
        offset = Date.now()
        running = true
        timer = setInterval(updateTime, 10)
    }
}

function pauseCount() {
    console.log("Pause!!")
    running = false
    clearInterval(timer)
}

function addLap() {
    console.log("Lap!!")
}

function resetCount() {
    console.log("Stop!!")
    running = false
    time = 0
    clearInterval(timer)
}

start.addEventListener('click', startCount)
pause.addEventListener('click', pauseCount)
lap.addEventListener('click', addLap)
reset.addEventListener('click', resetCount)
