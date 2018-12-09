import React from 'react'
import Header from '../Header/header'
import ImageUploader from 'react-images-upload';
import Tag from '../Listing/tag'
import fire from '../Fire/fire'
import { Link } from 'react-router-dom'
import './edit_listing.css'

export class EditListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
    this.handleChange = this.handleChange.bind(this);
    this.loadEditListing = this.loadEditListing.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.tagCallback = this.tagCallback.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      image: [],
      tags: ""
    }
  }

  componentDidMount(){
      const { history } = this.props;
      fire.auth().onAuthStateChanged((user) => {
          // If the user is detected, save it to the current state
          if (user) {
              this.setState({user});
              this.loadEditListing(this.props);
              //localStorage.setItem('user',user.uid);
          }
          // Otherwise set the current user to null
          else {
              this.setState({user: null});
              history.push("/");
              //localStorage.removeItem('user');
          }
      })
  }
  componentWillReceiveProps(props) {
    this.loadEditListing(props);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  loadEditListing(props) {
    const { history } = this.props;
    this.setState({loaded: false});
    var Listing_ID = props.location.search.length >= 4 ? props.location.search.substring(4) : "";
    this.setState({id: Listing_ID})
    fire.auth().onAuthStateChanged((user) => {
      if(user) {

        // Load in the listing iff it exists and was created by the user
        fire.database().ref().once("value", snapshot => {
          if(!(snapshot.child("Listing/" + Listing_ID).exists()) || Listing_ID === "") {
            history.push("/home");
            alert("Listing not found!");
          }
          else if (snapshot.child("Users/" + user.uid + "/Posted_Listings").val().split(",").indexOf("" + Listing_ID) === -1) {
            history.push("/home");
            alert("You can only edit active listings made by you!");
          }
          else {
            // Confirmed the listing exists and is the user's, now just load it in
            var title = snapshot.child("Listing/" + Listing_ID + "/Listing_Title").val();
            var price = snapshot.child("Listing/" + Listing_ID + "/Listing_Price").val();
            var content = snapshot.child("Listing/" + Listing_ID + "/Listing_Description").val();
            var tags = snapshot.child("Listing/" + Listing_ID + "/Listing_Tag").val();
            var img = snapshot.child("Listing/" + Listing_ID + "/Listing_Pic").val();
            this.setState({loaded: true, tags, image: img, title, price, content}, () => {
              document.getElementById("listing-title").value = title;
              document.getElementById("listing-price").value = price;
              document.getElementById("listing-content").value = content;
            });
          }
        });
      }
      else {
        this.setState({user: null});
        history.push("/");
      }
    });
  }

  handleSaveChanges() {
    var Listing_ID = this.state.id;
    const { history } = this.props;
    fire.database().ref().child("Listing/" + Listing_ID).update({Listing_Title: this.state.title, Listing_Price: this.state.price,
	    	Listing_Description: this.state.content, Listing_Tag: this.state.tags, Listing_Pic: this.state.image}, () => {
      history.push("/home");
    });
  }

  tagCallback = (tagList) => {
    var separator = ",";
    var tags = tagList.join(separator);
    this.setState({tags: tags});
  }

  // upload the image
  onDrop(file, picture) {
    //when there was a image, concat the new one
    console.log(this.state.image);
    if (this.state.image){
      this.setState({image: this.state.image.concat(picture)});
    }
    else{
      this.setState({image:picture});
    }
  }

  render() {
    return (
      <div className="center">
          <Header />
          {this.state.loaded?
          <form className="listing-form" autoComplete="off">
              <div className="content-box">
                  <h3 id="edit-listing-title" className="basic-title">Edit Listing</h3>

                  <label htmlFor="listing-title"><strong>Title:</strong></label> <br />
                  <input type="text" onChange={this.handleChange} className="basic-input" name="title" id="listing-title" maxLength="26" defaultValue="Loading..." required/><br />

                  <label htmlFor="listing-price"><strong>Price:</strong></label> <br />
                  <input type="text" onChange={this.handleChange} className="basic-input" name="price" id="listing-price" maxLength="7" defaultValue="Loading..."/>

                  {this.state.image ?
                    <img className="listing-img" src ={this.state.image[this.state.image.length-1]} alt="List" /> : null
                  }
                  <ImageUploader
                    withIcon={false}
                    withPreview ={false}
                    buttonText='Upload Picture'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    singleImage={true}
                  />

                  <label htmlFor="listing-content"><strong>Describe your listing:</strong></label> <br />
                  <textarea onChange={this.handleChange} name="content" id="listing-content" maxLength="175" defaultValue="Loading..."/> <br />

                  <label htmlFor="listing-tag"><strong>Add Tags:</strong></label> <br />
	          {this.state.loaded && <Tag callbackFunction={this.tagCallback} tags={this.state.tags}/>} <br />

                  <br />

                  <Link to="/home"><button disabled={!this.state.loaded} onClick={this.handleSaveChanges} className="basic-button" id="create-listing-button">Save Changes</button></Link>
              </div>
          </form>
          : null}

      </div>
    );
  }
}
