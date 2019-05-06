
let start = document.getElementById('buttonStart')
let pause = document.getElementById('buttonPause')
let lap = document.getElementById('buttonLap')
let reset = document.getElementById('buttonReset')
let seconds = 0
let running = false
let timer

function addSeconds() {
    console.log("running", running)
    // if (running) {
    //     setInterval(function(){seconds++}, 100)
    // }
    console.log(seconds++)
}

function startCount() {
    if (!running) {
        console.log("Start!!")
        running = true
        timer = setInterval(addSeconds, 1000)
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
    seconds = 0
    clearInterval(timer)
}

start.addEventListener('click', startCount)
pause.addEventListener('click', pauseCount)
lap.addEventListener('click', addLap)
reset.addEventListener('click', resetCount)
