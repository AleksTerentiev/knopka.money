import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import PreloaderSvg from 'img/preloader.svg';

export const Preloader: FC = () => {
  const c = useStyles();

  return (
    <>
      <img alt='Loading' className={c.top} src={PreloaderSvg} />
      <img alt='Loading' className={c.bot} src={PreloaderSvg} />
    </>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      width: 100,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    bot: {
      width: 100,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transformOrigin: '50% 90%',
      transform: 'translate(-50%, -50%) rotate(180deg)',
      opacity: 0.1,
    },
  })
);
