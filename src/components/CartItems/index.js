import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../Context/CartContext'

import './index.css'

const CartItems = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartDetails} = props
      const {dish_id, dish_name, dish_image, dish_price, count} = cartDetails
      const onRemoveCartItem = () => {
        removeCartItem(dish_id)
      }
      // TODO: Update the functionality to increment and decrement quantity of the cart item
      const onClickMinus = () => {
        decrementCartItemQuantity(dish_id)
      }

      const onClickPlus = () => {
        incrementCartItemQuantity(dish_id)
      }

      return (
        <li className="cart-item">
          <img
            className="cart-product-image"
            src={dish_image}
            alt={dish_name}
          />
          <p className="dish-name">{dish_name}</p>
          <div className="cart-item-details-container">
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                data-testid="minus"
                onClick={onClickMinus}
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{count}</p>
              <button
                type="button"
                className="quantity-controller-button"
                data-testid="plus"
                onClick={onClickPlus}
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {dish_price * count}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
                data-testid="remove"
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItems
