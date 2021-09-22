

const SignUpPage = () => {
    return (
        <section className="UserForm">
            <h1>Sign Up</h1>
            <form>
                
              <label htmlFor="fullName">Full Name</label>
              <input type="text" name="fullName" id="fullName" />
              <label htmlFor ="email"> Email </label> 
              <input type="email" name="email" id="email" />
              <label htmlFor ="passwordField"> Password </label> 
              <input type="password" name="passwordField" id="passwordField" /> 
              <input type="button" value="Sign Up"/>
            </form>
            {/* Below Paragraph needs to be linked in Sign Up section */}
            <p>Already have an account? Login</p>
        </section>
    );
};

export default SignUpPage;