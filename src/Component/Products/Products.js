 import React from 'react'
 import { Grid } from '@material-ui/core'
 import useStyles from './styles'
import Product from './product/Product'
// const products = [
//    { id: 1, name: 'shoes', desciption: 'Running Shoes', price: '$16'   ,image:"https://assets.ajio.com/medias/sys_master/root/h5a/h59/13018715881502/-1117Wx1400H-460342492-blue-MODEL.jpg" },
//    { id: 2, name: 'mac', desciption: 'Apple Macbook Shoes', price: '$20'  ,image:"https://assets.ajio.com/medias/sys_master/root/h5a/h59/13018715881502/-1117Wx1400H-460342492-blue-MODEL.jpg" },
//    { id: 3, name: 'pc', desciption: 'Good pc', price: '$16' ,image:"https://assets.ajio.com/medias/sys_master/root/h5a/h59/13018715881502/-1117Wx1400H-460342492-blue-MODEL.jpg" },
//  ]

 const Products = ({products,addToCart}) => {
   //  console.log(products); 
    const classes=useStyles();
    return (
      <main className={classes.content}>
      <div className={classes.toolbar}/>
      <Grid container justify='center' spacing={4}>
        { products?.map((product) => (
           <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} addToCart={addToCart} />
          </Grid>
          ))}
      </Grid>
     </main>
    )
 }
 
 export default Products
 