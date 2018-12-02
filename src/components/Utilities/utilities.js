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