import { CART_ACTION_TYPES } from '../actions/cartActions'

const initialState = {
<<<<<<< HEAD
    items: [],
    synced: false
=======
    items: []
>>>>>>> 0883aba932a12d174e483cb7df379f0094262ded
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ACTION_TYPES.ADD_TO_CART:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case CART_ACTION_TYPES.REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            }
        case CART_ACTION_TYPES.CLEAR_CART:
            return {
                ...state,
                items: []
            }
<<<<<<< HEAD
        case CART_ACTION_TYPES.GET_CART_ITEMS_FROM_STORAGE:
=======
        case CART_ACTION_TYPES.UPDATE_CART_ITEMS:
>>>>>>> 0883aba932a12d174e483cb7df379f0094262ded
            return {
                ...state,
                items: action.payload
            }
<<<<<<< HEAD
        case CART_ACTION_TYPES.GET_CART:
            return {
                items: action.payload
            }
        case CART_ACTION_TYPES.SYNC_CART:
            return {
                ...state,
                synced: true
            }
        case CART_ACTION_TYPES.NOT_SYNC_CART:
            return {
                ...state,
                synced: false
            }
=======
        case CART_ACTION_TYPES.SET_CART:
            return {
                items: action.payload
            }
        case CART_ACTION_TYPES.GET_CART:
            return state
>>>>>>> 0883aba932a12d174e483cb7df379f0094262ded
        default:
            return state
    }
}

export default cartReducer