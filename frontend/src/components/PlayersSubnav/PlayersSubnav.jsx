import { Link, useLocation } from "react-router-dom";

// * PlayersSubnav component
export default function PlayersSubnav() {
  const location = useLocation();

  let Links = [
    { name: "Leaderboard", link: "/Players/leaderboard" },
    { name: "Favorite players", link: "/Players/favorites" }
  ];

  return (
    <div className="subnav-outer-container">
      <div className="subnav-inner-container">
        <ul className="subnav-list-container">
          {Links.map((link) => (
            <li key={link.name} className={`subnav-listItem ${
              location.pathname === link.link ? "subnav-listItem-active" : ""
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