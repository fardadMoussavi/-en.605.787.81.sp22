// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

// STEP 1:
// Wrap the entire contents of script.js inside of an IIFE
// See Lecture 52, part 2
// (Note, Step 2 will be done in the SpeakHello.js file.)


(function () {

  var originalValue = {  hello: [], bye: [], };

  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];


  for (const name of names)
  {  
    var firstLetter = name.charAt(0).toLowerCase(); // get first name and converte to lower case
    // decide which  method to call
    if (firstLetter === "j") 
      byeSpeaker.speak(name);  
    else
      helloSpeaker.speak(name);  
  }

  // constructor for  the map function
  var mapConstructNames = function (name) {
    var firstLetter = name.charAt(0).toLowerCase();
    if(firstLetter === "j")
      return byeSpeaker.speakSimple(name);
    else
      return helloSpeaker.speakSimple(name);
  };

  // transform elements
  console.log("<----- BEFORE REDUCE --->");
  var transfomedElements = names.map(mapConstructNames);
  transfomedElements.forEach(element =>
  {    
    console.log(element);
  });

  // reducer function to be called on elements, initial value used here as first call back and later elements added to arrays
  const reducer = function (previousValue, currentValue)
  {
    if (currentValue.charAt(0).toLowerCase() == "h")    
      previousValue.hello.push(currentValue);    
    else    
      previousValue.bye.push(currentValue);
    
    return previousValue;
  };

  //call reducer on each element
  names.map(mapConstructNames).reduce(reducer, originalValue);
  console.log("<----- After REDUCE --->");


  console.log("<------HELLOS---->");
  for (i = 0; i < originalValue.hello.length; i++)
  {
    console.log(originalValue.hello[i]);
  }

  console.log("<------Byes---->");
  for (i = 0; i < originalValue.bye.length; i++)
  {
    console.log(originalValue.bye[i]);
  }
})();
