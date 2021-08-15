import React,{useState,useEffect}from 'react'
// import Products from './Component/Products/Products';
// import Navbar from './Component/Navbar/Navbar';

import {Products,Navbar,Cart,Checkout} from './Component';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {commerce} from './lib/Commerce';
const App = () => {
    const [products,setProduct]=useState([]);
    const [cart,setCart]=useState({});
    const [order,setOrder]=useState({});
    const [errorMessage,seterrorMessage]=useState({});
    const fetchProduct=async()=>
    {
        const {data}=await  commerce.products.list();
        setProduct(data);
    }
    const fetchCart=async()=>
    {
        setCart(await commerce.cart.retrieve())
    }
    const handleAddToCart=async(productId,quantity)=>
    {
        const item=await commerce.cart.add(productId,quantity);
        setCart(item.cart);
    }
    const handleUpdateCartQty=async (productId,quantity)=>
    {
        const {cart} = await commerce.cart.update(productId,{quantity});
        setCart(cart)
    }

    const handleRemoveFromCart=async (productId)=>
    {
        const {cart} = await commerce.cart.remove(productId);
        setCart(cart)
    }
    const handleEmptyCart=async ()=>
    {
        const {cart} = await commerce.cart.empty();
        setCart(cart)
    }
    const refreshCart=async()=>
    {
        const newCart=await commerce.cart.refresh();
        setCart(newCart)
    }

    const handleCaptureCheckout=async(checkoutTokenId,newOrder)=>
    {
        try {
        const  incomingorder =await commerce.checkout.capture(checkoutTokenId,newOrder)
        setOrder(incomingorder)
        refreshCart();
            
        } catch (error) {
            seterrorMessage(error.data.error.message)
        }
    }

   console.log(cart)
    useEffect(() => {
        fetchProduct();
        fetchCart();
    }, [] )
    // console.log(products);
    return (
        <Router>
             <Navbar  totalItem={cart.total_items}/>
             <Switch>
             <Route exact path="/">
              <Products products={products} addToCart={handleAddToCart}/>
         </Route>
             <Route exact path= "/cart">
             <Cart cart={cart}
                 handleUpdateCartQty={handleUpdateCartQty}
                 handleRemoveFromCart={handleRemoveFromCart}
                 handleEmptyCart={handleEmptyCart}
             />
               </Route>
               <Route exact path="/checkout">
                 <Checkout
                  cart={cart}
                  order={order}
                  onCaptureCheckout={handleCaptureCheckout}
                  error={errorMessage}

                 />
               </Route>
             </Switch>
        </Router>
    )
}

export default App

