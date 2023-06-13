import React, { useState } from 'react';
import "./App.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (eventTitle && selectedDate) {
      const newEvent = {
        date: selectedDate,
        title: eventTitle,
      };

      if (editingEvent) {
        const updatedEvents = events.map((event) =>
          event === editingEvent ? newEvent : event
        );
        setEvents(updatedEvents);
        setEditingEvent(null);
      } else {
        setEvents([...events, newEvent]);
      }

      setSelectedDate(null);
      setEventTitle('');
    }
  };

  const handleEditEvent = (event) => {
    setSelectedDate(event.date);
    setEventTitle(event.title);
    setEditingEvent(event);
  };

  const handleDeleteEvent = (event) => {
    const updatedEvents = events.filter((e) => e !== event);
    setEvents(updatedEvents);
  };

  const isEventDate = (date) => {
    return events.some((event) =>
      isSameDay(event.date, date)
    );
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const customDateClass = (date) => {
    return isEventDate(date) ? 'event-date' : null;
  };

  return (
    <div className='App'>
      <h2>Calendar</h2>
      <div className="calendar">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          dateFormat="dd/MM/yyyy"
          highlightDates={events.map((event) => event.date)}
          customDayClassName={customDateClass}
        />
        {selectedDate && (
          <div>
            <h3>{selectedDate.toDateString()}</h3>
            <input
              type="text"
              placeholder="Event title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <button onClick={handleAddEvent}>
              {editingEvent ? 'Update Event' : 'Add Event'}
            </button>
          </div>
        )}

        <div>
          <h3>Events</h3>
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <ul>
              {events.map((event, index) => (
                <li key={index}>
                  {event.title} - {event.date.toDateString()}
                  <button onClick={() => handleEditEvent(event)}>Edit</button>
                  <button onClick={() => handleDeleteEvent(event)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
