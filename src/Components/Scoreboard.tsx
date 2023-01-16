import React, {useEffect, useState} from "react";
import './Scoreboard.css';

interface Player {
    nickname: string
    age: string | number
    movesCounter: number
    gameDuration: string
}
interface IProps {
    winner: Player[]
}

export default function Scoreboard({
    winner
}: IProps) {

    const [updateWinner, setupdateWinner] = useState(winner);

    useEffect(() => {
        setupdateWinner(winner)
    },[winner] )

    return (
        <div>
            <p>-Scoreboard-</p>
            {updateWinner.map( (el, i) => <div key={i} className="scoreList"><div className="inlineScore"><p>Player: </p><p>{el.nickname}</p></div><div className="inlineScore"><p>Moves in game: </p><p>{el.movesCounter}</p></div><div className="inlineScore"><p>Time: </p><p>{el.gameDuration}</p></div></div>)}
        </div>
    );
}
