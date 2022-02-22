
(function (window)
{ 

  function SpeakHello() { }
  
  var helloSpeaker = new SpeakHello();
  
  var speakWord = "Hello";
  
  SpeakHello.prototype.speak = function(name)
  {
    console.log(speakWord + " " + name);
  };
  
  SpeakHello.prototype.speakSimple = function(name)
  {
    var simpleSpeak = speakWord + " " + name;
    return simpleSpeak;
  };
  
  window.helloSpeaker = helloSpeaker;
  
  })(window);