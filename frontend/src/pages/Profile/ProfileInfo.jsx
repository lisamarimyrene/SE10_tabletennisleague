import './ProfileInfo.css';
import ProfileTable from '../../components/Profile/ProfileTable/ProfileTable';

// * ProfileInfo page
export default function ProfileInfo(){
    return(
        <div className="profileInfo-container">
            <h1>Profile</h1>
            <p>Overview of your profile credentials.</p>
            <ProfileTable />
        </div>
    )
}