
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

function disableButtons() {
    lap.disabled = true
    pause.disabled = true
    reset.disabled = true
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
        running = true
        lap.disabled = false
        pause.disabled = false
        reset.disabled = false
        timer = setInterval(updateTime, 10)
    }
}

function pauseCount() {
    running = false
    resultsTable.style.display = "block"
    disableButtons()
    addLap()
    clearInterval(timer)
}

function addLap() {
    lapNumber++
    let now = updateTime()
    let newLap = now - lapTime
    lapTime = now
    resultsTable.innerHTML += `<tr><td class="table__tableData">Круг ${lapNumber}</td><td class="table__tableData">${formattedTime(now)}</td><td class="table__tableData">${formattedTime(newLap)}</td></tr>`
    resultsTable.style.display = "block"
}

function resetCount() {
    running = false
    disableButtons()
    addLap()
    time = 0
    lapNumber = 0
    displayTime.textContent = "00:00:000"
    clearInterval(timer)
    resultsTable.innerHTML += `<tr class="table__divider"><td></td><td></td><td></td></tr>`
    resultsTable.style.display = "block"
}

start.addEventListener('click', startCount)
pause.addEventListener('click', pauseCount)
lap.addEventListener('click', addLap)
reset.addEventListener('click', resetCount)
