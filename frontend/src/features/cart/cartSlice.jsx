import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { menudata } from '@/data/menu';
// getting values from the localStorage

// useEffect(() => {
//   // Perform localStorage action
//   const bagItems = JSON.parse(localStorage.getItem('bagItem'))
// const totalBagPrice = localStorage.getItem('totalPrice')
// const totalBagQuantity = localStorage.getItem('totalQuantity')
// const TotalShoppingPrice = localStorage.getItem('TotalShoppingPrice')
// }, [])


// const initialState = {
//   isSuccess: false,
//   isError: false,
//   cart: bagItems ? bagItems : menudata.slice(0,3),
//   bagDetails: null,
//   isLoading: false,
//   showAlert: false,
//   alertText: "",
//   alertType: "",
//   cartAlert: false,
//   totalPrice: totalBagPrice ? totalBagPrice : 0,
//   totalQuantity: totalBagQuantity ? totalBagQuantity : 0,
//   shippingPrice: 0,
//   estimatedTax: 0,
//   TotalShoppingPrice: TotalShoppingPrice ? TotalShoppingPrice : 0,
//   bagId: 0,
// };

// fetching single product based on its id

const initialState = {
  isSuccess: false,
  isError: false,
  cart: [ {
    image:'https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/menu262x-600x687.jpg',
    title:'Twice Cooked Pork',
    price:21.00,
    description:'Tristique tempus condimentum diam donec. Condimentum ullamcorper sit elementum hendrerit mi nulla in consequat, ut. Metus, nullam scelerisque netus viverra dui pretium pulvinar. Commodo morbi amet.',
    category:'Main Course'
}],
  bagDetails: {
    image:'https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/menu262x-600x687.jpg',
    title:'Twice Cooked Pork',
    price:21.00,
    description:'Tristique tempus condimentum diam donec. Condimentum ullamcorper sit elementum hendrerit mi nulla in consequat, ut. Metus, nullam scelerisque netus viverra dui pretium pulvinar. Commodo morbi amet.',
    category:'Main Course'
},
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  cartAlert: false,
  totalPrice: 0,
  totalQuantity: 0,
  shippingPrice: 0,
  estimatedTax: 0,
  TotalShoppingPrice: 0,
  bagId: 0,
};
export const addProductToBag = createAsyncThunk(
  'cart/getbagItems',
  async ({ id, quantity }, thunkAPI) => {
    try {
      const { size } = thunkAPI.getState().product
      const { data } = await axios.get(`/api/v1/product/${id}`);
      const { product } = data

      return {
        title: product.title,
        _id: product._id,
        image: product.image,
        price: product.price,
        countInstock: product.countInstock,
        brand: product.brand,
        size,
        quantity
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response && error.response.data.message
        ? error.response.data.msg
        : error.message);
    }
  }
);




