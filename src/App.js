import './App.css';
// import { Tab, TabItem } from './components/Tab';

import { Tab } from './components/Tab.tsx';
import { TabItem } from './components/TabItem.tsx';

function App() {
  return (
    <>
      <div>hoge</div>
      <div className="App">
        <Tab defaultKey="first">
          <TabItem tabKey="first" title="first">
            first content
          </TabItem>
          <TabItem tabKey="second" title="second">
            second content
          </TabItem>
        </Tab>
      </div>
    </>
  );
}

export default App;
