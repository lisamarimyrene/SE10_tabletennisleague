import React, { useState } from 'react';
import './Matches.css'
import MatchesCard from '../../components/Matches/MatchesCard/MatchesCard'
import NewMatchCard from '../../components/Matches/NewMatchCard/NewMatchCard'

// * Matches page
export default function Matches() {

    const [showNewMatchCard, setShowNewMatchCard] = useState(false);

    const toggleNewMatchCard = () => {
      setShowNewMatchCard(!showNewMatchCard);
    };

    return (
        <div className="matches-container">
            <h1>Matches</h1>
            <p className='matches-container-p'>Here is an overview of all matches in the league.</p>
            <button className='newMatchBtn' onClick={toggleNewMatchCard}>New match</button>
            <div className="card-container">
                {showNewMatchCard ? <NewMatchCard /> : <MatchesCard />}
            </div>
        </div>
    )
}