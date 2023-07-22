import { useDispatch, useSelector } from 'react-redux';
import '../styles/Checkout.css';
import { cartActions } from '../store/restaurantCart-slice';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function CheckOut(){
    let dispatch = useDispatch();
    let checkoutItems = useSelector(state=>state.cart.itemList)
    let userData = useSelector((state)=>state.auth.userData);
    // function removeItem(id){
    //     dispatch(cartActions.removeFromCart(id))
    // }
    async function handlePayments(){
        
        axios.post('http://localhost:8080/stripe/create-checkout-session',{
            cartItems:checkoutItems,
            userId : userData.userId,
        }).then(res=>{
            console.log("res stripe : ",res)
            if(res.data.url){
                window.location.href = res.data.url;
            }
        }).catch(err=>{
            console.log(err.message);
        })
    }
    return (
        <div className="checkout">
            <div className='co_container'>
                <h2>Checkout (2 items)</h2>
                <div className='co_delivery co_cmn'>
                    <h3>Delivery Address</h3>
                    <div className='co_address'>
                        <p>UAB, Birmingham,</p>
                        <p>Alabama, USA</p>
                        <p>35205</p>
                    </div>
                </div>
                <div className='co_items co_cmn'>
                    <h3>Review Items</h3>
                    <div className='co_item_cards'>
                            {
                                checkoutItems.map((item,i)=>(
                                    <div className='co_item' key={item.itemId}>
                                        <div className='co_itemLeft'>
                                            <p>{item.itemName}</p>
                                            <p>$ {item.price.toFixed(2)}</p>
                                            <p className='coProduct_quantity'>Quantity : {item.quantity}</p>    
                                        </div>
                                        <div className='co_itemRight'>
                                            <img src={item.image} alt='menu_item'></img>
                                            {/* <div className='coProduct_button'><DeleteIcon/></div> */}
                                        </div>
                                    </div>
                                  ))
                            }
                    </div>
                </div>
                <div className='co_payment co_cmn'>
                    <h3>Payment method</h3>
                    <button onClick={handlePayments}>Go to payments page</button>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;