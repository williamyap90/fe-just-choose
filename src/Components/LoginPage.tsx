
const LoginPage = () => {
    return (
        <section className="UserForm">
            <h1>Log in</h1>
            <form>
                
              <label htmlFor ="email"> Email </label> 
              <input type="email" name="email" id="email" />
              <label htmlFor ="passwordField"> Password </label> 
              <input type="password" name="passwordField" id="passwordField" /> 

              <input type="button" value="Sign Up"/>
            </form>
            {/* Below Paragraph needs to be linked in Sign Up section */}
            <p>Don't have an account? Sign Up</p>
        </section>
    );
};

export default LoginPage;