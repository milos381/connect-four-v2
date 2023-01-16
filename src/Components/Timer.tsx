import React, { useState, useEffect } from 'react';
import './Timer.css';

interface Player {
    nickname: string
    age: string | number
    movesCounter: number
    gameDuration: string
}

interface IProps {
    draw: boolean
    won: null | boolean
    seconds: number
    minutes: number
    setSeconds: React.Dispatch<React.SetStateAction<number>>
    setMinutes: React.Dispatch<React.SetStateAction<number>>
    setPlayerOne: React.Dispatch<React.SetStateAction<Player>>
    setPlayerTwo: React.Dispatch<React.SetStateAction<Player>>
  }

export default function Timer({
    draw,
    won,
    seconds,
    minutes,
    setPlayerOne,
    setPlayerTwo
}: IProps) {
  const [insideSeconds, setInsideSeconds] = useState(seconds);
  const [insideMinutes, setInsideMinutes] = useState(minutes);
  const [insideWon, setInsideWon] = useState(won);
  const [insideDraw, setInsideDraw] = useState(draw);

  useEffect(() => {
    setInsideSeconds(seconds);
    setInsideMinutes(minutes);
    setInsideWon(won)
    setInsideDraw(draw)
  }, [seconds, minutes, won, draw])

useEffect(() => {
  setPlayerOne(playerOne => ({
    ...playerOne, gameDuration: playerOne.gameDuration = insideSeconds < 10 ? `${insideMinutes} : 0${insideSeconds}` : `${insideMinutes} : ${insideSeconds}`
  }))
  setPlayerTwo(playerTwo => ({
    ...playerTwo, gameDuration: playerTwo.gameDuration = insideSeconds < 10 ? `${insideMinutes} : 0${insideSeconds}` : `${insideMinutes} : ${insideSeconds}`
  }))
}, [won])

  useEffect(() => {
    let intervalMinutes: any = null;
    let intervalSeconds: any = null;
    if (insideWon === false || insideDraw === false) {
      intervalSeconds = setInterval(() => {
        setInsideSeconds(insideSeconds => insideSeconds + 1);
      }, 1000);
      if(insideSeconds === 60){
        setInsideMinutes(insideMinutes => insideMinutes + 1)
        setInsideSeconds(0)
      }

    } else if ((insideWon && insideSeconds !== 0) || (insideDraw && insideSeconds !== 0)) {
      clearInterval(intervalSeconds);
      clearInterval(intervalMinutes)
    }
    return () => {
      clearInterval(intervalSeconds)
      clearInterval(intervalMinutes)
    }
  }, [insideWon, insideDraw, insideMinutes, insideSeconds]);

  return (
      <div className="time">
        <h4>Time:</h4>
        {insideMinutes < 10 ? `0${insideMinutes}` : insideMinutes} : {insideSeconds < 10 ? `0${insideSeconds}` : insideSeconds}
      </div>
  );
};
