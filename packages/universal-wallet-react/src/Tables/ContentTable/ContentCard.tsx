import React, { FC, HTMLAttributes } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import QRCode from 'qrcode.react';
import Avatar from '@material-ui/core/Avatar';
import ScannerIcon from '@material-ui/icons/Scanner';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import StyleIcon from '@material-ui/icons/Style';
import DescriptionIcon from '@material-ui/icons/Description';
import { LinkedDataIdentifier, ExpansionPanelList } from '@material-did/common';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  media: {
    height: 256,
  },
  listRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  pink: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export interface IContentCardProps extends HTMLAttributes<HTMLDivElement> {
  content: any;
}

export const ContentCard: FC<IContentCardProps> = ({ content }) => {
  const classes = useStyles();

  const panels = [
    {
      title: <LinkedDataIdentifier value={content.id} />,
      disabled: false,
      children: (
        <Grid container>
          <Grid item style={{ flexGrow: 1 }}>
            <List style={{ paddingTop: '0' }}>
              <ListItem style={{ paddingTop: '0' }}>
                <ListItemAvatar>
                  <Avatar className={classes.pink}>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={content.name}
                  secondary={content.description}
                  style={{ wordBreak: 'break-all' }}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item>
            <img
              style={{ maxWidth: '128px' }}
              src={content.image}
              alt={content.title}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      title: (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.pink}>
                <ScannerIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={'QR Code'}
              // secondary={'Human friendly labels'}
              style={{ wordBreak: 'break-all' }}
            />
          </ListItem>
        </List>
      ),
      disabled: false,
      children: <QRCode value={content.id} />,
    },
  ];

  if (content.tags) {
    panels.push({
      title: (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.pink}>
                <StyleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={'Tags'}
              // secondary={'Human friendly labels'}
              style={{ wordBreak: 'break-all' }}
            />
          </ListItem>
        </List>
      ),
      disabled: false,
      children: (
        <List>
          <ListItem>
            {content.tags.map((t: any) => {
              return (
                <div key={t} style={{ padding: '4px' }}>
                  <LinkedDataIdentifier value={t} />
                </div>
              );
            })}
          </ListItem>
        </List>
      ),
    });
  }
  if (content.correlation) {
    panels.push({
      title: (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.pink}>
                <TrackChangesIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={'Correlation'}
              // secondary={'Pseudonymity related identifiers.'}
              style={{ wordBreak: 'break-all' }}
            />
          </ListItem>
        </List>
      ),
      disabled: false,
      children: (
        <List>
          <ListItem>
            {content.correlation.map((t: any) => {
              return (
                <div key={t} style={{ padding: '4px' }}>
                  <LinkedDataIdentifier value={t} />
                </div>
              );
            })}
          </ListItem>
        </List>
      ),
    });
  }
  return <ExpansionPanelList panels={panels} />;
};
