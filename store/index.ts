import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

export interface ItemTypes {
    title: string;
    date: string;
    location: string;
    reward: number | string;
    ongoing: boolean;
    contents?: string;
    userId?: string;
    id?: string;
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

interface RequestTypes {
    request: ItemTypes;
}

const requestInitialState: RequestTypes = {
    request: {
        title: '',
        date: '',
        location: '',
        reward: '',
        ongoing: false,
        contents: '',
        userId: '',
    },
};

const requestSlice = createSlice({
    name: 'request',
    initialState: requestInitialState,
    reducers: {
        request(state, action) {
            state.request = action.payload;
        },
    },
});

const rootReducer = combineReducers({
    itemList: itemListSlice.reducer,
    request: requestSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const makeStore = () =>
    configureStore({
        reducer: {
            itemList: itemListSlice.reducer,
            request: requestSlice.reducer,
        },
    });

export const itemListAction = itemListSlice.actions;
export const requestAction = requestSlice.actions;

export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production',
});
