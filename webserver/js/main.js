function Methods () {
  this.initialize.apply(this, arguments);
}

Methods.prototype = {
  initialize: function() {
    this.accessor = new Accessor(this);
  },
  start_speech_recognition: function() {
    var this_ = this;
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "ja-JP";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 10;

    recognition.onsoundstart = function(){
      console.log("soundstart");
    };

    recognition.onnomatch = function(){
      console.log("nomatch");
    };

    recognition.onerror= function(e){
      console.log("error");
      console.log(e);
      setTimeout(function() {
        recognition.start();
      }, 200);
    };

    recognition.onsoundend = function(){
      console.log("soundend");
      recognition.stop();
      setTimeout(function() {
        recognition.start();
      }, 200);
    };

    recognition.onresult = function(event){
      console.log(event);
      var results = event.results;
      if(results[results.length - 1].isFinal){
        console.log(results[results.length - 1][0].transcript);
        this_.accessor.tell({
          "name" : "result",
          "argu" : results[results.length - 1][0].transcript
        });
      }
    };

    recognition.start();
  }
};

var main = new Methods();
