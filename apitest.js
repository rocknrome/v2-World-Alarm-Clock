//---------------------------------------------------//
//  API TEST FILE TO MAKE SURE API RESPONSE RECEIVED //
//---------------------------------------------------//

console.log('Testing jQuery loaded');

$(document).ready(function() {
    function getCurrentTime(timeZone) {
        // Declaring the API URL with desired time zone
        let apiUrl = `http://worldtimeapi.org/api/timezone/${timeZone}`;

        // Making an AJAX request to WorldTimeAPI
        $.ajax({
            url: apiUrl,
            success: function(response) {
                // The returns JSON object
                console.log('API Response:', response);

                // Loging the current datetime
                console.log('Current DateTime:', response.datetime);
            },
            error: function(error) {
                console.log('Error fetching data:', error);
            }
        });
    }

    // Calling the function with a specific time zone
    getCurrentTime('America/New_York');
});
