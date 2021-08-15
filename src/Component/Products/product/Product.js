import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import useStyles from './styles'

const Product = ({ product ,addToCart}) => {
  const classes = useStyles()
//   console.log(product)

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        <div className='classes.cardContent'>
          <Typography variant='h5' gutterBottom>
            {product.name}
          </Typography>
          <Typography variant='h5' gutterBottom>
            {product.price.formatted_with_symbol}
          </Typography>

          <Typography
            dangerouslySetInnerHtml={{ __html: product.description }}
            variant='h2'
            color='textSecondary'
          />

          <CardActions disableSpacing className={classes.cardAction}>
            <IconButton aria-label='Add to Cart'>
              <AddShoppingCartIcon onClick={()=> addToCart(product.id,1)}/>
            </IconButton>
          </CardActions>
        </div>
      </CardContent>
    </Card>
  )
}

export default Product
