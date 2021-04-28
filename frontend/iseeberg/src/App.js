import React from 'react'

import logo from './images/logo.png'; 
import './App.css';

// Using icon library
import Icon from '@mdi/react'
import { mdiMagnify, mdiMapMarkerOutline } from '@mdi/js';

// import { useState, Component } from 'react';

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
      user: null,
      spots: null
    }
  }

  signOut() {
    firebase.auth().signOut()
  }

  async componentDidMount() {

    const token = await firebase.auth().currentUser?.getIdToken();
    console.log(token);

    let backendUrl = 'https://ijtzuxbwni.execute-api.us-east-1.amazonaws.com/dev'

    try {
      if (window.location.href.includes('localhost')) {
        console.log("local env");
        
        // if we are on a local environment, use the localhost URL (my react app is running on 4000 instead)
        backendUrl = 'http://localhost:3000/dev'
      }

      const response = await fetch(backendUrl + '/spots', {
        headers: {
          "Authorization": token,
        },
      });
      
      if (response.status === 401) {
        console.log( "Unauthorized" );
      } else {
        console.log( "Authorized! 🍻" );
        const data = await response.json();
        this.setState({ spots: data });
      }

    } catch (err) {
      console.error(err);
    }
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
        <div class="hello-plus-card">
            <div class="columns is-vcentered reverse-columns">
              <div class="column is-5-fullhd is-offset-1-fullhd
                  is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet
                  is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen" data-aos="fade-down">
                <div class="content hello-user">
                  <p> Hello, {this.props.user.displayName} 🐻</p>
                </div>
              </div>
            </div>
            
            {/* <div class="columns is-vcentered reverse-columns">
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
            </div> */}

            <div class="columns is-vcentered reverse-columns">
              <div class="column is-4-fullhd is-offset-1-fullhd
                  is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet
                  is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen" data-aos="fade-down">
                    {
                      this.state.spots && this.state.spots.map(spot => {
                        return (
                            <div class="card">
                              <div class="card-image">
                                <figure class="image is-4by3">
                                  <img src={spot.photourl} alt="Placeholder image"></img>
                                </figure>
                              </div>
                              <div class="card-content">
                                <div class="media">
                                  <div class="media-left">
                                    <figure class="image is-48x48">
                                      <img src={spot.contributor.avatar} alt="Placeholder image"></img>
                                    </figure>
                                  </div>
                                  <div class="media-content">
                                    <p class="title is-5 username">{spot.contributor.username}</p>
                                    
                                    <p class="subtitle is-7"><Icon class="subtitle is-7" path={mdiMapMarkerOutline} title="" color="#94B1DD" size="2em"/>{spot.address}</p>
                                  </div>
                                </div>

                                <div class="content">
                                  {spot.description}
                                  {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
                                </div>
                              </div>
                            </div>
                        )
                      })
                    }
              </div>
                
              <div class="column is-5-fullhd is-offset-1-fullhd
                  is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet
                  is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen" data-aos="fade-down">
              </div>
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
