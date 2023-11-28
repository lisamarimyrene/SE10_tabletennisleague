import './Homepage.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { TechnologyContext } from "../../providers/TechnologyProvider";
import TopFivePlayers from '../../components/TopFivePlayers/TopFivePlayers';

// * Homepage 
export default function Homepage() {
    const [matchesLength, setMatchesLength] = useState(0);
    const [playersLength, setPlayersLength] = useState(0);

    // Get matches (length) from api endpoint
    useEffect(() => {
        axios.get('http://localhost:5005/api/public/matchesLength')
        .then(res => {
            setMatchesLength(res.data);
        })
        .catch(error => console.log(error))
    })

    // Get players (length) from api endpoint
    useEffect(() => {
        axios.get('http://localhost:5005/api/public/playersLength')
        .then(res => {
            setPlayersLength(res.data);
        })
        .catch(error => console.log(error))
    })

    return (
        <div className='homepage-container'>
            <section className='about-section'>
                <h1>Welcome to Table Tennis League App!</h1>
                <p>Welcome to the official Table Tennis League application for NTNU Gjøvik! Stay updated with the league, track players, and follow exciting matches. Login or create a new user to access additional features. Once logged in, you can easily manage your games, view opponents' profiles, and stay informed about all the matches. Don't forget that you can favorite players to keep track of their ratings. Enjoy the ultimate table tennis experience!</p>
            </section>
            <section className='players-section'>
                <h2>Players registered</h2>
                <p>There are now in total <span className='totalPlayersSpan'>{playersLength}</span> registered players and <span className='totalPlayersSpan'>{matchesLength}</span> registered matches!</p>
                <p className='racket'>&#127955;</p>
            </section>

            <section className="topfiveplayers-section">
                <h2>Top 5 Players</h2>
                <TopFivePlayers />
            </section>
        </div>
    )
}