import PlayersSubnav from "../../components/PlayersSubnav/PlayersSubnav";
import { Outlet } from "react-router-dom";

// * Players page
export default function Players(){
    return(
        <div className="">
            <PlayersSubnav />
            <Outlet/>
        </div>
    )

}

