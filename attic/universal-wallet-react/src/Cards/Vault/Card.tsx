import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';

const useStyles = makeStyles(theme => ({
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
  blue: {
    backgroundColor: blue[500],
  },
}));

export default function VaultCard({ image }: any) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.blue}>
            <EnhancedEncryptionIcon />
          </Avatar>
        }
        title="Data Vault"
        subheader={'Secure data store'}
      />
      <CardMedia className={classes.media} image={image} title="Wallet image" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This data vault implements the specification under development by the
          W3C CCG and DIF. To learn more,{' '}
          <a
            target={'_blank'}
            rel="noreferrer"
            href="https://github.com/decentralized-identity/secure-data-store"
          >
            click this link.
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
}
