import { useSelector,useDispatch} from 'react-redux';
import { Fragment,useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state)=> state.ui.cartIsVisible);
  const cart = useSelector((state)=>state.cart)
  const notification = useSelector((state)=>state.ui.notification)
  
// whenever the store changes . this component get executed to sned async req to backend to sync data
useEffect(() => {
    if(isInitial){
      isInitial=false
      return;      //to prevent sending null data to serve when the component renders for the first time
    }
    const sendCartData = async ()=>{
    dispatch(uiActions.showNotification({
      status: 'pending',
      title : 'Sending',
      message :'Sending cart data'
    }))
    
    const response = await fetch (
      `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/cart.json`,
     {
       method: 'PUT',
       body: JSON.stringify(cart),
    }
  );


    if (!response.ok) {
    const errorText = await response.text();
    console.error(response.status, errorText);
    throw new Error('Sending cart data failed');
 }
       dispatch(uiActions.showNotification({
        status: 'success',
        title : 'Data sended',
        message :'Sending cart data successfully'
    }))
  }
  
  sendCartData().catch((error) => {
       dispatch(uiActions.showNotification({
        status: 'error',
        title : 'Error!',
        message :'Sending cart data failed'
    }))
    })}, [cart,dispatch]);
  return (
    <Fragment>
      {/* //if notifcation is not null */}
    {notification && (
      <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}/>)} 
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
