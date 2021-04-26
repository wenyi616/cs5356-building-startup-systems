// import logo from './logo.svg';
import logo from './images/logo.png'; 
import './App.css';

import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js';




function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section class="">
      </section>

      <section class="">

      </section>


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
