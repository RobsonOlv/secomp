import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './pages/landing-page';
import SubscribePage from './pages/subscribe';
import LoginPage from 'pages/login';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/cadastro",
    element: <SubscribePage />,
  },
  {
    path:"/login",
    element: <LoginPage />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
