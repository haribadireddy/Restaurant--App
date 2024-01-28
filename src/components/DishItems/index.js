import {useState} from 'react'
import CartContext from '../../Context/CartContext'
import './index.css'

const DishItems = props => {
  const [count, setCount] = useState(0)
  const {dishDetails} = props
  const {
    dish_name,
    dish_Type,
    dish_Availability,
    dish_calories,
    dish_currency,
    dish_description,
    dish_image,
    dish_price,
    dish_id,
  } = dishDetails

  const headingColor = dish_Type === 1 ? 'heading' : 'heading-green'
  const innerColor = dish_Type === 1 ? 'inner' : 'inner-green'

  const onClickMinus = () => {
    if (count !== 0) {
      setCount(count - 1)
    }
  }

  const onClickAdd = () => {
    setCount(count + 1)
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const onClickAddToCart = () => {
          addCartItem({...dishDetails, count})
        }

        return (
          <li className="dish-list">
            <div className="symbol-container">
              <div className={headingColor}>
                <div className={innerColor}></div>
              </div>
              <div>
                <h1 className="dish-heading">{dish_name}</h1>
                <p className="dish-price">
                  {dish_currency} {dish_price}
                </p>
                <p className="dish desc">{dish_description}</p>
                {dish_Availability ? (
                  <div className="addOn-container">
                    <button className="add-button" onClick={onClickMinus}>
                      -
                    </button>
                    <p className="count-para">{count}</p>
                    <button className="add-button" onClick={onClickAdd}>
                      +
                    </button>
                  </div>
                ) : (
                  <p className="not-available">Not Available</p>
                )}
                {count >= 1 && (
                  <button
                    className="addToCart-button"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
            <div className="dish-image-container">
              <p className="dish-calories">{dish_calories} calories</p>
              <img src={dish_image} alt={dish_name} className="dish-image" />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItems
