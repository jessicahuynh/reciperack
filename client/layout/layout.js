Template.layout.helpers({
	userid:function() {
		return Meteor.userId();
	}
});

Template.layout.events({
	'click #speak':function(event){
		event.preventDefault();

		$("#speechText").show(350);
		startDictation(event);
	},
	'click #closeSpeechText':function(event){
		event.preventDefault();
		$("#speechText").hide(350);
	}
});

/*  This code comes from this blog post by Amit Agarwal
  http://ctrlq.org/code/19680-html5-web-speech-api
  */

  var final_transcript = '';
  var recognizing = false;

  if ('webkitSpeechRecognition' in window) {
  	console.log("webkit is available!");
  	var recognition = new webkitSpeechRecognition();
  	recognition.continuous = true;
  	recognition.interimResults = true;

  	recognition.onstart = function() {
  		recognizing = true;
  	};

  	recognition.onerror = function(event) {
  		console.log(event.error);
  	};

  	recognition.onend = function() {
  		recognizing = false;
  	};

  	recognition.onresult = function(event) {
  		myevent = event;
  		var interim_transcript = '';
  		for (var i = event.resultIndex; i < event.results.length; ++i) {
  			console.log("i="+i);
  			if (event.results[i][0].transcript.indexOf("add recipe") != -1 || event.results[i][0].transcript.indexOf("add a recipe") != -1) {
  				recognition.stop();
  				recognizing = false;
  				if (Meteor.userId() == null) {
  					alert("You should probably make an account or log in to add a recipe!");
  				}
  				else {
	  				Router.go('/addRecipe');
	  			}
  				return;
  			}
  			if (event.results[i][0].transcript.indexOf("my profile") != -1) {
  				recognition.stop();
  				recognizing = false;
  				if (Meteor.userId() == null) {
  					alert("You should probably make an account or log in to view your profile!");
  				}
  				else {
	  				Router.go('/profile/'+Meteor.userId());
	  			}
  				return;
  			}
  			if (event.results[i][0].transcript.indexOf("my recipes") != -1) {
  				recognition.stop();
  				recognizing = false;
  				if (Meteor.userId() == null) {
  					alert("You should probably make an account or log in to look at your recipes!");
  				}
  				else {
	  				Router.go('/myrecipes');
	  			}
  				return;
  			}
  			if (event.results[i][0].transcript.indexOf("all recipes") != -1) {
  				recognition.stop();
  				recognizing = false;
	  			Router.go('/allrecipes');
	  			
  				return;
  			}

  			if (event.results[i].isFinal) {
  				final_transcript += 
  				Math.round(100*event.results[i][0].confidence)+
  				"% &mdash; "+
  				capitalize(event.results[i][0].transcript.trim()) +".\n";
  				console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));

  			} else {
  				interim_transcript += event.results[i][0].transcript;
  				console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
  			}

  			// if (event.results[i][0].transcript.indexOf("read it back") != -1) {
  			// 	recognition.stop();
  			// 	recognizing = false;

  			// 	readReturn = new SpeechSynthesisUtterance(event.results[i][0].transcript);
  			// 	window.speechSynthesis.speak(readReturn);

  			// 	return;
  			// }
  		}
      //final_transcript = capitalize(final_transcript);
      final_span.innerHTML = linebreak(final_transcript);
      interim_span.innerHTML = linebreak(interim_transcript);

  };
}


var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
	return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function capitalize(s) {
	return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
}

function startDictation(event) {
	if (recognizing) {
		recognition.stop();
		return;
	}
	final_transcript = '';
	recognition.lang = 'en-GB';
	recognition.start();
	final_span.innerHTML = '';
	interim_span.innerHTML = '';
}

