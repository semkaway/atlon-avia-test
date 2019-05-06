
let start = document.getElementById('buttonStart')
let pause = document.getElementById('buttonPause')
let lap = document.getElementById('buttonLap')
let reset = document.getElementById('buttonReset')
let displayTime = document.getElementById('displayTime')
let resultsTable = document.getElementById('resultsTable')
let running = false
let time = 0
let lapNumber = 0
let lapTime
let offset
let timer

function updateTime() {
    time += timePassed()
    let formatTime = formattedTime(time)
    displayTime.textContent = formatTime
    return time
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
        offset = Date.now()
        lapTime = updateTime()
        console.log("start: ", formattedTime(lapTime))
        running = true
        lap.disabled = false
        timer = setInterval(updateTime, 10)
    }
}

function pauseCount() {
    running = false
    lap.disabled = true
    addLap()
    clearInterval(timer)
}

function addLap() {
    lapNumber++
    let now = updateTime()
    console.log(`now: ${formattedTime(now)} laptime: ${formattedTime(lapTime)}`)
    let newLap = now - lapTime
    lapTime = now
    console.log("new laptime: ", formattedTime(lapTime))
    resultsTable.innerHTML += `<tr><td>Круг ${lapNumber}</td><td>${formattedTime(now)}</td><td>${formattedTime(newLap)}</td></tr>`
}

function resetCount() {
    running = false
    lap.disabled = true
    addLap()
    time = 0
    lapNumber = 0
    displayTime.textContent = "00:00:000"
    clearInterval(timer)
    resultsTable.innerHTML += `<tr class="divider"><td></td><td></td><td></td></tr>`
}

start.addEventListener('click', startCount)
pause.addEventListener('click', pauseCount)
lap.addEventListener('click', addLap)
reset.addEventListener('click', resetCount)
