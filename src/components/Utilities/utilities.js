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
      
      console.log("Test here", list);
      // Find and remove the ID
      let removeIndex = list.indexOf("" + itemID);
      if(removeIndex != -1) {
        list.splice(removeIndex, 1);
        console.log("Remove", list);
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
        console.log("Remove", listInterest);
      }
      listInterest = listInterest.join(separator);
    }
    console.log(userInterestDB.val());
    fire.database().ref("Users").child(userID).child("Interest_Listings").set(listInterest);
    
    // Get a list of all conversations the user is in
    let convs = snapshot.child("Users/" + userID + "/Conversations").val().split(",");
    console.log("Part 1", convs);
    
    // Iterate through every conversation until the one with matching seller id is found
    var i;
    for(i = 0; i < convs.length; i++) {
      console.log("Part 2", snapshot.child("/Conversation/" + convs[i] + "/Seller_ID").val(), sellerID);
      if (snapshot.child("/Conversation/" + convs[i] + "/Seller_ID").val() == sellerID) {
        db.child("/Conversation/" + convs[i] + "/Seller_ID").remove();
        console.log("Success");
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
      list = list.join(separator);
      
      // if the list is size 0, set it to -1.
    }
    db.child(listName).set(list);
  });
}

// Returns true or false depending on if a user has marked an item as interested
// userID - The user whom is or is not interested
// listingID - The listing of which the user is or is not interested in
export function checkInterest(userID, listingID) {
  var db = fire.database().ref();
  db.once("value").then(function(snapshot) {
    if(snapshot.child("Users/" + userID + "/Interest_Listings").exists()) {
      let interested = snapshot.child("Users/" + userID + "/Interest_Listings").val().split(",");
      
      var i;
      for (i = 0; i < interested.length; i++) {
        if (interested[i] == listingID) {
          return true;
        }
      }
      return false;
    }
  });
}