//   R'N'R   November 29, 2023

//---------------------------------------------------//
//              APP JAVASCRIPT FILE                  //
//---------------------------------------------------//


    //---------------------------------------------------//
    //Declaring variables
    //---------------------------------------------------//
    const $timezoneSelect = $('#timezone-select');
    const $alarmTimeInput = $('#alarm-time');
    const $setAlarmButton = $('#set-alarm');
    const $alarmDisplay = $('#alarm-display');
    let alarms = [];


    //---------------------------------------------------//
    //Setting up functionality
    //---------------------------------------------------//

    // Fetch and populate timezones
    function populateTimeZone() {
        $.ajax({
            url: 'http://worldtimeapi.org/api/timezone',
            success: function(timezones) {
                timezones.forEach(zone => {
                    $timezoneSelect.append(`<option value="${zone}">${zone}</option>`);
                });
            },
            error: function(error) {
                console.log('Error fetching timezones:', error);
            }
        });
    }
    populateTimeZone()

    // Function to display alarms


    // Set an alarm


    // Edit an alarm


    // Delete an alarm


