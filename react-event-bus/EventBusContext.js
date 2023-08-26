import React, { createContext, useContext, useState, useCallback } from 'react';

// Create a context for the event bus
export const EventBusContext = createContext();

// Create a custom hook to access the event bus
export function useEventBus() {
  return useContext(EventBusContext);
}

// Event bus provider component
export function EventBusProvider({ children }) {
  const [eventMap, setEventMap] = useState({});

  // Emit function to trigger callbacks for an event
  const emit = useCallback(
    (event, ...args) => {
      const callbacks = eventMap[event] || [];
      callbacks.forEach((callback) => callback(...args));
    },
    [eventMap]
  );

  // Register a callback for an event
  const on = useCallback((event, callback) => {
    setEventMap((prevEventMap) => ({
      ...prevEventMap,
      [event]: [...(prevEventMap[event] || []), callback],
    }));
  }, []);

  // Unregister a callback for an event
  const off = useCallback((event, callback) => {
    setEventMap((prevEventMap) => ({
      ...prevEventMap,
      [event]: (prevEventMap[event] || []).filter((cb) => cb !== callback),
    }));
  }, []);

  const eventBus = {
    emit,
    on,
    off,
  };

  return (
    <EventBusContext.Provider value={eventBus}>
      {children}
    </EventBusContext.Provider>
  );
}
