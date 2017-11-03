import React, { Component } from 'react';
import './App.css';
import Others from './others';
import About from './about';
import Home from './home';
import Contacts from './contacts';
import Login from './login';
import Register from './register';
import { Switch, Route, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      activeUser: "",
      userData: this.props.user
    }
  }
  logOut() {
    console.log("log Out");
    createHistory.push('/');
    console.log(this);
    this.setState({ active: false });
  }
  login() {
    console.log("login");
    this.setState({ active: true });
  }
  addEntry(_this, user, pass) {
    //console.log(this.state);
    var newUser = this.checkLogin(_this, user, pass, "reg");
    if (newUser) {
      var oldData = this.state.userData;
      var newData = { username: "", password: "" };
      newData.username = user;
      newData.password = pass;
      oldData.push(newData);
      this.setState({ userData: oldData })
      toast.success("Successfully Registered !", { position: toast.POSITION.TOP_CENTER });
    }
  }
  check(user, checkUser, pass, checkPass, reg) {
    var id, pas;
    if (user === checkUser) {
      id = true;
      if (pass === checkPass) {
        if (reg !== "reg") {
          this.setState({ active: true });
          this.setState({ activeUser: checkUser });
          pas = true;
        } else {
          pas = undefined;
        }

      }
    }
    return ({ id, pas });
  }
  checkLogin(_this, user, pass, reg) {
    var loginState = this.state.userData.map((item, i) => {
      return this.check(item.username, user, item.password, pass, reg);
    });
    var loggedValue;
    var newUser = false;
    // console.log("loginState");
    // console.log(loginState);
    for (var i = 0; i < loginState.length; i++) {
      // console.log("loginState");
      // console.log(loginState);
      if (loginState[i].id === true && loginState[i].pas === true) {
        loggedValue = "passed";
      } else if (loginState[i].id === true) {
        loggedValue = "user";
      }
    }
    if (loggedValue === "passed") {
      toast.success("Successfully LoggedIn !", { position: toast.POSITION.TOP_CENTER });
    } else if (loggedValue === "user") {
      if (reg === "reg") {
        toast.error("User Already Exists !", { position: toast.POSITION.TOP_CENTER });
      } else {
        toast.error("Wrong Password !", { position: toast.POSITION.TOP_CENTER });
      }
    } else {
      if (reg === "reg") {
        newUser = true;
      } else {
        toast.error("Wrong Credential !", { position: toast.POSITION.TOP_CENTER });
      }
    }
    return newUser;
  }
  showNotification() {

  }
  register() {
    console.log("register");
  }
  loggedIn() {
    return <div>

      <ul className="topNav">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/contacts">Contacts</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/others">Others</NavLink></li>
        <li><NavLink onClick={this.logOut.bind(this)} to="/">Logout</NavLink></li>
      </ul>
      <h4 className="username text-right">Welcome Back {this.state.activeUser}</h4>
      <section className="content">
        <Route createHistory={createHistory}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contacts" render={() => (
              <Contacts onLoadEvent={this.state.userData} context={this.state.userData} />)} />
            <Route path="/about" component={About} />
            <Route path="/others" component={Others} />
          </Switch>
        </Route>
      </section>
    </div>
  }
  loggedOut() {
    return <div>
      <ul className="topNav">
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/register">Register</NavLink></li>
      </ul>
      <Route path="/login" active render={(props) => (<Login {...props} noti={this.showNotification.bind(this)} login={this.checkLogin.bind(this)} user={this.state.userData} />)} />
      <Route path="/register" render={(props) => (
        <Register {...props} noti={this.showNotification.bind(this)} register={this.addEntry.bind(this)} user={this.state.userData} />
      )} />

    </div>
  }
  render() {
    //console.log(this.props.user);
    return (
      <div className="App">
        <nav className="header">
          {this.state.active ? this.loggedIn() : this.loggedOut()}
        </nav>
        <div className="container">
          {this.props.children}
        </div>
        <ToastContainer
          position="top-right"
          type="default"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
