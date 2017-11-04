var five = require("johnny-five"),
  board, button;
var firebase = require("firebase");

board = new five.Board();

board.on("ready", function() {

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  button = new five.Button(4);
  var led = new five.Led(12);
  
    // Initialize Firebase
  var config = {
    apiKey: "your-api-key",
    authDomain: "your-authDomain",
    databaseURL: "your-databaseURL",
    storageBucket: "Your-storageBucket",
    messagingSenderId: "your-messagingSenderId"
  };
  firebase.initializeApp(config);
  
  var myFirebaseRef = firebase.database().ref();
  
  // "down" the button is pressed
  button.on("down", function() {
    console.log("down");
	//led.on();
	myFirebaseRef.set("down");
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
	//led.off();
	myFirebaseRef.set("up");
  });
  
  myFirebaseRef.on("value",function(snapshot){
	  var buttonState = snapshot.val();
	  
	  if(buttonState == "down"){
		  led.on();
	  }else{
		  led.off();
	  }
  });
  
});