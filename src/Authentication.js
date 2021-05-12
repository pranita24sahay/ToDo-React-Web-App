import React, { Component } from 'react';
import { Button, Modal, ModalBody,} from 'react-bootstrap';
import { Label,Form, FormGroup } from 'bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
require("react-bootstrap/ModalHeader")


var config = {
  apiKey: "AIzaSyB_3GFbWLODZD_TquYwhfSlx1yVYTN2HmM",
  authDomain: "todo-app-b0f84.firebaseapp.com",
  projectId: "todo-app-b0f84",
  storageBucket: "todo-app-b0f84.appspot.com",
  messagingSenderId: "866818137596",
  appId: "1:866818137596:web:0f4ebe8b1b023b9536e679",
  measurementId: "G-527ZW96JJ8"
  };
  firebase.initializeApp(config);

class Athentication extends Component
{

    login(){
        const email = this.refs.email.value;
        const password = this.refs.pass.value;

        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,password);

        promise.then(user => {
            var logout = document.getElementById('logout');
            this.setState({err: "Welcome back! " + firebase.auth().currentUser.email});
            logout.classList.remove('hide');

            var login = document.getElementById('login');
            login.classList.add('hide');

            var signup = document.getElementById('signup');
            signup.classList.add('hide');

            var google = document.getElementById('google');
            google.classList.add('hide');

            var email = document.getElementById('email');
            email.classList.add('hide');

            var pass = document.getElementById('pass');
            pass.classList.add('hide');
        });

        promise.catch( e => {
            var error = e.message;

            this.setState({err: error});
        });        
    }


    

    logout(){       
        firebase.auth().signOut();

        var logout = document.getElementById('logout');

        this.setState({err: "Thank you see you soon"});

        logout.classList.add('hide');

        this.refs.email.value = "";
        this.refs.pass.value = "";

            var login = document.getElementById('login');
            login.classList.remove('hide');

            var signup = document.getElementById('signup');
            signup.classList.remove('hide');

            var google = document.getElementById('google');
            google.classList.remove('hide');

            var email = document.getElementById('email');
            email.classList.remove('hide');

            var pass = document.getElementById('pass');
            pass.classList.remove('hide');
    }


    

    signup(){
        const email = this.refs.email.value;
        const password = this.refs.pass.value;

        const auth = firebase.auth();

       const promise = auth.createUserWithEmailAndPassword(email, password);

       promise
       .then(user => {
           var error = "Signup Successfuly " + firebase.auth().currentUser.email + " Please Login";
           firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
            email: firebase.auth().currentUser.email
       });
           this.setState({ err: error });
           
       });    

       promise
       .catch(e => {
           var error = e.message;
           this.setState({ err: error });
       });
    }


  

    google(){
        var provider = new firebase.auth.GoogleAuthProvider();
        var promise = firebase.auth().signInWithPopup(provider);

        promise.then(result => {
            var user = result.user;
        firebase.database().ref('users/'+user.uid).set({
            email: user.email,
            nmae: user.displayName
        });

        var logout =document.getElementById('logout');
        this.setState({err: "Welcome back! " + firebase.auth().currentUser.email});
        logout.classList.remove('hide');

            var login = document.getElementById('login');
            login.classList.add('hide');

            var signup = document.getElementById('signup');
            signup.classList.add('hide');

            var google = document.getElementById('google');
            google.classList.add('hide');

            var email = document.getElementById('email');
            email.classList.add('hide');

            var pass = document.getElementById('pass');
            pass.classList.add('hide');
    });

    promise.catch(e => {
        var msg = e.message;
        this.setState({err:msg});
    });
    }


    constructor(props){
        super(props);
        this.state = { err: ''};

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.signup = this.signup.bind(this);
        this.google = this.google.bind(this);

    }


    render(){
        return(
            <div>
                <div>
                <Button outline  className="bg-white" onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} fade={false}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <input type="email" id="email" name="username"  ref="email" placeholder="Enter your email" required/> />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <input type="password" id="password" name="password"innerRef={(input) => this.password = input}  />
                        </FormGroup>
                        <FormGroup check>
                        <div className="col-sm-1">
                                <input type="checkbox" name="remember"innerRef={(input) => this.remember = input}  />
                                </div>
                            <Label check>
                                
                                <div className="col-sm-6 offset-sm-1">
                                <p>Remember Me</p></div>
                            </Label>
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
            </div>
                <br/>
                <input type="password" id="pass" ref="pass" placeholder="Enter your password" required/><br/>
                <p>{this.state.err}</p>
                <button onClick={this.login} id="login">Login</button>
                <button onClick={this.logout} id="logout" className="hide">Logout</button>
                <button onClick={this.signup} id="signup">Sign up</button><br />
                <button onClick={this.google} id="google" className="google">Sign in with google</button>


            </div>
        );
    }
}

export default Athentication;
