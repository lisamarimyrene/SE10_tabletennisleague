import './Profile.css';
import Subnav from '../../components/Subnav/Subnav';
import { Outlet } from "react-router-dom";

// * Profile page
export default function Profile(){
    return(
        <div className="profile-container">
            <Subnav />
            <Outlet/>
        </div>
    )
}