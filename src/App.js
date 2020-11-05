import React from 'react';
import './App.css';
import AppBar from './components/UI/AppBar/AppBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import KafkaMessageViewer from './components/KafkaMessageViewer/KafkaMessageViewer';
import KafkaMessageDetail from './containers/KafkaMessageDetail/KafkaMessageDetail';
import TestReducer from './containers/TestReducer/TestReducer';

const homeText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

function App() {

  return (
    <BrowserRouter>
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
