let main = document.getElementById("main")
let panel = document.getElementById("panel")
let colors = ['black', 'purple', 'white', 'green', 'red', 'turquoise']
let sleep = ms => new Promise(res => setTimeout(res, ms))
let distance = (a, b) => Math.sqrt(Math.pow((b.x-a.x), 2) + Math.pow((b.y-a.y), 2))

let mouseDown = false
let mouseButton = 1
let down = false
document.addEventListener('contextmenu', event => event.preventDefault())
document.addEventListener('mousedown', function(event) {
  mouseDown = true
  mouseButton = event.button
})
document.addEventListener('mouseup', function() {
  mouseDown = false
})

let w = 20
let h = 20
let start
let end
let grid
function createGrid() {
  main.innerHTML = ''
  grid = new Array(w)
  for (let x = 0; x < w; x++) {
    grid[x] = new Array(h)
    let col = document.createElement("DIV")
    col.setAttribute('class', 'col')
    main.appendChild(col)
    for (let y = 0; y < h; y++) {
      let cell = document.createElement("DIV")
      cell.setAttribute('class', 'cell')
      cell.setAttribute('col', x)
      cell.setAttribute('row', y)
      cell.setAttribute('tabindex', 0)
      // cell.innerHTML = `(${x}, ${y})`
      grid[x][y] = {cell: cell, state: 2, x: x, y: y, f: 0, g: 0, h: 0, previous: undefined}
      createListeners(grid[x][y])
      col.appendChild(cell)
    }
  }
  start = grid[0][0]
  end = grid[w-1][h-1]
  changeUnit(start, 3)
  changeUnit(end, 4)

  scaleGrid()
}

function scaleGrid() {
  let scale
  if (w * 2/3 > h) {
    scale = 30 / w
  }
  else if (h * 3/2 < w) {
    scale = 20 / h
  }
  else {
    scale = 20 / h
  }
  main.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

function changeState(unit, state) {
  unit.state = state
}
function changeColor(unit, state) {
  unit.cell.style.background = colors[state]
}
function changeUnit(unit, state) {
  changeState(unit, state)
  changeColor(unit, state)
}

function createListeners(unit) {
  let cell = unit.cell
  cell.onmousedown = function(event) {
    changeUnit(unit, event.button)
  }
  cell.onmouseup = function() {
    changeColor(unit, colors.length - 1)
  }
  cell.onmouseover = function(event) {
    if (mouseDown) {
      changeUnit(unit, mouseButton)
    }
    else changeColor(unit, colors.length - 1)
    cell.focus()
  }
  cell.onmouseout = function() {
    changeColor(unit, unit.state)
    cell.blur()
  }
  cell.onkeydown = function() {
    if (!down) {
      down = !down
      if (event.code == 'KeyS' || event.code == 'KeyE') {
        let state = null
        if (event.code == 'KeyS') {
          if (start != unit) {
            changeUnit(start, 2)
          }
          state = 3
          start = unit
        }
        if (event.code == 'KeyE') {
          if (end != unit) {
            changeUnit(end, 2)
          }
          state = 4
          end = unit
        }
        changeUnit(unit, state)
      }
    }
  }
  cell.onkeyup = function() {
    down = false
    changeColor(unit, colors.length - 1)
  }
}

let running = false
let generating = false
let stack = []
let diag = true
let live = true
let reset = document.createElement("BUTTON")
let run = document.createElement("BUTTON")
let random = document.createElement("BUTTON")
let depth = document.createElement("BUTTON")
let diagonals = document.createElement("BUTTON")
let liveToggle = document.createElement("BUTTON")
let speed = document.createElement("INPUT")
let width = document.createElement("INPUT")
let height = document.createElement("INPUT")
let newGrid = document.createElement("BUTTON")

reset.addEventListener("click", function() {
  if (!running && !generating) {
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        changeUnit(grid[x][y], 2)
      }
    }
    start = grid[0][0]
    end = grid[w-1][h-1]
    changeUnit(start, 3)
    changeUnit(end, 4)
  }
  else console.log('wait until finished');
})
run.addEventListener("click", function() {
  if (!running && !generating) {
    run.innerHTML = 'stop'
    running = true
    console.log('running a*');
    astar()
  }
  else running = false
})
random.addEventListener("click", function() {
  if (!running && !generating) {
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        changeUnit(grid[x][y], 2)
      }
    }
    changeUnit(start, 3)
    changeUnit(end, 4)
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        if (Math.random() < 0.3) changeUnit(grid[x][y], 0)
      }
    }
  }
  else console.log('wait until finished');
})
depth.addEventListener("click", function() {
  if (!running && !generating) {
    console.log('depth first search (backtracking)');
    // resize grid if even
    if (w % 2 == 0 || h % 2 == 0) {
      if (w % 2 == 0) {
        w++
        width.value = w
      }
      if (h % 2 == 0) {
        h++
        height.value = h
      }
      createGrid()
    }
    // make all wall
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        changeUnit(grid[x][y], 0)
      }
    }
    changeUnit(start, 2)
    generating = true
    dfs()
  }
  else console.log('wait until finished');
})
diagonals.addEventListener('click', function() {
  if (!running) {
    diag = !diag
    diagonals.innerHTML = 'diagonal: ' + (diag ? "ON" : "OFF")
  }
  else console.log('wait until finished');
})
liveToggle.addEventListener('click', function() {
  live = !live
  liveToggle.innerHTML = 'live update: ' + (live ? "ON" : "OFF")
})
newGrid.addEventListener('click', function() {
  if (!running && !generating) {
    if (parseInt(width.value)) w = width.value
    if (parseInt(height.value)) h = height.value
    createGrid()
  }
  else console.log('wait until finished');
})

