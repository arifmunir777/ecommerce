import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyle from './styles.js'
import CartItem from './CartItem/CartItem';
import { Link  } from 'react-router-dom'

const Cart = ({ cart ,handleUpdateCartQty
   , handleRemoveFromCart
    ,handleEmptyCart }) => {
    console.log(cart)
  const classes = useStyle()
 
  const EmptyCart = () => (
    <Typography variant='subtitle1'>
      You have no item in Your Shooping Cart,Start Adding
      <Link to="/" className={ classes.link}>Start Adding  </Link>
    </Typography>
  )
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart?.line_items?.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
             <CartItem item={item} handleUpdateCartQty ={handleUpdateCartQty}
                   handleRemoveFromCart={handleRemoveFromCart}
              />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant='h4'>
          SubTotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
         
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
          <Button
            className={classes.checkoutButton}
            size='large'
            type='button'
            variant='contained'
            color="secondary"
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
)

  return (
    <Container>
      <div className={classes.toolBar}></div>
      <Typography variant="h4" className={classes.title} gutterBottom gutterTop>Your Shooping Cart</Typography>
      {!cart.line_items?.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart
