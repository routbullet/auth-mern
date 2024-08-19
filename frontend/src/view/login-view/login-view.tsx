import { Link } from "react-router-dom";

export const LoginView = () => {
  return (
    <div>
      <form action="http://localhost:8000/login" method="POST">
        <div>
          <label htmlFor="username">username: </label>
          <input type="text" name="username" id="username" required />
        </div>
        <div>
          <label htmlFor="password">password: </label>
          <input type="password" name="password" id="password" required />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h6>
          Don't you have an account?{" "}
          <Link to="/registration">Registration</Link>
        </h6>
      </div>
    </div>
  );
};