reset.innerHTML = "reset"
run.innerHTML = 'run'
random.innerHTML = 'random'
depth.innerHTML = 'DFS'
diagonals.innerHTML = 'diagonal: ON'
liveToggle.innerHTML = 'live update: ON'
newGrid.innerHTML = 'new grid'
width.value = '20'
height.value = '20'

width.setAttribute('type', 'text')
height.setAttribute('type', 'text')
speed.setAttribute('type', 'range')
speed.setAttribute('max', '50')
speed.setAttribute('min', '0')
speed.setAttribute('value', '20')

async function dfs() {
  let stime = Date.now()
  let current = start
  let neighborsVisited
  let neighbors
  let x
  let y
  let intoSelf
  let intoWall

  while (generating) {
    x = current.x
    y = current.y

    do {
      neighborsVisited = 0
      neighbors = 0
      if (x - 2 >= 0) {
        if (grid[x - 2][y].state == 2) { // if left neighbor visited
          neighborsVisited++
        }
        neighbors++
      }
      if (y + 2 <= h - 1) {
        if (grid[x][y + 2].state == 2) { // if bot neighbor visited
          neighborsVisited++
        }
        neighbors++
      }
      if (x + 2 <= w - 1) {
        if (grid[x + 2][y].state == 2) { // if right neighbor visited
          neighborsVisited++
        }
        neighbors++
      }
      if (y - 2 >= 0) {
        if (grid[x][y - 2].state == 2) { // if top neighbor visited
          neighborsVisited++
        }
        neighbors++
      }
      if (neighborsVisited != neighbors) stack.push(current)
      else {
        stack.pop()
        if (stack.length > 0) {
          current = stack[stack.length-1]
          x = current.x
          y = current.y
        }
        else {
          generating = false
          changeUnit(start, 3)
          changeUnit(end, 4)
          console.log('done in ' + (Date.now() - stime) / 1000 + 'seconds');
          return;
        }
      }
    } while (neighborsVisited == neighbors)

    do {
      intoSelf = false
      intoWall = false
      dir = Math.floor(Math.random() * 4) + 1
      switch (dir) {
        case 1: // up
        if (x - 2 < 0) intoWall = true;
        else if (grid[x - 2][y].state == 2) intoSelf = true;
        break;
        case 2: // right
        if (y + 2 > h - 1) intoWall = true;
        else if (grid[x][y + 2].state == 2) intoSelf = true;
        break;
        case 3: // down
        if (x + 2 > w - 1) intoWall = true;
        else if (grid[x + 2][y].state == 2) intoSelf = true;
        break;
        case 4: // left
        if (y - 2 < 0) intoWall = true;
        else if (grid[x][y - 2].state == 2) intoSelf = true;
        break;
        default: break;
      }
    } while(intoWall || intoSelf)

    switch (dir) { // move in new direction
      case 1: // up
        changeUnit(grid[x - 2][y], 2)
        changeUnit(grid[x - 1][y], 2)
        current = grid[x - 2][y]
        break;
      case 2: // right
        changeUnit(grid[x][y + 2], 2)
        changeUnit(grid[x][y + 1], 2)
        current = grid[x][y + 2]
        break;
      case 3: // down
        changeUnit(grid[x + 2][y], 2)
        changeUnit(grid[x + 1][y], 2)
        current = grid[x + 2][y]
        break;
      case 4: // left
        changeUnit(grid[x][y - 2], 2)
        changeUnit(grid[x][y - 1], 2)
        current = grid[x][y - 2]
        break;
      default: break;
    }
    if (live) {
      changeColor(end, 4)
      changeColor(start, 3)
      await sleep(speed.value)
    }
  }
}
async function astar() {
  let stime = Date.now()
  let openSet = [start]
  let closedSet = []
  let path = []
  let current

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      if (grid[x][y].state != 0 && grid[x][y].state != 1) {
        changeUnit(grid[x][y], 2)
      }
    }
  }

  function findPath(draw) {
    path = []
    let temp = current
    path.push(temp)
    while (temp.previous) {
      path.push(temp.previous)
      temp = temp.previous
    }
    path.push(end)
    for (let i of openSet) {
      changeState(i, 3)
      if (draw) changeColor(i, 3)
    }
    for (let i of closedSet) {
      changeState(i, 4)
      if (draw) changeColor(i, 4)
    }
    for (let i of path) {
      changeState(i, -1)
      if (draw) changeColor(i, colors.length - 1)
    }
  }

  // create neighbors
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let neighbors = []
      if (x < w - 1) neighbors.push(grid[x + 1][y])
      if (x > 0) neighbors.push(grid[x - 1][y])
      if (y < h - 1) neighbors.push(grid[x][y + 1])
      if (y > 0) neighbors.push(grid[x][y - 1])
      if (diag) {
        if (x > 0 && y > 0) neighbors.push(grid[x - 1][y - 1])
        if (x < w - 1 && y > 0) neighbors.push(grid[x + 1][y - 1])
        if (x > 0 && y < h - 1) neighbors.push(grid[x - 1][y + 1])
        if (x < w - 1 && y < h - 1) neighbors.push(grid[x + 1][y + 1])
      }
      grid[x][y].neighbors = neighbors
      grid[x][y].previous = undefined
    }
  }

  while (running) {
    if (openSet.length > 0) {
      let winner = 0
      for (let i in openSet) {
        if (openSet[i].f < openSet[winner].f) winner = i
      }
      current = openSet[winner]
      if (current == end) {
        findPath(true)
        running = false
        run.innerHTML = 'run'
        console.log('done in ' + (Date.now() - stime) / 1000 + 'seconds');
        return;
      }
      openSet.splice(openSet.indexOf(current), 1)
      closedSet.push(current)

      for (let i in current.neighbors) {
        let neighbor = current.neighbors[i]

        // diagonal blocking
        let blockedDiagonal = false
        if (diag) {
          if (((current.x == neighbor.x) == (current.y == neighbor.y))) {
            let sharedWalls = 0;
            for (let n in neighbor.neighbors) {
              if (current.neighbors.includes(neighbor.neighbors[n]) && (neighbor.neighbors[n].state == 0 || neighbor.neighbors[n].state == 1)) {
                sharedWalls++
              }
            }
            blockedDiagonal = (sharedWalls == 2)
          }
        }

        // if valid spot
        if (!closedSet.includes(neighbor) && neighbor.state != 0 && neighbor.state != 1 && !blockedDiagonal) {
          let tempG = current.g + distance(neighbor, current)
          let newPath = false
          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG
              newPath = true
            }
          }
          else {
            neighbor.g = tempG
            newPath = true
            openSet.push(neighbor)
          }
          if (newPath) {
            neighbor.h = distance(neighbor, end)
            neighbor.f = neighbor.h + neighbor.g
            neighbor.previous = current
          }
        }
      }
      findPath(live)
      if (live) {
        await sleep(speed.value)
      }
    }
    else {
      console.log('no solution in ' + (Date.now() - stime) / 1000 + 'seconds');
      findPath(true)
      running = false
      run.innerHTML = 'run'
      return;
    }
  }
}

window.addEventListener('load', function() {
  panel.appendChild(reset)
  panel.appendChild(run)
  panel.appendChild(random)
  panel.appendChild(depth)
  panel.appendChild(diagonals)
  panel.appendChild(liveToggle)
  panel.appendChild(speed)
  panel.appendChild(width)
  panel.appendChild(height)
  panel.appendChild(newGrid)
  createGrid()
})
