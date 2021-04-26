// import logo from './logo.svg';
import logo from './images/logo.png'; 
import searchButton from './images/search-button.png'; 
import './App.css';


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
            <div class="column
            is-10-mobile is-offset-1-mobile
            is-10-tablet is-offset-1-tablet
            is-5-desktop is-offset-1-desktop
            is-5-widescreen is-offset-1-widescreen
            is-5-fullhd is-offset-1-fullhd" data-aos="fade-down">
              {/* <h1 class="title titled is-1 mb-6">
                absurd illustrations that make sense
              </h1>
              <h2 class=" subtitled subtitle has-text-grey is-4 has-text-weight-normal is-family-sans-serif">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum cupiditate dolorum vitae dolores
                nesciunt totam magni quas.
              </h2>
              <div class="buttons">
                <button class="button is-black">Download</button>
                <button class="button">Subscribe</button>
              </div> */}

              <input class="input is-rounded search-input" type="text" placeholder="WHERE ARE WE GOING NEXT?"></input>

            </div>
          
            <div class="column search-button" data-aos="fade-down">
              <img class="" src={searchButton}></img>
            </div>
          </div>
          </div>
        </div>
    </div>
  </section>

    </div>
  );
}

export default App;
