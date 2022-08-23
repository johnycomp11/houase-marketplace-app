import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //destructure from form data
  const { name, email, password } = formData;

  const navigate = useNavigate();

  //Take event, call setFormData with param and return object
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // makes copy of form data
      const formDataCopy = {...formData}
      //delete password from copy of formData so it is not submitted to database
      delete formDataCopy.password
      //timestamp
      formDataCopy.timestamp = serverTimestamp()

      // updates database and add user to collection
      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate("/");
    } catch (error) {
      toast.error('Something went wrong with registration');
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="nameInput"
            placeholder="Name"
            id='name'
            value = {name}
            onChange={onChange}
          />

          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id='email'
            value = {email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              //If user clicks show password, show text.
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
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to="/sign-up" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
