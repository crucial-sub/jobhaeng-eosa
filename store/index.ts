import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

interface ItemTypes {
    title: string;
    date: string;
    location: string;
    reward: number | string;
    ongoing: boolean;
    contents?: string;
    userId?: string;
    id: string;
}
interface ItemListTypes {
    itemList: ItemTypes[];
}

const itemListInitialState: ItemListTypes = {
    itemList: [],
};

const itemListSlice = createSlice({
    name: 'itemlist',
    initialState: itemListInitialState,
    reducers: {
        itemList(state, action) {
            state.itemList = action.payload;
        },
    },
});

const rootReducer = combineReducers({
    itemList: itemListSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const makeStore = () =>
    configureStore({
        reducer: {
            itemList: itemListSlice.reducer,
        },
    });

export const itemListAction = itemListSlice.actions;

export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production',
});
