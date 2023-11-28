import "./ProfileInfo.css"

// * ProfileInfo component
export default function ProfileInfo({ props }) {
    return (
        <div className="box2-div-parent">

            <div className="box2-div">
                <h3>First name</h3>
                <p>{props.firstname}</p>

                <h3>Username</h3>
                <p>{props.username}</p>
            </div>

            <div className="box2-div">
                <h3>Last name</h3>
                <p>{props.lastname}</p>

                <h3>Email</h3>
                <p>{props.email}</p>
            </div>
        </div>
    )
}