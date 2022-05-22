import './App.css';
import { Tab, TabItem } from './components/Tab.tsx';

function App() {
  return (
    <div className="App">
      <Tab defaultKey="first">
        {/* Tabコンポーネントではchildrenをレンダリングしているので、TabItem以外の子要素はレンダリングされる */}
        <h3>common content</h3>
        <TabItem tabKey="first" title="first">
          first content
        </TabItem>
        <TabItem tabKey="second" title="second">
          second content
        </TabItem>
      </Tab>
    </div>
  );
}

export default App;
