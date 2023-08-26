import React, { useContext } from 'react';
import { EventBusContext } from './EventBusContext';

export default function ComponentA() {
  const eventBus = useContext(EventBusContext);

  const handleClick = () => {
    const propValue = 'Some value from ComponentA';
    eventBus.emit('customEvent', propValue);
  };

  return <button onClick={handleClick}>Trigger Event</button>;
}
