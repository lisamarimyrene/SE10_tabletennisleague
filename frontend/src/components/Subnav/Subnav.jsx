import "./Subnav.css";
import { Link, useLocation } from "react-router-dom";

// * Subnav (profile) component
export default function Subnav() {
    const location = useLocation();

    let Links = [
        { name: "Profile information", link: "/profile/ProfileInfo" },
        { name: "Played matches", link: "/profile/ProfileOldMatches" }
    ];

    return (
        <div className="subnav-outer-container">
            <div className="subnav-inner-container">
                <ul className="subnav-list-container">
                    {Links.map((link) => (
                        <li key={link.name} className={`subnav-listItem ${location.pathname === link.link ? "subnav-listItem-active" : ""
                            }`}>
                            <Link
                                to={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}