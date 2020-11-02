import React from 'react';
import './App.css';
import AppBar from './components/UI/AppBar/AppBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import KafkaMessageViewer from './components/KafkaMessageViewer/KafkaMessageViewer';
import KafkaMessageDetail from './containers/KafkaMessageDetail/KafkaMessageDetail';
import TestReducer from './containers/TestReducer/TestReducer';
import history from "./history";

const homeText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis, eros sollicitudin dictum ultricies, erat leo efficitur urna, et mollis massa justo eu mauris. Fusce vitae interdum nisl. Fusce in vulputate urna. Praesent velit quam, tincidunt eget nunc eget, luctus feugiat arcu. In laoreet neque vitae ex porttitor rutrum. Pellentesque malesuada arcu non erat placerat tristique. Morbi et lorem magna. Pellentesque pharetra lectus dignissim turpis mattis tempor. Quisque tristique ultricies pellentesque. Quisque nec commodo nulla. Suspendisse imperdiet sapien sed velit consectetur gravida. Donec aliquam interdum massa quis lacinia. Ut mattis condimentum faucibus. Nunc commodo, nisi nec rhoncus scelerisque, libero nibh dictum nulla, sit amet iaculis ipsum nunc sit amet massa."

function App() {

  return (
    <BrowserRouter history={history}>
      <div className="App">
        <AppBar />
        <Switch>
             <Route path="/" exact render={() => <div style={{ margin: '50px auto' }}><h3>Kafka Message Viewer - Home</h3><p>{homeText}</p></div>} />
            <Route path="/messages/search/:filter" exact component={KafkaMessageViewer} />
            <Route path="/messages/:id" exact component={KafkaMessageDetail} />
            <Route path="/messages" exact component={KafkaMessageViewer} />
            <Route path="/testReducer" exact component={TestReducer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
