import fire from '../Fire/fire'

// removes from the appropriate list of the user
// userID - The user of the list you are removing from
// itemID - The ID of whatever you're removing
// listName - Which user list to remove from
export function removeFromUserList(userID, itemID, listName) {
  var separator = ",";
  var list = "-1";
  var db = fire.database().ref("Users").child(userID);
  
  db.once("value").then(function(snapshot) {
    if (snapshot.child(listName).exists()){
      list = snapshot.child(listName).val().split(separator);
      
      // Find and remove the ID
      let removeIndex = list.indexOf("" + itemID);
      if(removeIndex != -1) {
        list.splice(removeIndex, 1);
      }
      list = list.join(separator);
    }
    db.child(listName).set(list);
  });
}

// removes from the interested list of the user, which also removes the user's conversation in the same snapshot
// userID - The user of the list you are removing from
// itemID - The ID of whatever you're removing
// listName - Which user list to remove from
export function removeFromUserInterested(userID, itemID, sellerID) {
  var separator = ",";
  var listInterest = "-1";
  var db = fire.database().ref();
  
  db.once("value").then(function(snapshot) {
    let userInterestDB = snapshot.child("Users/" + userID + "/Interest_Listings");
    if (userInterestDB.exists()){
      listInterest = userInterestDB.val().split(separator);
      
      // Find and remove the ID
      let removeIndex = listInterest.indexOf("" + itemID);
      if(removeIndex != -1) {
        listInterest.splice(removeIndex, 1);
      }
      listInterest = listInterest.join(separator);
    }
    fire.database().ref("Users").child(userID).child("Interest_Listings").set(listInterest);
    
    // Get a list of all conversations the user is in
    let convs = snapshot.child("Users/" + userID + "/Conversations").val().split(",");
    let sellerconvs = snapshot.child("Users/" + sellerID + "/Conversations").val().split(",");
    
    // Iterate through every conversation until the one with matching seller id is found
    var i;
    for(i = 0; i < convs.length; i++) {
      if (snapshot.child("/Conversation/" + convs[i] + "/Seller_ID").val() == sellerID) {
        db.child("/Conversation/" + convs[i]).remove();
        
        // Remove the appropriate number from the user's conversation list
        convs.splice(i, 1);
        convs = convs.join(separator);
        db.child("Users/" + userID + "/Conversations").set(convs);
        
        // Remove the appropriate number from the seller's conversation list
        sellerconvs.splice(sellerconvs.indexOf(i), 1);
        sellerconvs = sellerconvs.join(separator);
        db.child("Users/" + sellerID + "/Conversations").set(sellerconvs);
        break;
      }
    }
  });
}

// adds to the appropriate list of the user
// userID - The user of the list you are adding to
// itemID - The ID of whatever you're adding
// listName - Which user list to add to
export function addToUserList(userID, itemID, listName) {
  var separator = ",";
  var list = "" + itemID;
  var db = fire.database().ref("Users").child(userID);
  
  db.once("value").then(function(snapshot) {
    // if other items in the list exist, concatenate to the list
    if (snapshot.child(listName).exists()){
      list = snapshot.child(listName).val().split(separator);
      
      // if this id is a duplicate, don't concatenate
      if(list.indexOf("" + itemID) == -1) {
        list = list.concat(itemID);
      }
      // Filter the list to remove any empty items in the list
      list = list.filter(function (el) {
        return el != "";
      });
      list = list.join(separator);
    }
    db.child(listName).set(list);
  });
}



// adds a message ID to the appropriate conversation
// convID - The conversation you are adding to
// itemID - The ID of whatever message is being added
export function addToConversationList(convID, messageID) {
  var separator = ",";
  var list = "" + messageID;
  var db = fire.database().ref().child("Conversation/" + convID);
  var listName = "Message_List";

  db.once("value").then(function(snapshot) {
    // if other items in the list exist, concatenate to the list
    if (snapshot.child(listName).exists()){
      list = snapshot.child(listName).val().split(separator);

    // if this id is a duplicate, don't concatenate    
    if(list.indexOf("" + messageID) == -1) {
        list = list.concat(messageID);
    }

    //Filter the list to remove any empty items in the list
    list = list.filter(function (el) {
      return el != "";
    });
    list = list.join(separator);
    }
    db.child(listName).set(list);
    
  });
}