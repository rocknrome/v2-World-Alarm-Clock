// Declaring variables
const $timezoneSelect = $('#timezone-select');
const $alarmTimeInput = $('#alarm-time');
const $setAlarmButton = $('#set-alarm');
const $alarmDisplay = $('#alarm-display');
let alarms = [];

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
    const time = $alarmTimeInput.val();
    // Here you can make an API call to fetch timezone data for the selected city
    // For simplicity, using the city name as the timezone
    alarms.push({ timezone: city, time: time });
    displayAlarms();
});

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
