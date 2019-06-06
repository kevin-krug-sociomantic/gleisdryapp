import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import gleis3app from './reducers';
import { ROUTES } from './constants';
import thunkMiddleware from 'redux-thunk';
import { Home, UploadPage } from './pages';

let store = createStore(
    gleis3app,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
    ),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.store = store;
class Gleis3App extends React.Component
{
    render()
    {
        return (
            <Router>
                <div>
                    <Route exact path={ ROUTES.HOME } component= { Home } />
                    <Route path={ ROUTES.UPLOADS } component= { UploadPage }/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(
    <Provider store={ store }>
        <Gleis3App/>
     </Provider>,
    document.querySelector( '.js-app' )
);
