import React, { useState } from "react";
import Scoreboard from "./Scoreboard";
import './Popup.css';

interface Player {
    nickname: string
    age: string | number
    movesCounter: number
    gameDuration: string
}

interface IProps {
    newGame: () => void
    winner: Player[]
    winnerName: string
  }

export default function Popup({
    newGame,
    winner,
    winnerName
}: IProps) {

    const [showScoreboard, setshowScoreboard] = useState('none');
    const [showWinnerName, setShowWinnerName] = useState('block');

    const showScore = () => {
        if(showScoreboard === 'none'){
            setshowScoreboard('block')
            setShowWinnerName('none')
        } else if(showScoreboard === 'block'){
            setshowScoreboard('none')
            setShowWinnerName('block')
        }
    }

    return (
        <div className='popupMain'>
            <div className="winnerName" style={{display: showWinnerName}}>
                <h3>Congrats!</h3>
                <h4>The winner is:</h4>
                <h1>{winnerName}</h1>
            </div>
            <div className='scoreWindow' style={{display: showScoreboard}}>
                <Scoreboard winner={winner} />
            </div>
            <div>
                <button onClick={newGame} className='popupBtn'>New Game</button>
                <button className='popupBtn' onClick={showScore}>Scoreboard</button>
            </div>
        </div>
    );
}