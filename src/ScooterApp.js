const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor() {
    this.stations = {
      "Location1": [],
      "Location2": [],
      "Location3": []
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers.hasOwnProperty(username)) {
      throw new Error("User already registered");
    }

    if (age < 18) {
      throw new Error("User must be 18 or older");
    }

    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log(`User ${username} has been registered`);
    return user;
  }

  loginUser(username, password) {
    if (!this.registeredUsers.hasOwnProperty(username)) {
      throw new Error("Username is incorrect");
    }

    const user = this.registeredUsers[username];
    user.login(password);
    console.log(`User ${username} has been logged in`);
  }

  logoutUser(username) {
    if (!this.registeredUsers.hasOwnProperty(username)) {
      throw new Error("No such user is logged in");
    }

    const user = this.registeredUsers[username];
    user.logout();
    console.log(`User ${username} has been logged out`);
  }

  createScooter(station) {
    if (!this.stations.hasOwnProperty(station)) {
      throw new Error("No such station");
    }

    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log(`Created new scooter at ${station}`);
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations.hasOwnProperty(station)) {
      throw new Error("No such station");
    }

    if (scooter.station === station) {
      throw new Error("Scooter already at station");
    }

    const index = this.stations[scooter.station].indexOf(scooter);
    if (index !== -1) {
      this.stations[scooter.station].splice(index, 1);
    }

    scooter.dock(station);
    this.stations[station].push(scooter);
    console.log("Scooter is docked");
  }

  rentScooter(scooter, user) {
    if (scooter.user !== null) {
      throw new Error("Scooter already rented");
    }

    const stationScooters = this.stations[scooter.station];
    const index = stationScooters.indexOf(scooter);
    if (index !== -1) {
      stationScooters.splice(index, 1);
      scooter.rent(user);
      console.log("Scooter is rented");
    } else {
      throw new Error("Scooter not found");
    }
  }

  print() {
    console.log("Registered users:");
    for (const username in this.registeredUsers) {
      console.log(`- ${username}`);
    }

    console.log("Stations:");
    for (const station in this.stations) {
      console.log(`- ${station}: ${this.stations[station].length} scooter(s)`);
    }
  }
}


module.exports = ScooterApp

