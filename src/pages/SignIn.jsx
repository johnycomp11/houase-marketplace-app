import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //destructure from form data
  const { email, password } = formData;

  const navigate = useNavigate;

  //Take event, call setFormData with param and return object
  const onChange = (e) => {
    setFormData((prevState) => ({...prevState,
      //make change based on id in form
    [e.target.id]: e.target.value}))
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>
        <form>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id={email}
            onChange={onChange}
          />
        
        <div className="passwordInputDiv">
          <input
            type={showPassword ? "text" : "password"}
            className="passwordInput"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />

          <img
            className="showPassword"
            src={visibilityIcon}
            alt="Show Password"
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        </div>
        <Link to="/forgot-password" className="forgotPasswordLink">
          Forgot Password
        </Link>
        <div className="signInBar">
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
          </button>
        </div>
        </form>

        
        <Link to='/sign-up' className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
}

export default SignIn;