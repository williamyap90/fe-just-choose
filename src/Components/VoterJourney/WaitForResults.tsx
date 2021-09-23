import { Link } from "react-router-dom";

export default function WaitForResults() {
    return (
        <div>
            <h2 className="page-header page-header-voted">
                Thanks for voting!
            </h2>
            <p className="page-header-voted-text">
                Once the deadline has passed the results will be displayed here.
                Try again later.
            </p>

            <p className="page-header-voted-text">Want to make your own event? Log in or sign up <Link to="/login-page">here</Link></p>
        </div>
    );
}
