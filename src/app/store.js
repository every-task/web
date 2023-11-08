import { configureStore } from '@reduxjs/toolkit';
import meReducer from '../feature/meSlice';

export default configureStore({
    reducer: {
        me: meReducer
    }
});
