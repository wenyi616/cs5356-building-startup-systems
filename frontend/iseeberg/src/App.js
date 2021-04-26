import React from 'react'

import logo from './images/logo.png'; 
import './App.css';

// Using icon library
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js';

import { useState, Component } from 'react';

// Import FirebaseAuth and firebase.
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyAsljGpZeNAFLEpWEO7GgqfdgQsnhSVN5c",
  authDomain: "iseeberg-cs5356.firebaseapp.com",
  projectId: "iseeberg-cs5356",
  storageBucket: "iseeberg-cs5356.appspot.com",
  messagingSenderId: "579934816342",
  appId: "1:579934816342:web:e92a83a5b0c7402e5153f7"
};

firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',

  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};



class SignedIn extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      user: null
    }
  }

  signOut() {
    firebase.auth().signOut()
  }
  
  render() {
    return (  
    <section class="hero is-fullheight hero-bg">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="">
            <img class="logo-nav" src={logo}></img>
          </a>
        </div>
  
        <div class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item">Home</a>
            <a class="navbar-item">Stamps</a>            
            <a class="navbar-item">My trips</a>
            <a class="navbar-item sign-out" onClick={() => this.signOut()}>Sign Out</a>
          </div>
        </div>
      </nav>

      <div class="hero-body">
        <div class="container">
        <div class="search">
            <div class="columns is-vcentered reverse-columns">
              <div class="column is-5-fullhd is-offset-1-fullhd
              is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet
              is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen" data-aos="fade-down">
                <div class="content hello-user">
                  <p> Hello, {this.props.user.displayName} 🐻</p>
                </div>
              </div>
            
            </div>
                <div class="columns is-vcentered reverse-columns">
                  <div class="column is-5-fullhd is-offset-1-fullhd
                  is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet
                  is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen" data-aos="fade-down">
                    <input class="input is-rounded search-input" type="text" placeholder="WHERE ARE WE GOING NEXT?"></input>
                  </div>
                
                  <button class="button search-button">
                    <span class="icon">
                    <Icon path={mdiMagnify} title="" color="#94B1DD" size="2em"/>
                    </span>
                  </button>
                </div>
                </div>
          
        </div>
      </div>
    </section>
    );
  }
}


class App extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      user: null
    }
    
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      } else {
        this.setState({user:null});
      }
    });
  }
  
  render() {

    if (this.state.user) {
      return (
        <SignedIn user={this.state.user}/>
      )
    }

    // when user is not signed in
    return (  
    <section class="hero is-fullheight hero-bg">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="">
            <img class="logo-nav" src={logo}></img>
          </a>
        </div>
  
        <div class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item">Home</a>
            <a class="navbar-item">Stamps</a>            
            <a class="navbar-item">My trips</a>
            <a class="navbar-item">Sign in</a>
          </div>
        </div>
      </nav>
      
      <div class="auth-box">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>

      <div class="hero-body">
        <div class="container">
          <div class="search">
            <div class="columns is-vcentered reverse-columns">
              <div class="column is-5-fullhd is-offset-1-fullhd
              is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet
              is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen" data-aos="fade-down">
                <input class="input is-rounded search-input" type="text" placeholder="WHERE ARE WE GOING NEXT?"></input>
              </div>
            
              <button class="button search-button">
                <span class="icon">
                <Icon path={mdiMagnify} title="" color="#94B1DD" size="2em"/>
                </span>
              </button>
            </div>
            </div>
          </div>
      </div>
    </section>
    );
  }
}

export default App;
