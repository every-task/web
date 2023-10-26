import './App.css';
import store from './app/store';
import MyRoutes from './routes/MyRoutes';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>

      <MyRoutes />

    </Provider>
  );
}

export default App;
