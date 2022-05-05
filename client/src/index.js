import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import { composeWithDevTools } from "redux-devtools-extension";

let userState ;
if (window.localStorage.getItem("auth")) {
  console.log(("in memory", window.localStorage.getItem("auth")));
  userState = JSON.parse(window.localStorage.getItem("auth"));
} else {
  userState = null;
}

const authReducer = (state = userState, action) => {
  switch (action.type) {
    case "LOG_IN_USER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return { ...action.payload };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
});
const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

composeWithDevTools();
