import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ProductsContextProvider } from './context/ProductContext.jsx';
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
