import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isGetAccessorDeclaration } from 'typescript';
import { postUser } from '../API-Funcs/API';
import { useHistory } from 'react-router-dom';

const SignUpPage = () => {
    const [formInput, setFormInput] = useState<any>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: any) => {
        setFormInput((currFormInput: any) => {
            const newFormInput = { ...currFormInput };
            newFormInput[e.target.id] = e.target.value;
            return newFormInput;
        });
    };
    const history = useHistory();
    const goLogin = () => {
        history.push('/login-page');
    };

    const handleSubmit = (e: any) => {
        console.log('submitting');
        e.preventDefault();
        if (
            formInput.firstName.length >= 2 &&
            formInput.lastName.length >= 2 &&
            formInput.email.length >= 4 &&
            formInput.password.length >= 5 &&
            formInput.password === formInput.confirmPassword
        ) {
            console.log('Creating user....');
            postUser(formInput).then((response) => {
                goLogin();
            });
        } else {
            console.log('Form not filled in properly');
        }
    };
    console.log(formInput);
    return (
        <section className="UserForm">
            <h1 className="page-header page-header-signup">Sign Up</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <label className="input-label" htmlFor="firstName">
                    First Name
                </label>
                <input
                    className="input-textbox"
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formInput.firstName}
                    onChange={handleChange}
                />
                <label className="input-label" htmlFor="lastName">
                    Last Name
                </label>
                <input
                    className="input-textbox"
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formInput.lastName}
                    onChange={handleChange}
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
                    value={formInput.email}
                    onChange={handleChange}
                />
                <label className="input-label" htmlFor="password">
                    {' '}
                    Password{' '}
                </label>
                <input
                    className="input-textbox"
                    type="password"
                    name="password"
                    id="password"
                    value={formInput.password}
                    onChange={handleChange}
                />
                <label className="input-label" htmlFor="confirmPassword">
                    {' '}
                    Confirm Password{' '}
                </label>
                <input
                    className="input-textbox"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formInput.confirmPassword}
                    onChange={handleChange}
                />
                <input
                    className="secondary-button secondary-button-login"
                    type="submit"
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
