import './App.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux'
import store from './store'

import { ListMovie } from './Screen'

function App() {
  return (
    <Provider store={store}>
      <ListMovie />
    </Provider>
  );
}

export default App;
