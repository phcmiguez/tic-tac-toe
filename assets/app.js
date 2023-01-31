const boardRegions = document.querySelectorAll('.container .vboard')
let gameBoard = []
let turnPlayer = 'ONE'

function updateTitle(){
  document.getElementById('player').innerText = turnPlayer
}

function initializeGame() {
  gameBoard = [['','',''],['','',''],['','','']]
  turnPlayer = 'ONE'
  document.getElementById('playerPanel').innerHTML = 'Player <span id="player"></span> Turn!'
  updateTitle()
  boardRegions.forEach((element) => {
    element.classList.remove('win')
    element.innerText = ''
    element.addEventListener('click', handleBoardClick)
  })
}

function getWinRegions() {
  const winRegions = []

  if(gameBoard[0][0] && gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][0] === gameBoard[0][2])
    winRegions.push('0.0', '0.1', '0.2')
  
  if(gameBoard[1][0] && gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][0] === gameBoard[1][2])
  winRegions.push('1.0', '1.1', '1.2')

  if(gameBoard[2][0] && gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][0] === gameBoard[2][2])
    winRegions.push('2.0', '2.1', '2.2')

  if(gameBoard[0][0] && gameBoard[0][0] === gameBoard[1][0] && gameBoard[0][0] === gameBoard[2][0])
    winRegions.push('0.0', '1.0', '2.0')

  if(gameBoard[0][1] && gameBoard[0][1] === gameBoard[1][1] && gameBoard[0][1] === gameBoard[2][1])
    winRegions.push('0.1', '1.1', '2.1')

  if(gameBoard[0][2] && gameBoard[0][2] === gameBoard[1][2] && gameBoard[0][2] === gameBoard[2][2])
    winRegions.push('0.2', '1.2', '2.2')

  if(gameBoard[0][0] && gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2])
    winRegions.push('0.0', '1.1', '2.2')

  if(gameBoard[0][2] && gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[2][0])
    winRegions.push('0.2', '1.1', '2.0')
  
    return winRegions

}

function disableRegion(element) {
  element.style.cursor = 'default'
  element.removeEventListener('click', handleBoardClick)
}

function handleWin(regions) {
  regions.forEach((region) => {
    document.querySelector(`[data-region="${region}"]`).classList.add('win')
  })
  turnPlayer = turnPlayer === 'ONE' ? 'TWO' : 'ONE'
  document.getElementById('playerPanel').innerHTML = `Player ${turnPlayer} has won!`

}

function disableAllRegions() {
  boardRegions.forEach(function (region) {
    region.classList.remove('cursor-pointer')
    region.removeEventListener('click', handleBoardClick)
})
}

function handleBoardClick(e) {
  const region = e.currentTarget.dataset.region
  const squareBoard = e.currentTarget
  const rowColumnPair = region.split('.')
  const row = rowColumnPair[0]
  const column = rowColumnPair[1]
  
  if(turnPlayer === 'ONE'){
    squareBoard.innerText = 'X'
    gameBoard[row][column] = 'X'
    turnPlayer = 'TWO'
    updateTitle()
  }else{
    squareBoard.innerText = 'O'
    gameBoard[row][column] = 'O'
    turnPlayer = 'ONE'
    updateTitle()
  }

  console.clear()
  console.table(gameBoard)

  disableRegion(squareBoard)

  const winRegions = getWinRegions()

  if(winRegions.length > 0) {
    handleWin(winRegions)
    disableAllRegions()
  }else if(gameBoard.flat().includes('')){
    updateTitle()
  }else{
    document.getElementById('playerPanel').innerText = 'Draw!!!'
  }

}

initializeGame()