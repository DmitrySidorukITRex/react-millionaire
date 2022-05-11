import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Auth from './core/auth/auth';
import MainLayout from './core/layout/main-layout';
import PrivateRoute from './core/routes/private-route';
import About from './pages/about/about';
import Main from './pages/main/main';
import Rating from './pages/rating/rating';
import Rules from './pages/rules/rules';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<MainLayout />}>
          <Route
            path="/game"
            exact="true"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />

          <Route
            path="/rules"
            element={
              <PrivateRoute>
                <Rules />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/rating"
            element={
              <PrivateRoute>
                <Rating />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/game" />} />
          <Route path="/" exact element={<Navigate to="/game" replace />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
