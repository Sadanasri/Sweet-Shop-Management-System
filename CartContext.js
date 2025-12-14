import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from generic storage if needed, but for now just state
    // Or persist to localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('sweetShopCart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('sweetShopCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (sweet) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === sweet.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === sweet.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...sweet, quantity: 1 }];
        });
    };

    const removeFromCart = (sweetId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== sweetId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
};
