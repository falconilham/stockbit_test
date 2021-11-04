import './App.css';
import 'antd/dist/antd.css';
import { styles } from './style';
import { Input } from 'antd';
import {View, Text} from './core-ui'

function App() {
  return (
    <View style={styles.container}>
      <Text>Search Movie</Text>
      <Input />
    </View>
  );
}

export default App;
