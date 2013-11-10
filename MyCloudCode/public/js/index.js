$(document).ready(function() {
Parse.initialize("KEY", "SECRET");

Parse.FacebookUtils.init({
		appId      : 'APP_ID', // Facebook App ID
		channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
		status     : true, // check login status
		cookie     : true, // enable cookies to allow Parse to access the session
		xfbml      : true  // parse XFBML
});

FB.getLoginStatus(function(response) {
	if (response.status === 'connected') {
		read();
		overall();
	}
});


});

function login() {
	Parse.FacebookUtils.logIn(null, {
		success: function(user) {
			if (!user.existed()) {
				alert("User signed up and logged in through Facebook!");
			} else {
				alert("User logged in through Facebook!");
			}
			read();
			overall();
		},
		error: function(user, error) {
			alert("User cancelled the Facebook login or did not fully authorize.");
		}
	});
}
function save() {
	if (!Parse.User.current()) {
		return false;
	}
   
	var Todo = Parse.Object.extend("Todo");
	var todo = new Todo();

	todo.set("text", $("input").val());
	todo.set("user", Parse.User.current());
	todo.setACL(new Parse.ACL(Parse.User.current()));
	todo.save(null, {
		success: function(todo) {
			alert('New object created with objectId: ' + todo.id);
		},
		error: function(todo, error) {
			console.log(error);
			alert('Failed to create new object, with error code: ' + error.description);
		}
	});
}
function read() {
	var Todo = Parse.Object.extend("Todo");
	var query = new Parse.Query(Todo);
	query.equalTo("user", Parse.User.current());	
	query.descending("createdAt");
	query.find({
		success: function(todos) {
			// The object was retrieved successfully.
			for (var i = 0; i < todos.length; i++) {
				var todo = todos[i];
				$("ul").append($("<li/>").text(todo.get("text")))
			}
		},
		error: function(object, error) {
			// The object was not retrieved successfully.
			// error is a Parse.Error with an error code and description.
		}
	});
}

function overall() {
	Parse.Cloud.run('overall', {}, {
		success: function(result) {
			$('strong').text(result.overall);
		},
		error: function(modell, error) {
			alert(error)
		}
	});
}
 