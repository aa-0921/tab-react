import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  VFC,
} from 'react';

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
  const addTab = useCallback((title: string, key: string) => {
    setTabs((tabs) => {
      // 追加しようとしたタブがtabsに存在していたら追加せずそのままtabsを返す
      if (tabs.findIndex((item) => item.key === key) >= 0) {
        return tabs;
      } else {
        return [...tabs, { title, key }];
      }
    });
  }, []);

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

type TabItemProps = {
  tabKey: string;
  title: string;
};

export const TabItem: VFC<PropsWithChildren<TabItemProps>> = ({
  title,
  tabKey,
  children,
}) => {
  const { activeKey, addItem } = useContext(TabContext);

  // useEffectとほぼ同じで、同期的に処理を行う部分だけ異なる
  useLayoutEffect(() => {
    addItem(title, tabKey);
  }, [addItem, title, tabKey]);

  // そのタブがactiveならそのTabItemの子要素を表示する
  return tabKey === activeKey ? <>{children}</> : null;
};
