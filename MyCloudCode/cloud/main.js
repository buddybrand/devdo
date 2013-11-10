Parse.Cloud.define("overall", function(request, response) {
	var Todo = Parse.Object.extend("Todo");
	var query = new Parse.Query(Todo);
	query.count({
	  success: function(count) {
	    console.log("Es sind insgesamt " + count + " Notizen. ");
		response.success({overall: count});
	  },
	  error: function(model, error) {
	    // The request failed
		response.error(error);
	  }
	});
});