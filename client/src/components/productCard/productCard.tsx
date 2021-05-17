import React from 'react';
import './productCard.css';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addProductInCart} from '../../app/actions/cartActions/index';
import {userInfo} from '../../app/reducers/registerReducer';

function ProductCard(
    props:{
    name:string,
    price:string,
    image:string[],
    id:string,
    stock:number,
  }) {
  // const productToCart = useAppSelector(productDetail);
  const user = useAppSelector(userInfo);
  // const {id} = userInfo;
  const dispatch = useAppDispatch();
  const handleOnClick = () => dispatch(addProductInCart(user.id, {
    id: props.id,
    name: props.name,
    price: parseFloat(props.price),
    image: props.image,
    stock: props.stock,
    amount: 1,
  }));
  return (
    <div>
      {
        props.stock > 0 ?

        <div className='productCardAll'>
          <div className='productCardGrid'>
            <h1 className='productCardName'>{props.name}</h1>
            <p className='productCardPrice'>${props.price}</p>
            <img className='productCardImage'
              src={props.image[0]} alt='Photo'/>
            <div className='productCardButtonsGrid'>
              <button onClick={handleOnClick}
                type='button' className='productCardCartButton'>
               Add to cart
              </button>
              <NavLink className='productCardViewMore'
                to={`/product/${props.id}`}>
                <button>More Info</button>
              </NavLink>
            </div>
          </div>
        </div> :
      <div className='productCardGrid'>
        <h1 className='productCardName'>{props.name}</h1>
        <p className='productCardPrice'>{props.price}</p>
        <img className='productCardImageSold' src={props.image[0]} alt='Photo'/>
        <h1 className='productCardSold'>Sold Out</h1>
      </div>
      }
    </div>
  );
}

export default ProductCard;
