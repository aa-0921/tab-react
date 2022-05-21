import {
  createContext,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  // useEffect
  VFC,
} from 'react';

type TabState = {
  activeKey: string;
  addItem: (title: string, key: string) => void;
};

const TabContext = createContext<TabState>({
  activeKey: '',
  addItem: () => {},
});

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

  useLayoutEffect(() => {
    // useEffect(() => {
    addItem(title, tabKey);
  }, [addItem, tabKey, title]);

  return tabKey === activeKey ? <>{children}</> : null;
};
