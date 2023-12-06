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

// Function to display alarms in 12-hour format
function displayAlarms() {
    $alarmDisplay.empty();
    alarms.forEach((alarm, index) => {
        const formattedTime = moment(alarm.time, 'HH:mm').format('hh:mm A');    // Converting to 12-hour format
        $alarmDisplay.append(`
            <div class="alarm">
                Alarm at ${formattedTime} in ${alarm.timezone}
                <button onclick="deleteAlarm(${index})">Delete</button>
            </div>
        `);
    });
}

// Set an alarm
$setAlarmButton.click(function() {
    const city = $timezoneSelect.val();
    const selectedTime = $alarmTimeInput.val();     // Get the user-selected time
    if (selectedTime) {
        alarms.push({ timezone: city, time: selectedTime });
        displayAlarms();
    } else {
        alert("Please select a time for the alarm.");
    }
});

// Delete an alarm
window.deleteAlarm = function(index) {
    alarms.splice(index, 1);
    displayAlarms();
};

// Alarm triggering functionality
function checkAlarms() {
    alarms.forEach((alarm, index) => {
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/worldtime?city=' + alarm.timezone,
            headers: { 'X-Api-Key': apiKey },
            contentType: 'application/json',
            success: function(result) {
                console.log(`Remote local time is: `, result.datetime);
                const cityTime = moment(result.datetime); // Assuming the API returns the current datetime of the city
                const alarmTime = moment(alarm.time, 'HH:mm');

                if (cityTime.format('hh:mm A') === alarmTime.format('hh:mm A')) {
                    triggerAlarm(alarm, index); // Comparing the remote time with alarm time
                }
            },
            error: function ajaxError(jqXHR) {
                console.error('Error fetching time for city:', jqXHR.responseText);
            }
        });
    });
}

function triggerAlarm(alarm, index) {
    const formattedTime = moment(alarm.time, 'HH:mm').format('hh:mm A'); // Convert to 12-hour format for alert
    alert(`⏰ Alarm for ${alarm.timezone} at ${formattedTime}! ⏰`);
    alarms.splice(index, 1); // Remove the triggered alarm
    displayAlarms();
}

// Periodically check alarms every minute
setInterval(checkAlarms, 60000);
