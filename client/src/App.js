import './App.css';
import EventSourcing from './EventSourcing';
import LongPolling from './LongPolling';
import Websocket from './Websocket';


function App() {
  return (
    <div>
      {/* <LongPolling /> */}
      {/* <EventSourcing /> */}
      <Websocket />
    </div>
  );
}

export default App;