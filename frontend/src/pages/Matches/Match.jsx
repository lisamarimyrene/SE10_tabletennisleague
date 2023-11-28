import TableTennisWebComponent from "../../components/TableTennisWebComponent/TableTennisWebComponent"
import MatchStatistics from "../../components/Matches/MatchStatistics/MatchStatistics"
import "./Match.css"
import React, { useEffect, useContext, useState, useRef } from 'react';
import { TechnologyContext } from "../../providers/TechnologyProvider";
import { useParams } from 'react-router-dom';
import axios from "axios";

// * Match page
export default function Match() {
    // Get the loggedIn and accessToken state
    const { loggedIn, accessToken } = useContext(TechnologyContext);
    // Set state
    const [match, setMatch] = useState("")
    const [reloadPage, setReloadPage] = useState(false); 

    // Get the match Id from the URL
    const { id } = useParams();

    // Get matches info from matches api endpoint
    useEffect(() => {
        if (!loggedIn) {
            return;
        }
        axios.get(`http://localhost:5005/api/matches/${id}`, {
            headers: { authToken: `Bearer ${accessToken}` },
        }) // Set header to Bearer to get access approved by the auth.
            .then((res) => {
                setMatch(res.data[0]);
            })
            .catch((error) => console.log(error));
    }, [loggedIn, reloadPage]);

    const handleFinishMatch = () => {
        setReloadPage(!reloadPage);
    }

    // console.log(matches);
    if (!loggedIn) {
        return null;
    }

    return (
        <div className="match-container">
            {match.finished === true ? (
                <MatchStatistics props={match} />
            ) : (
                <TableTennisWebComponent handleFinishMatch={handleFinishMatch}/>
            )}
        </div>
    )
}