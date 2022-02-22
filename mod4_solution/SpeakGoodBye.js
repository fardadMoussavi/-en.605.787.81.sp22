(function (window) 
{ // Open the IIFE

  function SpeakGoodBye(){ }  
  var byeSpeaker = new SpeakGoodBye();  
  var speakWord = "Good Bye";

  SpeakGoodBye.prototype.speak = function(name)
  {
    console.log(speakWord + " " + name);
  };
  
  SpeakGoodBye.prototype.speakSimple = function(name)
  {
    var simpleSpeak = speakWord + " " + name;
    return simpleSpeak;
  };
  
  window.byeSpeaker = byeSpeaker;
  
  })(window);