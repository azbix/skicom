import * as Redux from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware: Redux.Middleware = createLogger();

export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        {}, // preloadedState
        composeEnhancers(
            applyMiddleware(thunkMiddleware, loggerMiddleware)
        )
    );
}