import { EventBusContext } from './EventBusContext';

export default function ComponentB() {
  const eventBus = useContext(EventBusContext);

  const [receivedProp, setReceivedProp] = React.useState('');

  const handleEvent = (propValue) => {
    setReceivedProp(propValue);
  };

  React.useEffect(() => {
    eventBus.on('customEvent', handleEvent);

    return () => {
      eventBus.off('customEvent', handleEvent);
    };
  }, [eventBus]);

  return (
    <div>
      <p>Received Prop: {receivedProp}</p>
      <div>Component B</div>
    </div>
  );
}
