import {Component} from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './Context/CartContext'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import Cart from './components/Cart'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObj = cartList.find(
      eachProduct => eachProduct.dish_id === product.dish_id,
    )
    if (productObj) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachOne => {
          if (productObj.dish_id === eachOne.dish_id) {
            const updatedQuantity = eachOne.count + product.count

            return {...eachOne, count: updatedQuantity}
          }
          return eachOne
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachValue => eachValue.dish_id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.dish_id) {
          const updatedQuantity = eachItem.count + 1
          return {...eachItem, count: updatedQuantity}
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObj = cartList.find(
      eachCartItem => eachCartItem.dish_id === id,
    )
    if (productObj.count > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (id === eachItem.dish_id) {
            const updatedQuantity = eachItem.count - 1
            return {...eachItem, count: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            removeAllCartItems: this.removeAllCartItems,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