const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    clearCartAlert: (state, action) => {
      state.cartAlert = false
    },
    clearCartMessage: (state, action) => {
      state.showAlert = false
      state.alertText = ''
      state.alertType = ''
    },
    onCartAlert: (state, action) => {
      const bagItemPayload = action.payload
      state.cartAlert = true
      state.bagDetails = bagItemPayload
    },

    addProductToCart: (state, action) => {
      // console.log(action);
      const bagPayload = action.payload
      // find the product in the cart
      const isProductInBag = state.cart.find(x => x._id === bagPayload._id)
      // check for existence in the cart
      if (isProductInBag) {
        // update the cart
        state.cart = state.cart.map(x => x._id === isProductInBag._id ? bagPayload : x)
        localStorage.setItem('bagItem', JSON.stringify(state.cart))
        state.showAlert = true
        state.alertText = `${bagPayload.title} has been successfully added to your cart`
      } else {
        state.cart = [...state.cart, bagPayload]
        localStorage.setItem('bagItem', JSON.stringify(state.cart))
        state.showAlert = true
        state.alertText = `${bagPayload.title} has been successfully added to your cart`
      }

    },
    increaseBagQty: (state, action) => {
      // get the payload
      const bagPayload = action.payload
      // check if the map payload is same as the received payload
      // then increase the required item
      const result = state.cart.map((item) => {
        if (item._id === bagPayload._id) {
          let num = (item.quantity + 1).toFixed(parseInt(3));
         const modifiedNumber = parseFloat(num); 
          return { ...item, quantity:modifiedNumber }
        }
        return item
      })
      state.cart = result
      localStorage.setItem('bagItem', JSON.stringify(state.cart))
      state.showAlert = true
      state.alertType = 'success'
      state.alertText = `${bagPayload.title} quantity has been successfully updated`
    },
    decreaseBagQty: (state, action) => {
      // get the payload
      const bagPayload = action.payload
      // check if the map payload is same as the received payload
      // then descrease the required item
      const result = state.cart.map((item) => {
        if (item._id === bagPayload._id) {
          return { ...item, quantity: (parseInt(item.quantity) - 1).toFixed(2) }
        }
        return item
      })
      state.cart = result
      localStorage.setItem('bagItem', JSON.stringify(state.cart))
      state.showAlert = true
      state.alertType = 'success'
      state.alertText = `${bagPayload.title} quantity has been successfully updated`
    },
    calculateBagItem: (state, action) => {

      const { totalBagPrice, totalBagQty } = state.cart.reduce((acc, total) => {
        const { price, quantity } = total
        acc.totalBagQty += parseInt(quantity)
        acc.totalBagPrice += parseInt(quantity) * parseInt(price)


        return acc
      }, { totalBagPrice: 0, totalBagQty: 0 })

      state.totalPrice = totalBagPrice
      state.totalQuantity = totalBagQty
      localStorage.setItem('totalPrice', state.totalPrice)
      localStorage.setItem('totalQuantity', state.totalQuantity)
      state.shippingPrice = totalBagPrice > 100 ? 100 : 0
      state.estimatedTax = (totalBagPrice * .15)
      state.TotalShoppingPrice = state.shippingPrice + state.estimatedTax + state.totalPrice
      localStorage.setItem('TotalShoppingPrice', state.TotalShoppingPrice)
    },
    removeBagItem: (state, action) => {
      const bagItemPayload = action.payload
      // remove the item from the cart
      state.cart = state.cart.filter(x => x._id !== bagItemPayload._id)
      state.showAlert = true
      state.cartAlert = false
      state.alertType = 'danger'
      state.alertText = `${bagItemPayload.title} has been successfully removed from your cart items`
      localStorage.setItem('bagItem', JSON.stringify(state.cart))
    },
    ClearBagData: (state, action) => {
      localStorage.removeItem('bagItem')
      localStorage.removeItem('totalPrice')
      localStorage.removeItem('totalQuantity')
      localStorage.removeItem('TotalShoppingPrice')
      state.isLoading = false
      state.isSuccess = false
      state.alertType = ''
      state.showAlert = false
      state.alertText = ''
    }

  },
  extraReducers: {
    [addProductToBag.pending]: (state) => {
      state.isLoading = true;
    },
    [addProductToBag.fulfilled]: (state, action) => {
      // console.log(action);
      const bagPayload = action.payload
      state.isLoading = false;
      // find the product in the cart
      const isProductInBag = state.cart.find(x => x._id === bagPayload._id)
      // check for existence in the cart
      if (isProductInBag) {
        // update the cart
        state.cart = state.cart.map(x => x._id === isProductInBag._id ? bagPayload : x)
        localStorage.setItem('bagItem', JSON.stringify(state.cart))
        state.isSuccess = true
      } else {
        state.cart = [...state.cart, bagPayload]
        localStorage.setItem('bagItem', JSON.stringify(state.cart))
      }
    },
    [addProductToBag.rejected]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.isSuccess = false
      state.showAlert = true;
      state.alertText = action.payload
    },
  },
});

// console.log(cartSlice);
export const {
  clearCartAlert,
  addProductToCart,
  calculateBagItem,
  removeBagItem,
  ClearBagData,
  increaseBagQty,
  decreaseBagQty,
  onCartAlert,
  clearCartMessage
} = cartSlice.actions

export default cartSlice.reducer;
