import React, { FC, HTMLAttributes } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';
import { red, blue } from '@material-ui/core/colors';

import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import CardMenu from './CardMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  red: {
    backgroundColor: red[500],
  },
  blue: {
    backgroundColor: blue[500],
  },
}));

export interface Props extends HTMLAttributes<HTMLDivElement> {
  image?: string;
  status?: string;
  menu?: any[];
}

const WalletCard: FC<Props> = (
  { image, status, menu }: any = {
    image: 'https://via.placeholder.com/150',
    status: 'UNLOCKED',
    menu: [],
  }
) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={status === 'UNLOCKED' ? classes.red : classes.blue}
          >
            {status === 'UNLOCKED' ? <LockOpenIcon /> : <LockIcon />}
          </Avatar>
        }
        action={<CardMenu status={status} menu={menu} />}
        title="Universal Wallet"
        subheader={
          status === 'UNLOCKED'
            ? 'Unlocked and ready for use.'
            : 'Locked, a password is required before use.'
        }
      />
      <CardMedia className={classes.media} image={image} title="Wallet image" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This wallet implements the specification under development in the W3C
          CCG. To learn more,{' '}
          <a
            target={'_blank'}
            rel="noreferrer"
            href="https://github.com/w3c-ccg/universal-wallet-interop-spec"
          >
            click this link.
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
};

export { WalletCard as Card };
