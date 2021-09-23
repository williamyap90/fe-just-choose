import { Link } from 'react-router-dom';

const SignUpPage = () => {
    return (
        <section className="UserForm">
            <h1 className="page-header page-header-signup">Sign Up</h1>
            <form className="signup-form">
                <label className="input-label" htmlFor="fullName">
                    Full Name
                </label>
                <input
                    className="input-textbox"
                    type="text"
                    name="fullName"
                    id="fullName"
                />
                <label className="input-label" htmlFor="email">
                    {' '}
                    Email{' '}
                </label>
                <input
                    className="input-textbox"
                    type="email"
                    name="email"
                    id="email"
                />
                <label className="input-label" htmlFor="passwordField">
                    {' '}
                    Password{' '}
                </label>
                <input
                    className="input-textbox"
                    type="password"
                    name="passwordField"
                    id="passwordField"
                />
                <input
                    className="secondary-button secondary-button-login"
                    type="button"
                    value="Sign Up"
                />
            </form>
            {/* Below Paragraph needs to be linked in Sign Up section */}
            <Link to="/login-page" style={{ textDecoration: 'none' }}>
                <p className="footer-signup">
                    Already have an account? <span>Login</span>
                </p>
            </Link>
        </section>
    );
};

export default SignUpPage;
