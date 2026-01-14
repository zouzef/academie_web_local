document.addEventListener('DOMContentLoaded', function() {
    // Check if calendar-info element exists on this page
    var calendarInfoEl = document.getElementById('calendar-info');
    if (!calendarInfoEl) {
        console.log('Calendar info element not found - skipping calendar initialization');
        return; // Exit early if not on a calendar page
    }

    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendar.Draggable;

    var containerEl = document.getElementById('external-events');

    // Get data from calendar-info div
    var sessionId = parseInt(calendarInfoEl.dataset.sessionId);
    var accountId = parseInt(calendarInfoEl.dataset.accountId);

    console.log('Session ID:', sessionId);
    console.log('Account ID:', accountId);

    // Get the actual calendar element to render on
    var calendarEl = document.getElementById('calendar');

    // Check if calendar element exists
    if (!calendarEl) {
        console.error('Calendar element not found');
        return;
    }

    // Initialize the external events
    if (containerEl) {
        new Draggable(containerEl, {
          itemSelector: '.external-event',
          eventData: function(eventEl) {
            return {
              title: eventEl.innerText
            };
          }
        });
    }

    // Function to adjust timezone - SUBTRACT 1 hour
    function adjustTimezone(dateString) {
        var date = new Date(dateString);
        date.setHours(date.getHours() - 1);
        return date;
    }

    // Initialize the calendar
    var calendar = new Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialDate: new Date(),
      navLinks: true,
      editable: true,
      droppable: true,
      dayMaxEvents: true,

      events: function(info, successCallback, failureCallback) {
        var url = `/dashboard/get_calander_per_session/${accountId}/${sessionId}`;
        console.log('Fetching from URL:', url);

        fetch(url)
          .then(response => {
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Data received:', data);

            if (data.success && data.data) {
              var events = data.data.map(function(item) {
                var startDate = adjustTimezone(item.start_time);
                var endDate = adjustTimezone(item.end_time);

                console.log('Original start:', item.start_time);
                console.log('Adjusted start:', startDate);

                return {
                  id: item.id,
                  title: item.title,
                  start: startDate,
                  end: endDate,
                  backgroundColor: item.color,
                  borderColor: item.color,
                  extendedProps: {
                    description: item.description,
                    teacher_id: item.teacher_id,
                    subject_id: item.subject_id,
                    room_id: item.room_id,
                    group_session_id: item.group_session_id,
                    ref: item.ref
                  }
                };
              });
              console.log('Transformed events:', events);
              successCallback(events);
            } else {
              console.error('No data or success flag false:', data);
              successCallback([]);
            }
          })
          .catch(error => {
            console.error('Fetch error:', error);
            console.error('Error message:', error.message);
            failureCallback(error);
          });
      },

      // Redirect to attendance page when event is clicked
      eventClick: function(info) {
        // Get the event ID
        var eventId = info.event.id;

        // Redirect to the attendance page
        window.location.href = '/dashboard/show-attendance-presence/' + eventId;

        // Prevent default action
        info.jsEvent.preventDefault();
      }
    });

    calendar.render();
});