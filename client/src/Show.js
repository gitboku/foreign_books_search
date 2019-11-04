import React from 'react';
import { For } from 'react-loops'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/styles';
import { CardContent, Typography, TablePagination } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    width: 345,
    height: 351,
  },
  media: {
  },
  title: {
    height: 72,
    marginBottom: 10,
  },
  detail: {
    display: 'inline-flex',
    width: 110, // card.width の1/3 より少し小さく
  },
  pagination: {
    display: 'block',
    marginRight: '25%',
    border: 'none',
  },
}))

export default function Show(props) {
  const classes = useStyles()
  let books = Object.values(props.books)

  const renderPagination = (pageSet) => {
    console.log(pageSet)
    return <TablePagination
      className={classes.pagination}
      component="div"
      rowsPerPage={props.showPageSet.booksPerPage}
      page={props.showPageSet.nowPage}
      count={props.showPageSet.totalBooksNum}
    />
  }

  return (
    <div className='show-panel'>
      {renderPagination(props.showPageSet)}
      <For of={books} ifEmpty={<h1>書籍がありません。</h1>}>
        {book =>
          <button onClick={() => props.onClickBookLink(true)}>
            <Book book={book} />
          </button>
        }
      </For>
      {renderPagination(props.showPageSet)}
    </div>
  );
}

const Book = (props) => {
  const classes = useStyles()

  const getShowString = (data) => ((data === '' || data === null) ? '不明' : data)

  const pageString = getShowString(props.book.page)
  const vocabularyString = getShowString(props.book.vocabulary)
  const reviewAverageString = getShowString(props.book.reviewAverage)

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        children={<BookImage title={props.book.title} imageUrl={props.book.largeImageUrl}/>}
        title={props.book.title}
      />
      <CardContent>
        <Typography variant='body1' className={classes.title} component='p'>{props.book.title}</Typography>
        <Typography variant='body2' className={classes.detail} component='p'>{`ページ数：${pageString}`}</Typography>
        <Typography variant='body2' className={classes.detail} component='p'>{`語彙数：${vocabularyString}`}</Typography>
        <Typography variant='body2' className={classes.detail} component='p'>{`平均レビュー：${reviewAverageString}`}</Typography>
      </CardContent>
    </Card>
  )
}

const BookImage = (props) => {
  return (
    <img src={props.imageUrl} alt={props.title} />
  )
}