import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
// import { legacy_createStore as createStore } from 'redux'; //스토어 라이브러리
import { Provider } from 'react-redux';
// import reducer from './modules/reducer';
import store from './Store';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Oauth from './pages/Oauth';
import { QueryClient, QueryClientProvider } from 'react-query';
import Book from './pages/Book';
import Mypage from './pages/Mypage';
import Manager from './pages/Manager';
import Modify from './pages/Modify';
import Landing from './pages/Landing';
// const store = createStore(reducer);
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: '/', element: <Login /> },
      { path: '/list/:genre', element: <Home /> },
      { path: '/detail/:id', element: <Book /> },
      { path: '/login', element: <Login /> },
      { path: '/landing', element: <Landing /> },
      { path: '/oauth/:site', element: <Oauth /> },
      { path: '/sign', element: <SignUp /> },
      { path: '/manager', element: <Manager /> },
      { path: '/mypage/:id', element: <Mypage /> },
      { path: '/modify/:bid', element: <Modify /> },
    ]
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* QueryClientProvider 추가 */}
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
