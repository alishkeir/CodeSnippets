import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
import { EventBusProvider } from './EventBusContext';

function App() {
  return (
    <>
      {/*  wraps the components with the EventBus */}
      <EventBusProvider>
        <ComponentA />
        <ComponentB />
      </EventBusProvider>
    </>
  );
}

export default App;
