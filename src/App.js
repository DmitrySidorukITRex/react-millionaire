import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Auth from './core/auth/auth';
import MainLayout from './core/layout/main-layout';
import PrivateRoute from './core/routes/private-route';
import About from './pages/about/about';
import Rules from './pages/rules/rules';
import { Provider } from 'react-redux';
import { store } from './store/store';
import importedComponent from 'react-imported-component';
import Loading from './core/loading/loading';

const MainScreen = importedComponent(() => import(/*webpackChunkName: "Main"*/ './pages/main/main'), {
  LoadingComponent: Loading,
});

const RatingScreen = importedComponent(() => import(/*webpackChunkName: "Rating"*/ './pages/rating/rating'), {
  LoadingComponent: Loading,
});

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
                <MainScreen />
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
                <RatingScreen />
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
