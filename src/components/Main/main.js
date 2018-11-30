import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { CreateListing } from '../CreateListing/create_listing'
import { ForgotPassword } from '../ForgotPassword/forgot_password'
import { Home } from '../Home/home'
import { Login } from '../Login/login'
import { Messages } from '../Messages/messages'
import { MyListings } from '../MyListings/my_listings'
import { Profile } from '../Profile/profile'
import { EditProfile } from '../Profile/edit_profile'
import { EditListing } from '../EditListing/edit_listing'
import { Review } from '../Review/review'
import { WriteReview } from '../Review/write_review'
import { Register } from '../Register/register'
import { TransactionHistory } from '../TransactionHistory/transaction_history'
import fire from '../Fire/fire'
import firebase from 'firebase';

// Register the database for reference in other files
const RegisterFB = () => (
  <Register db={firebase} />
)

// Register database for listings for reference in other files
const CreateListingFB = () => (
  <CreateListing db={firebase} />
)

export class Main extends React.Component {
  constructor(props) {
    super(props);
    /* Save the state of the current user that way we can pull user data
      and reference it in other files later on down the road
    */
    this.State = {
      user:{},
    }
  }

  // If the component gets mounted successfully, authenticate the user
  componentDidMount(){
    this.authListener();
  }

  // Create a method to autehnticate the user with our existing database
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      // If the user is detected, save it to the current state
      if(user) {
        this.setState({user});
        //localStorage.setItem('user',user.uid);
      }
      // Otherwise set the current user to null
      else {
        this.setState({user: null});
        //localStorage.removeItem('user');
      }
    });
  }


  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/create_listing' component={CreateListingFB}/>
        <Route path='/forgot_password' component={ForgotPassword}/>
        <Route path='/home' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/messages' component={Messages}/>
        <Route path='/my_listings' component={MyListings}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/edit_profile' component={EditProfile}/>
        <Route path='/register' component={RegisterFB}/>
        <Route path='/transaction_history' component={TransactionHistory}/>
        <Route path='/edit_listing' component={EditListing}/>
        <Route path='/review' component={Review}/>
        <Route path='/write_review' component={WriteReview}/>
      </Switch>
    )
  }
}

export default Main
