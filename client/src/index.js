import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { combineReducers,createStore } from 'redux';
import {Provider} from 'react-redux'
import App from "./App";

const authReducer = (state={"name":"vikas"},action)=>{
        switch (action.type) {
                case 'TEST':

                        return {...state,...action}
        
                default:
                        return state
        }
}

const rootReducer = combineReducers({
        user:authReducer
})
const store = createStore(rootReducer)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}><App /></Provider>
  </BrowserRouter>
);
