import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { ExpansionPanel, Typography, ExpansionPanelDetails, ListItemSecondaryAction, ListSubheader } from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../css/form/GenreGroupsForm.css';

/**
 * genreGroups の例
 *  [
 *    0: [
 *      id: 1,
 *      booksGenreId: "005401",
 *      booksGenreName: "Travel（旅行）",
 *      isChecked: false,
 *      genres: [
 *        （略）
 *      ]
 *    ],
 *    1: [] ...
 *  ]
 */
export default function GenreGroupForm(props) {
  let genreGroups = props.genreGroups;
  
  let renderGenre = (genres) => {
    return genres.map((genre) => {
      let booksGenreId = genre.booksGenreId;
      let checked = genre.isChecked;
      return (
        <Genre
          id={booksGenreId}
          key={booksGenreId}
          genre={genre}
          checked={checked}
          onClick={() => props.onClick(booksGenreId, checked)}
        />
      );
    });
  }

  return (
    <List
     className="GenreGroup"
     subheader={
        <ListSubheader component="div" id="nested-list-subheader">
         ジャンル
        </ListSubheader>
     }
    >
      {genreGroups.map((genreGroup) => {
        let booksGenreId = genreGroup.booksGenreId;
        let checked = genreGroup.isChecked;
        return (
          <div className='genre-group-container'>
            <GenreGroup
              id={booksGenreId}
              key={booksGenreId}
              genreGroup={genreGroup}
            >
              {renderGenre(genreGroup.genres)}
            </GenreGroup>
            <Checkbox
              edge="end"
              onChange={() => props.onClick(booksGenreId, checked)}
              checked={props.checked}
              className='genre-group-checkbox'
              inputProps={{
                'aria-labelledby': booksGenreId
              }}
            />
          </div>
        );
      })}
    </List>
  );
}

const genreGroupStyles = makeStyles(theme => ({
  root: {
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  }
}));

/**
 * GenreGroup の例
 *  [
 *    id: 1,
 *    booksGenreName: "Travel（旅行）",
 *    isChecked: false,
 *    genres: [
 *      0: [
 *        booksGenreId: "005409001",
 *        booksGenreName: "Transportation",
 *        isChecked: false,
 *      ],
 *      1: ...
 *    ]
 *  ]
 */
function GenreGroup(props) {
  const classes = genreGroupStyles();
  const id = props.id;

  let shapeTitle = (title) => {
    let start = title.indexOf('（');
    let end = title.lastIndexOf('）');
    if (start === -1 || end === -1) {
      return title;
    }
    return title.substring(start + 1, end);
  }

  return (
    <ExpansionPanel id={`genre-group-${id}`} className='genre-group-panel'>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={`panel1a-header-${id}`}
      >
        <Typography className={classes.heading}>{shapeTitle(props.genreGroup.booksGenreName)}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List className={classes.list}>
          {props.children}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}


/**
 * Genre の例
 *  [
 *    booksGenreId"005409001",
 *    booksGenreName: "Transportation",
 *    isChecked: false,
 *  ]
 */
function Genre(props) {
  const id = props.id;

  return (
    <ListItem key={id}>
      <ListItemText
       id={`genre${id}`}
       primary={props.genre.booksGenreName}
      />
      <ListItemSecondaryAction>
        <Checkbox
          edge="end"
          onChange={props.onClick}
          checked={props.checked}
          inputProps={{
            'aria-labelledby': id
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
