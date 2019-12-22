import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from '@reach/router';
import Box from '@material-ui/core/Box';
import bgImg from './bg.png';

export const Home: React.FC<RouteComponentProps> = () => {
  const c = useStyles({});

  return (
    <Box className={c.root}>
      <header className={c.header}> </header>
    </Box>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    header: {
      backgroundColor: '#9ac130',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.75)',
      padding: '40px 20px 35px',
      color: 'white',
      textAlign: 'center',
    },
  })
);
