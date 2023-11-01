import './App.css';
import store from './app/store';
import MyRoutes from './routes/MyRoutes';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';

import firebaseConfig from '../src/firebase/firebaseConfig'

function App() {

  initializeApp(firebaseConfig);

  return (
    <Provider store={store}>

      <MyRoutes />

    </Provider>
  );
}

export default App;
