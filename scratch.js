// EDIT BUTTON FUNCTIONALITY TEST

// Populate timezones in the edit dropdown (similar to your main timezone dropdown)
function populateEditTimezoneDropdown() {
    $.ajax({
        url: 'http://worldtimeapi.org/api/timezone',
        success: function(timezones) {
            timezones.forEach(zone => {
                $('#edit-timezone').append(`<option value="${zone}">${zone}</option>`);
            });
        }
    });
}
populateEditTimezoneDropdown();

// Function to open the edit form with the alarm's current data
window.editAlarm = function(index) {
    const alarmToEdit = alarms[index];
    $('#edit-time').val(alarmToEdit.time);
    $('#edit-timezone').val(alarmToEdit.timezone);
    $('#edit-form').show();

    $('#save-edit').off('click').on('click', function() {
        alarmToEdit.time = $('#edit-time').val();
        alarmToEdit.timezone = $('#edit-timezone').val();
        displayAlarms();
        $('#edit-form').hide();
    });

    $('#cancel-edit').off('click').on('click', function() {
        $('#edit-form').hide();
    });
};