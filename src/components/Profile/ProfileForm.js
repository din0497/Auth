import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const ctx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const newPassword = newPasswordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCaEdEYbEgCjtc7zG-cKmea5JELa2EI-Mg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
          password: newPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      history.replace('/')
    });
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          ref={newPasswordRef}
          minLength="7"
          type="password"
          id="new-password"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
