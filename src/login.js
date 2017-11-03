import React from "react";
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    getLogin(e) {
        e.preventDefault();
        if (this.refs.username.value && this.refs.password.value) {
            var user = this.refs.username.value;
            var pass = this.refs.password.value
            // console.log(user, pass);
            // console.log("this is login component")
            this.props.login(this, user, pass);

        } else {
            if (this.refs.username) {
                toast.error("Please Enter Values !", { position: toast.POSITION.TOP_CENTER });
            }
        }

        this.refs.username.value = "";
        this.refs.password.value = "";
    }
    render() {
        return (
            <form className="col-md-6" id="loginform">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="form-control" id="username" type="text" ref="username" placeholder="Username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" id="password" type="password" ref="password" placeholder="Password" />
                </div>

                <button onClick={this.getLogin.bind(this)} className="btn btn-primary" value="Login" id="login-button">Login</button>
                <ToastContainer
                    position="top-right"
                    type="default"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />
            </form>
        );
    }
}

export default Login;