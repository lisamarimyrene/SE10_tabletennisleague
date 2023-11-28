import "./MatchStatistics.css";
import { Link } from "react-router-dom";

// * MatchStatitics component
export default function MatchStatistics({ props }) {
    // Format results function
    const formatSetResult = (setResult) => {
        return setResult[0];
    };

    // Format results 
    const setsResults = props.setResults
    .filter((setResult) => Array.isArray(setResult) && setResult.length === 1)
    .map((setResult) => formatSetResult(setResult))
    .join(", ");

    // Format the date
    const formatDate = (dateString) => {
        return dateString.slice(0, 10); // Extract the first 10 characters (yyyy-mm-dd)
    };

    // Format the time
    const formatTime = (timeString) => {
        const dateObj = new Date(timeString);
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
      };
    
    const padZero = (num) => {
        return num.toString().padStart(2, "0");
    };

    return (
        <div className="matchstats-container">
            <h1>Match statitics</h1>
            <section>
                <div className="matchstats-players">
                    <h2>{props.players?.player1.username}</h2>
                    <h3>{props.overallPoints}</h3>
                    <h2>{props.players?.player2.username}</h2>
                </div>
                <div className="matchstats-info">
                    <p>Date: {formatDate(props.date)}</p>
                    <p>Start time: {formatTime(props.timestamps.startTime)}</p>
                    <p>End time: {formatTime(props.timestamps.endTime)}</p>
                    <p>Duration: {props.duration}</p>
                    <p>Sets results: {setsResults}</p>
                    <p>Winner: {props.winner?.username} ({props.winner?.firstname} {props.winner?.lastname})</p>
                </div>
            </section>
            <Link to="/matches"><button className="returnToMatchesBtn">Return to all matches</button></Link>
        </div>
    )
}