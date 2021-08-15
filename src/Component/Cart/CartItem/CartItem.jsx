import React  from 'react'
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core'
import useStyle from './style.js'

     
const CartItem = ({item,handleUpdateCartQty,handleRemoveFromCart}) => {
    const classes = useStyle()
    const removeCart=(id)=>
    {
    console.log(id);
    }
  return (
    <Card>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant='h4'>{item.name}</Typography>
        <Typography variant='h5'>
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
       <CardActions classes={classes.cartActions}>
        <div className={ classes.buttons}>
        <Button type="button" size="small" onClick={()=>handleUpdateCartQty(item.id,item.quantity-1)}  >-</Button>
        <Typography variant='h4'>{item.quantity}</Typography>
        <Button type="button" size="small"  onClick={()=>handleUpdateCartQty(item.id,item.quantity+1)} >+</Button>

        
        <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
        </div>
      </CardActions>
    </Card>
  )
}

export default CartItem
