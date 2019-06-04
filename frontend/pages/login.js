import { Component } from "react";
import fetch from "isomorphic-unfetch";
import { connect } from "react-redux";

import actions from "../redux/actions";
import Layout from "../components/Layout";
import { login } from "../utils/auth";

class Login extends Component {
  static getInitialProps({ req }) {
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const apiUrl = process.browser
      ? `${protocol}://${window.location.host}/login`
      : `${protocol}://${req.headers.host}/login`;

    return { apiUrl };
  }

  constructor(props) {
    super(props);

    this.state = { username: "", password: "", error: "" };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    const username = this.state.username;
    const password = this.state.password;
    const url = this.props.apiUrl;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const { token } = await response.json();
        login({ token });
      } else {
        console.log("Login failed.");
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <Layout noHeader noAuth>
        <div className="login">
          <p>
            You'll need to login to continue. Make sure to disable Adblock as it
            causes issues with Google Auth.
          </p>
          <button onClick={this.props.login}>Login with Google</button>
        </div>
        <style jsx>{`
          .login {
            max-width: 340px;
            margin: 0 auto;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          form {
            display: flex;
            flex-flow: column;
          }
          label {
            font-weight: 600;
          }
          input {
            padding: 8px;
            margin: 0.3rem 0 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .error {
            margin: 0.5rem 0 0;
            display: none;
            color: brown;
          }
          .error.show {
            display: block;
          }
        `}</style>
      </Layout>
    );
  }
}

export default connect(
  null,
  actions
)(Login);
