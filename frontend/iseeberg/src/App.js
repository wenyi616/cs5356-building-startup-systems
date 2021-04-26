import logo from './images/logo.png'; 
import './App.css';

import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js';

// Import FirebaseAuth and firebase.
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import { useState } from 'react';
import Popup from './Popup';


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


function signedInComponent() {
  return (
      <section class="hero is-white is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns  is-vcentered reverse-columns">
              <div class="column is-5-fullhd is-offset-1-fullhd
              is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet
              is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen" data-aos="fade-down">     
                <h1 class="title titled is-1 mb-6">
                  Hello User
                </h1>
                <h2 class="subtitle subtitled">
                  You are now signed in. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum cupiditate dolorum vitae dolores
                  nesciunt totam magni quas.
                </h2>
              </div>
              <div class="column is-5-fullhd is-offset-1-fullhd
              is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet
              is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen" data-aos="fade-down"> 
                <figure class="image is-square">
                  <img src={logo}></img>
                </figure>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}


function App() {

  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }


  return (
    <div className="App">
      <header className="App-header">
      </header>

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
          <a class="navbar-item" onClick={togglePopup}>Sign in</a>
          {isOpen && <Popup
              content={<>
                {/* Content in the popup */}
                <div>
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                </div>
              </>}
              handleClose={togglePopup}
            />}
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

    </div>
  );
}

export default App;
