import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { IUser } from './Interfaces/Interfaces';
import { fetchUserByEmail } from '../API-Funcs/API';

const LoginPage = (props: any) => {
    const [userLogin, setUserLogin] = useState({ email: '', password: '' });

    const updateUserLogin = (event: any) => {
        setUserLogin((currUserLogin) => {
            const newUserLogin = { ...currUserLogin };
            if (event.target.id === 'email') {
                newUserLogin.email = event.target.value;
            }
            if (event.target.id === 'passwordField') {
                newUserLogin.password = event.target.value;
            }
            return newUserLogin;
        });
    };

    const history = useHistory();
    const goHome = () => {
        history.push('/');
    };

    const submitForm = () => {
        fetchUserByEmail(userLogin)
            .then((user) => {
                localStorage.setItem(`username`, `${user.firstName}`);

                props.setLoggedInUser((currUser: IUser) => {
                    const newLoggedInUser = { ...currUser };
                    newLoggedInUser.name = user.firstName;
                    newLoggedInUser.status = 'registered';
                    return newLoggedInUser;
                });
                props.setLoggedUserAvatar((currAvatar: string) => {
                    const newAvatar = user.avatarUrl;
                    return newAvatar;
                });
                goHome();
            })
            .catch((err) => {
                alert('Username/password not found!');
            });
    };

    return (
        <section>
            <h1 className="page-header page-header-login">Log in</h1>
            <form
                className="login-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    submitForm();
                }}
            >
                <label htmlFor="email" className="input-label">
                    {' '}
                    E-mail{' '}
                </label>
                <input
                    className="input-textbox"
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off" //
                    required
                    onChange={(event) => updateUserLogin(event)}
                />

                <label htmlFor="passwordField" className="input-label">
                    {' '}
                    Password{' '}
                </label>
                <input
                    className="input-textbox"
                    type="password"
                    name="passwordField"
                    id="passwordField"
                    required
                    autoComplete="off"
                    onChange={(event) => updateUserLogin(event)}
                />

                <button
                    className="secondary-button secondary-button-login"
                    type="submit"
                    value="Login"
                >
                    Login
                </button>
            </form>
            {/* Below Paragraph needs to be linked in Sign Up section */}
            <Link to="/signup-page" style={{ textDecoration: 'none' }}>
                <p className="footer-signup">
                    Don't have an account? <span>Sign Up</span>
                </p>
            </Link>
        </section>
    );
};

export default LoginPage;
