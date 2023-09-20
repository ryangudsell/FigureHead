import { createContext, useReducer } from "react";

export const ProductsContext = createContext()

export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                products: Array.isArray(action.payload) ? action.payload : [action.payload]
            }
        case 'CREATE_PRODUCTS':
            return {
                products: [action.payload, ...state.products]
            }
        case 'DELETE_PRODUCT':
            return {
                products: state.products.filter((product) => product._id !== action.payload._id)
            }
        case 'UPDATE_PRODUCT': {
            const updatedProduct = action.payload
            const updatedProducts = state.products.map((product) => {
                if (product._id === updatedProduct._id) {
                    return updatedProduct
                }
                return product
            })
            return {
                products: updatedProducts
            }
        }
        default:
            return state
    }
}

export const ProductsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(productsReducer, {
        products: []
    })

    return (
        <ProductsContext.Provider value={{...state, dispatch}}>
            {children}
        </ProductsContext.Provider>
    )
}