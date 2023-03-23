// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.followers = {};
    this.currentID = 1;
  }

  addUser(name) {
    // Your code here
    const userID = this.currentID;
    this.users[userID] = {
      id: userID,
      name: name
    };
    this.follows[userID] = new Set();
    this.currentID += 1;
    return userID;
  }

  getUser(userID) {
    // Your code here
    return this.users.hasOwnProperty(userID) ? this.users[userID] : null;
  }

  follow(userID1, userID2) {
    // Your code here
    if (this.users.hasOwnProperty(userID1) && this.users.hasOwnProperty(userID2)) {
      if (this.follows[userID1].hasOwnProperty(userID2)) {
        return `${userID1} already follows ${userID2}`;
      }
      this.follows[userID1].add(userID2);
      return true;
    } else {
      return false;
    }
  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID];
  }

  getFollowers(userID) {
    // Your code here
    if (!this.users.hasOwnProperty(userID)) {
      return null;
    }

    const followers = new Set();
    for (const [followerID, follows] of Object.entries(this.follows)) {
      if (follows.has(userID)) {
        followers.add(parseInt(followerID));
      }
    }
    return followers;
    
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    if (!this.users.hasOwnProperty(userID)) {
      return null;
    }
  
    let recommended = new Set();
    let visited = new Set([userID]);
    let currentDegreeUsers = Array.from(this.getFollows(userID)); // [follows. follows, follows]
  
    for (let i = 1; i <= degrees; i++) {
      let nextDegreeUsers = [];
  
      for (const currentUserID of currentDegreeUsers) {
        if (!visited.has(currentUserID)) {
          visited.add(currentUserID);
          let currentUserFollows = this.getFollows(currentUserID);
  
          for (const followID of currentUserFollows) {
            if (followID !== userID && !visited.has(followID)) {
              nextDegreeUsers.push(followID);
  
              // Add users to recommended if the degree is equal to or greater than 1
              if (i >= 1) {
                recommended.add(followID);
              }
            }
          }
        }
      }
      currentDegreeUsers = nextDegreeUsers;
    }
  
    return Array.from(recommended);
  }
}


const miniFaceBook = new SocialNetwork();
miniFaceBook.addUser('Nick');
miniFaceBook.addUser('Claudia');
let user1 = miniFaceBook.getUser(1);
let user2 = miniFaceBook.getUser(2);



module.exports = SocialNetwork;