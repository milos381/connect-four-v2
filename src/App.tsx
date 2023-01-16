import React, { useState, useEffect } from "react";
import Popup from "./Components/Popup";
import Timer from "./Components/Timer";
import './App.css';
import backgroundImg from './images/118Z_2012.w017.n001.325B.p15.325.jpg'

function App() {

  const numRows = 6
  const numColumns = 7
  let newboardmodel = []
  let counterInside = 0

  interface Player {
    nickname: string
    age: string | number
    movesCounter: number
    gameDuration: string
  }
  
  const [board, setBoard] = useState<null | any>(null);
  const [currentPlayer, setCurrentPlayer] = useState<string>('red');
  const [counter, setCounter] = useState<number>(0)
  const [won, setWon] = useState<null | boolean>(null)
  const [draw, setDraw] = useState<boolean>(false)
  const [playerOne, setPlayerOne] = useState<Player>({ nickname: '', age: '', movesCounter: 0, gameDuration: ''})
  const [playerTwo, setPlayerTwo] = useState<Player>({ nickname: '', age: '', movesCounter: 0, gameDuration: ''})
  const [showForm, setShowForm] = useState<string>('flex')
  const [startGame, setStartGame] = useState<string>('none')
  const [winner, setWinner] = useState<Player[]>([])
  const [winnerName, setWinnerName] = useState<string>('')
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
 

  const newGame = ():void => {
    let rowArr = [];
    for (let i = 0; i < numRows; i++) {
      rowArr.push(new Array(numColumns).fill('white'))
    }
    setCounter(0)
    setBoard(rowArr)
    setWon(false)
    setDraw(false)
  }

  useEffect(() => {
    if(won){
      // setIsActive(false)
      if(currentPlayer === 'yellow'){
        setWinner(winner => [...winner, playerOne])
        setWinnerName(playerOne.nickname)
      } else if(currentPlayer === 'red'){
        setWinner(winner => [...winner, playerTwo])
        setWinnerName(playerTwo.nickname)
      }
    } 
  }, [won])

  useEffect(() => {
    if(counter === 42){
      setDraw(true)
      setTimeout(() => {
        let answer = prompt("It's a draw. Would you like to play a new game? Y/N")
        if(answer !== null && (answer === 'Y' || answer === 'y')){
          newGame()
        }
      },50)
    }
  }, [counter])

  useEffect(() => {
    let rowArr = [];
    for (let i = 0; i < numRows; i++) {
      rowArr.push(new Array(numColumns).fill('white'))
    }
  }, [])

  const makeNextMove = (x : number, y : number) => {
    
    x = 5

    if(currentPlayer === 'red'){
      setPlayerTwo(playerTwo => ({
        ...playerTwo, movesCounter: playerTwo.movesCounter = counter + 2
      }))
      setCurrentPlayer('yellow')
    } else if(currentPlayer === 'yellow'){
      setPlayerOne(playerOne => ({
        ...playerOne, movesCounter: playerOne.movesCounter = counter + 2
      }))
      setCurrentPlayer('red')
    }

    for (let i = 7; i >= 0; i--) {
      if(board[x][y] !== 'white'){
        x -= 1
        if(x === -1){
          alert('Please select another column')
          if(currentPlayer === 'red'){
            setCurrentPlayer('red')
          } else if(currentPlayer === 'yellow'){
            setCurrentPlayer('yellow')
          }
          x = 0
          return
        }
      }
    }

    if(board[x][y] === 'white'){
      let player = currentPlayer
      let nextPlayer = player === 'red' ? 'yellow' : 'red'
      board[x][y] = nextPlayer
    }
    

    for (let i = 0; i < board.length; i++) {
      for (let c = 0; c < 4; c++) {
        if ((board[i][c] !== 'white') && (board[i][c] === board[i][c + 1]) && (board[i][c] === board[i][c + 2]) && (board[i][c] === board[i][c + 3])){
          setWon(true)
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let c = 0; c < numColumns; c++) {
        if ((board[i][c] !== 'white') && (board[i][c] === board[i+1][c]) && (board[i][c] === board[i+2][c]) && (board[i][c] === board[i+3][c])){
          setWon(true)
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let c = 0; c < 4; c++) {
        if ((board[i][c] !== 'white') && (board[i][c] === board[i+1][c+1]) && (board[i][c] === board[i+2][c+2]) && (board[i][c] === board[i+3][c+3])){
          setWon(true)
        }
      }
    }
    for (let i = 3; i < board.length; i++) {
      for (let c = 0; c < 4; c++) {
        if ((board[i][c] !== 'white') && (board[i][c] === board[i-1][c+1]) && (board[i][c] === board[i-2][c+2]) && (board[i][c] === board[i-3][c+3])){
          setWon(true)
        }
      }
    }

    setCounter(counter + 1)

  }

  

  if(board !== null){
    for(let x = 0; x < numRows; x ++){
      let newColumn = []
        for(let y = 0; y < numColumns; y++){
          counterInside++
          let piece = board[x][y]
          newColumn.push(
            <div onClick={() => {makeNextMove(x, y)}} key={counterInside} style={{width: 50, height: 50, backgroundColor: "#0D8EBF", display: "flex", padding: 7}}>
              <div key={counter} style={{backgroundColor: piece, borderRadius: 30, flex: 1}} /> 
            </div>
          )
        }
      newboardmodel.push(<div key={x} style={{display: "flex"}}>{newColumn}</div>)
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault(); 
    setShowForm('none')
    setStartGame('block')
    newGame()
  }
 
  return (
    <>
    <div className="main" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover' }}>
      <div className="container">
        <form className='form' onSubmit={handleSubmit} style={{display: showForm}}>
          <div className="formPic">
            <img src="https://i5.walmartimages.com/asr/f3a0cb30-2713-4ec2-b06a-223ead133f5e.90db875a4296caf2b64658df693f322e.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" alt="connect 4" width="250" height="280" />
          </div>
          <div className="formInput">
            <label>
              <h3>Enter your info:</h3>
              <br></br>
              <input 
                type="text" 
                placeholder="Player One Nickname"
                value={playerOne.nickname}
                onChange={(e) => setPlayerOne(playerOne => ({
                  ...playerOne, nickname: e.target.value
                }))}
              />
              <br></br>
              <input 
                type="text" 
                placeholder="Player One Age"
                value={playerOne.age}
                onChange={(e) => setPlayerOne(playerOne => ({
                  ...playerOne, age: +e.target.value
                }))}
              />
              <br></br>
              <input 
                type="text" 
                placeholder="Player Two Nickname"
                value={playerTwo.nickname}
                onChange={(e) => setPlayerTwo(playerTwo => ({
                  ...playerTwo, nickname: e.target.value
                }))}
              />
              <br></br>
              <input 
                type="text" 
                placeholder="Player Two Age"
                value={playerTwo.age}
                onChange={(e) => setPlayerTwo(playerTwo => ({
                  ...playerTwo, age: +e.target.value
                }))}
              />
            </label>
            <br></br>
            <input className="submitBtn" type="submit" />
          </div>
        </form>
        {won ?       
        <div className="popupWindow">
          <Popup newGame={newGame} winnerName={winnerName} winner={winner}/>
        </div>
        :
        null
        }
        {board? 
        <div className="boardClass">   
        <Timer draw={draw} won={won} seconds={seconds} setSeconds={setSeconds} setMinutes={setMinutes} minutes={minutes} setPlayerOne={setPlayerOne} setPlayerTwo={setPlayerTwo}/>  
          <div className="winnerNameClass">
            <h3 style={{color: "#fff"}}>Current Player: </h3>{currentPlayer === 'red'? <div style={{color: '#E4BD8C'}}><h3>{playerOne.nickname}</h3></div> : <div style={{color: '#bd3c4d'}}><h3>{playerTwo.nickname}</h3></div>}
          </div>
        {newboardmodel}
        </div> : 
        <div></div>
        }
      </div>
    </div>
    </>
  );
}

export default App;
   