const colorPicker = document.getElementById('color')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')
const sizeValue = document.getElementById('sizeValue')
const sizeRange = document.getElementById('sizeRange')
const grid = document.getElementById('grid')

const DEF_COLOR  = '№333333'
const DEF_MODE = 'color'
const DEF_SIZE = '16'

let currColor = DEF_COLOR
let currMode = DEF_MODE
let currSize = DEF_SIZE

function setColor(newColor){
    currColor = newColor
}

function setMode(newMode){
    activateBtn(newMode)
    currMode = newMode
}

function setSize(newSize){
    currSize = newSize
}

colorPicker.oninput = (e) => setColor(e.target.value)
colorBtn.onclick = () => setMode('color')
rainbowBtn.onclick = () => setMode('rainbow')
eraserBtn.onclick = () => setMode('eraser')
clearBtn.onclick = () => reloadGrid()
sizeRange.onmousemove = (e) => updateSizeValue(e.target.value)
sizeRange.onchange = (e) => changeSize(e.target.value)

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeSize(value){
    setSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function updateSizeValue(value){
    sizeValue.innerHTML = `${value} x ${value}`
}

function reloadGrid(){
    clearGrid()
    setupGrid(currSize)
}

function clearGrid(){
    grid.innerHTML = ''
}

function setupGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0 ; i < size * size ; i++ ){
        const gridEl = document.createElement('div');
        gridEl.classList.add('grid-el')
        gridEl.addEventListener('mouseover',changeColor)
        gridEl.addEventListener('mousedown',changeColor)
        grid.appendChild(gridEl)
    }
}

function changeColor(e){
    if(e.type === 'mouseover' && !mouseDown) return
    if(currMode === 'rainbow'){
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        const randomR = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`
    }
    else if (currMode === 'color') {
        e.target.style.backgroundColor = currColor
    } 
    else if (currMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function activateBtn(newMode){
    if(currMode ==='rainbow'){
        rainbowBtn.classList.remove('active')
    }
    else if(currMode === 'color')
        colorBtn.classList.remove('active')
    else if(currMode === 'eraser'){
        eraserBtn.classList.remove('active')
    }

    if(newMode === 'rainbow'){
        rainbowBtn.classList.add('active')
    }
    else if (newMode === 'color'){
        colorBtn.classList.add('active')
    }
    else if (newMode === 'eraser'){
        eraserBtn.classList.add('active')
    }
}

window.onload = () => {
    setupGrid(DEF_SIZE)
    activateBtn(DEF_MODE)
}