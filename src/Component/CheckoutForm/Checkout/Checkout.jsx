import React, { useState, useEffect } from 'react'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core'
import {commerce} from '../../../lib/Commerce'
import useStyles from './styles'
import AddressForm from '../Checkout/AddressForm'
import PaymentForm from '../Checkout/PaymentForm'
import {Link} from 'react-router-dom';
const Checkout = ({cart,order ,onCaptureCheckout,error}) => {
  const classes = useStyles()
  const steps = ['Shipping Address', 'Payment Details']
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setcheckoutToken] = useState(null)
  const [shippingData, setshippingData] = useState({})
   
  useEffect(() => {
     const generateToken=async()=>
     {
       try {
         const token=await commerce.checkout.generateToken(cart.id,{type:"cart"})
         console.log(token);
         setcheckoutToken(token)
       } catch (error) {
         
       }
     }
     generateToken();
  }, [cart.id])

 const nextStep=()=> setActiveStep ((prevActiveStep)=>prevActiveStep+1);
 const backStep=()=> setActiveStep ((prevActiveStep)=>prevActiveStep-1);

   const next=(data)=>
   {
      setshippingData(data);
      nextStep();
   }

  const test = (data) => {
    setshippingData(data);

    nextStep();
  };
   let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }


  const Form = () => (activeStep === 0 ? <AddressForm  checkoutToken={checkoutToken}
    next={next}
    test={test}
  /> : <PaymentForm shippingData={shippingData} 
    checkoutToken={checkoutToken}
    onCaptureCheckout={onCaptureCheckout}
    nextStep={nextStep}
    backStep={backStep}
  />)

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken&& <Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout
