import React, { ChangeEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { navigate, Location } from '@reach/router';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export interface NavigationProps {
  vertical?: boolean;
  onNavigate?: () => void;
}

export const Navigation: React.FC<NavigationProps> = props => {
  const { vertical, onNavigate } = props;
  const c = useStyles({ vertical });

  function handleChange(e: ChangeEvent<{}>, route: string) {
    navigate(route);
    if (onNavigate) {
      onNavigate();
    }
  }

  return (
    <Location>
      {({ location }): any => (
        <Tabs
          orientation={vertical ? 'vertical' : 'horizontal'}
          className={c.root}
          classes={{ flexContainer: c.tabsContainer }}
          value={'/' + location.pathname.split('/')[1]}
          onChange={handleChange}
          TabIndicatorProps={{ hidden: true }}
        >
          <Tab label={'Главная'} value="/" />
          <Tab label={'Инвестиция'} value="/investments" />
          <Tab label={'Пополнить баланс'} value='/refill' />
          {/* <Tab label={'Рефералы'} value='/referral' /> */}
          {/* <Tab label={'Вывод средств'} value='/withdrawal'/> */}
        </Tabs>
      )}
    </Location>
  );
};

export const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    tabsContainer: ({ vertical }: any) => ({
      alignItems: vertical ? 'start' : 'inherit',
    }),
  })
);
