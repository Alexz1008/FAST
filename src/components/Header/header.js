import React from 'react'
import { Link } from 'react-router-dom'
import './header.css';
import fire from '../Fire/fire'

// The Header creates links that can be used to navigate
// between routes.
export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

    handleLogout() {
       fire.auth().signOut().then(function() {
            console.log("Sign out successful");
        }, function(error) {
            // An error happened.
            console.log("ERROR: sign out unsuccessful");
        });
    }

  // If the component gets mounted successfully, authenticate the user
  componentDidMount(){
    const { history } = this.props;
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user, loaded:true});
      }
      // Otherwise set the current user to null
      else {
        this.setState({user: null});
        history.push("/");
        //localStorage.removeItem('user');
      }
    });
  }

    render() {
        return (
            <div>
              {this.state.loaded ?
              <div className="navbar">
                  <div className="navbar-left">
                      <Link to='/home'>
                          <div className="navbar-button">
                              <div className="navbar-text">Home</div>
                          </div>
                      </Link>
                      <Link to='/my_listings'>
                          <div className="navbar-button">
                              <div className="navbar-text">My Listings</div>
                          </div>
                      </Link>
                      <Link to={'/profile?uid=' + this.state.user.uid}>
                          <div className="navbar-button">
                              <div className="navbar-text">My Profile</div>
                          </div>
                      </Link>
                      <Link to='/transaction_history'>
                          <div className="navbar-button">
                              <div className="navbar-text">Transaction History</div>
                          </div>
                      </Link>
                      <Link to='/messages'>
                          <div className="navbar-button">
                              <div className="navbar-text">My Messages</div>
                          </div>
                      </Link>
                      <Link to='/create_listing'>
                          <div className="navbar-button">
                              <div className="navbar-text">Create Listing</div>
                          </div>
                      </Link>
                  </div>
                  <div className="navbar-right">
                      <div className="navbar-search">
                          <form action='/home' className="navbar-search-form">
                              <input type="text" name="search" className="navbar-search-input"/>
                              <button type="submit" className="navbar-search-button">
                                <img className="navbar-search-image"
                                src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"
                                alt="Search"/>
                              </button>
                          </form>
                      </div>
                      <Link to='' onClick={ () => this.handleLogout()}>
                          <div className='navbar-button'>
                              <div className="navbar-text">Logout</div>
                          </div>
                      </Link>
                  </div>
              </div>
                  :
              null}
            </div>

        )
    }
}

export default Header
