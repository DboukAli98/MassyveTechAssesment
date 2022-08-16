import axios from "axios";
import cx from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Signin.module.css";

function Signin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logged , setLogged] = useState(false);
  
  const user = {
    username:username,
    password:password
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if ((await response).status === 200) {
      setLogged(true);
      const data = await response.json();
      console.log(data);
      localStorage.setItem('username' , data.username);
      localStorage.setItem('email' , data.email);
      localStorage.setItem('roles',data.roles);
      localStorage.setItem('isLogged',true);
      router.replace("/home_page");
      
      
    } else {
      console.log("Error");
    }
  };

  return (
    <>
      <main className={cx(styles["form-signin"], "text-center", "mt-5")}>
        <form onSubmit={handleLogin}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="JohnDoe"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className={cx(styles.checkbox, "mb-3")}>
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </>
  );
}

export default Signin;
