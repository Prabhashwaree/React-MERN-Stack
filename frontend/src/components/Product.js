import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={`data:image/jpeg;base64,${product.image}`} className="card-img-top" alt={product.name} 
        style={{height:"300px"}}/>
      </Link>
      <Card.Body style={{position:"relative",textAlign:"center",margin:"auto"}}>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
        <Card.Text><b>LKR .</b>{product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled style={{backgroundColor:"gray" ,width:"12vw"}}>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)} style={{backgroundColor:"red",color:"white",border:"1px solid white",width:"12vw"}}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;