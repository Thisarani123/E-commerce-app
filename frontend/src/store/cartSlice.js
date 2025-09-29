import { createSlice } from '@reduxjs/toolkit';
const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('user_cart');
        return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
    } catch {
        return { items: [], total: 0 };
    }
};
const saveCartToStorage = (cart) => {
    try {
        localStorage.setItem('user_cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Failed to save cart:', error);
    }
};
const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.qty), 0);
};
const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromStorage(),
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                state.items.push({ ...action.payload, qty: 1 });
            }
            state.total = calculateTotal(state.items);
            saveCartToStorage(state);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.total = calculateTotal(state.items);
            saveCartToStorage(state);
        },
        updateQuantity: (state, action) => {
            const { id, qty } = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item) {
                if (qty <= 0) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    item.qty = qty;
                }
            }

            state.total = calculateTotal(state.items);
            saveCartToStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            saveCartToStorage(state);
        },
        // Cart persistence on login 
        mergeCart: (state, action) => {
            const serverCart = action.payload;

            serverCart.items.forEach(serverItem => {
                const localItem = state.items.find(item => item.id === serverItem.id);

                if (localItem) {
                    // Keep the higher quantity 
                    localItem.qty = Math.max(localItem.qty, serverItem.qty);
                } else {
                    state.items.push(serverItem);
                }
            });

            state.total = calculateTotal(state.items);
            saveCartToStorage(state);
        },
        // Save cart to server when user logs in 
        saveCartToServer: (state, action) => {
            const userId = action.payload;
            // This would trigger an API call to save the cart 
            console.log('Saving cart to server for user:', userId);
        }
    }
});
export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    mergeCart,
    saveCartToServer
} = cartSlice.actions;
export default cartSlice.reducer; 