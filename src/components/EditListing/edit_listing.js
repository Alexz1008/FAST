import React from 'react'
import Header from '../Header/header'
import ImageUploader from 'react-images-upload';
import Tag from '../Listing/tag'

const EditListing = () => (
    <div class="center">
        <form className="listing-form" autocomplete="off">
            <Header />
            <div class="content-box">
                <h3 id="edit-listing-title" class="basic-title">Edit Listing</h3>

                <label for="listing-title"><strong>Title:</strong></label> <br />
                <input type="text" class="basic-input" name="listing-title" id="listing-title" placeholder="Buy this banana." required/> <br />

                <label for="listing-price"><strong>Price:</strong></label> <br />
                <input type="text" class="basic-input" name="listing-price" id="listing-price" placeholder="$1,000"/>

                <ImageUploader
                    withIcon={false}
                    buttonText='Upload Picture'
                    // onChange={e => this.setState({picture: e.target.picture})}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />

                <label for="listing-content"><strong>Describe your listing:</strong></label> <br />
                <textarea id="listing-content" placeholder="This banana is really cool! Buy it!"/> <br />

		<label for="listing-tag"><strong>Add Tags:</strong></label> <br />
		<Tag /> <br />

                <br />

                <button type="submit" class="basic-button" id="create-listing-button">Save Changes</button> <br />

            </div>
        </form>
    </div>
)

export default EditListing
