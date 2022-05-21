import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
  VFC,
} from 'react';

// import '../tab.css';
import '../styles/tab.css';

type TabState = {
  activeKey: string;
  addItem: (title: string, key: string) => void;
};

type TabValue = {
  title: string;
  key: string;
};

const TabContext = createContext<TabState>({
  activeKey: '',
  addItem: () => {},
});

type TabProps = {
  defaultKey: string;
};

export const Tab: VFC<PropsWithChildren<TabProps>> = ({
  defaultKey,
  children,
}) => {
  const [activeKey, setActiveKey] = useState(defaultKey);
  const [tabs, setTabs] = useState<TabValue[]>([]);
  // TabItemコンポーネントで使われているaddTab関数
  const addTab = useCallback((title: string, key: string) => {
    // setState
    //
    setTabs((tabs) => {
      if (tabs.findIndex((item) => item.key === key) > 0) {
        return tabs;
      } else {
        return [...tabs, { title, key }];
      }
    });
  }, []);

  // contextで渡している値
  const state = useMemo<TabState>(
    () => ({
      activeKey,
      addItem: addTab,
    }),
    [activeKey, addTab]
  );

  return (
    <TabContext.Provider value={state}>
      <div className="tab-wrap">
        {tabs.map(({ title, key }) => (
          <div
            key={key}
            className={`tab-item ${activeKey === key ? 'active' : ''}`}
            onClick={() => setActiveKey(key)}
          >
            {title}
          </div>
        ))}
      </div>
      {children}
    </TabContext.Provider>
  );
};
