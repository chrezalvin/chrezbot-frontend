import './App.css';

import {router} from "./routes";
import { RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect, useMemo } from 'react';
import { initializeLocalStorage } from './library/localStorage';

function App() {
  useMemo(() => {
    // initialize cookies
    initializeLocalStorage();
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
