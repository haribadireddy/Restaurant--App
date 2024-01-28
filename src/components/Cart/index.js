import Header from '../Header'
import CartContext from '../../Context/CartContext'
import CartItems from '../CartItems'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      console.log(cartList)
      const onClickRemoveAll = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />
          {cartList.length >= 1 && (
            <button className="removeAll-button" onClick={onClickRemoveAll}>
              Remove All
            </button>
          )}

          {cartList.length === 0 ? (
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png" />
          ) : (
            <ul className="cart-list">
              {cartList.map(eachCartItem => (
                <CartItems key={eachCartItem.id} cartDetails={eachCartItem} />
              ))}
            </ul>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
