import './App.css';
import MyRoutes from './routes/MyRoutes';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App font-custom">
        <MyRoutes />
      </div>
    </Provider>
  );
}

export default App;
