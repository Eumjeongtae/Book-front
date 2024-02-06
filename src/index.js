import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
// import { legacy_createStore as createStore } from 'redux'; //스토어 라이브러리
import { Provider } from 'react-redux';
import reducer from './modules/reducer';
import Todo from './pages/Todo';
import store from './Store';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Oauth from './pages/Oauth';

// const store = createStore(reducer);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: '/', element: <Login /> },
      { path: '/toDo', element: <Todo /> },
      { path: '/login', element: <Login /> },
      { path: '/oauth/:site', element: <Oauth /> },
      { path: '/sign', element: <SignUp /> },
    ]
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
