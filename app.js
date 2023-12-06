// R'N'R   December 5, 2023

// Declaring variables
const $timezoneSelect = $('#timezone-select');
const $alarmTimeInput = $('#alarm-time');
const $setAlarmButton = $('#set-alarm');
const $alarmDisplay = $('#alarm-display');
let alarms = [];
const apiKey = 'i+sHjbBAVa3M0EDYqAYU2Q==dKhqIAd4jknJOPg1';

// List of cities for the timezone dropdown
const cities = ['London', 'Moscow', 'New York', 'Paris', 'Sydney', 'Tokyo'];

// Function to populate the dropdown with cities
function populateCityDropdown() {
    $timezoneSelect.empty();
    cities.forEach(city => {
        $timezoneSelect.append('<option value="' + city + '">' + city + '</option>');
    });
}
populateCityDropdown();

// Function to display alarms
function displayAlarms() {
    $alarmDisplay.empty();
    alarms.forEach((alarm, index) => {
        $alarmDisplay.append(`
            <div class="alarm">
                Alarm at ${alarm.time} in ${alarm.timezone}
                <button onclick="editAlarm(${index})">Edit</button>
                <button onclick="deleteAlarm(${index})">Delete</button>
            </div>
        `);
    });
}

// Set an alarm
$setAlarmButton.click(function() {
    const city = $timezoneSelect.val();
    fetchCityTime(city);
});

// Fetch city time using API
function fetchCityTime(city) {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/worldtime?city=' + city,
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
        success: function(result) {
            console.log(result)             //console logging the json as a confirmation
            const time = result.datetime;   // Assuming the API returns a datetime object
            alarms.push({ timezone: city, time: time });
            displayAlarms();
        },
        error: function ajaxError(jqXHR) {
            console.error('Error fetching time for city:', jqXHR.responseText);
        }
    });
}

// Edit an alarm
window.editAlarm = function(index) {
    const newTime = prompt("Enter new time (HH:MM format):", alarms[index].time);
    if(newTime) {
        alarms[index].time = newTime;
        displayAlarms();
    }
};

// Delete an alarm
window.deleteAlarm = function(index) {
    alarms.splice(index, 1);
    displayAlarms();
};

// Alarm triggering functionality to be implemented


