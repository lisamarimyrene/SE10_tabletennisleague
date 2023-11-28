import './ProfileOldMatches.css';
import YourMatches from '../../components/Matches/YourMatches/YourMatches';

// * ProfileOldMatches page
export default function ProfileOldMatches(){
    return(
        <div className="profileOldMatches-container">
            <h1>Your matches</h1>
            <p>Overview of your played matches.</p>
            <div className="card-container">
                <YourMatches />
            </div>
        </div>
    )
}