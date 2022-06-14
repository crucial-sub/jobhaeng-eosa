import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

export interface ItemTypes {
    title?: string;
    date?: string;
    location?: string;
    reward?: number | string;
    ongoing?: boolean;
    contents?: string;
    userId?: string;
    id?: string | undefined;
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
        load(state, action) {
            state.itemList = action.payload;
        },
    },
});

interface RequestTypes {
    request: ItemTypes;
}

export const requestInitialState: RequestTypes = {
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

interface searchResultTypes {
    searchResult: ItemTypes[];
}

const searchInitialState: searchResultTypes = {
    searchResult: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState: searchInitialState,
    reducers: {
        search(state, action) {
            state.searchResult = action.payload;
        },
    },
});

interface checkLoginTypes {
    checkLogin: boolean | null;
}

const checkLoginInitialSate: checkLoginTypes = {
    checkLogin: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState: checkLoginInitialSate,
    reducers: {
        login(state, action) {
            state.checkLogin = action.payload;
        },
    },
});

interface clickJoinTypes {
    clickJoin: boolean;
}

const checkJoinInitialState: clickJoinTypes = {
    clickJoin: false,
};

const joinSlice = createSlice({
    name: 'join',
    initialState: checkJoinInitialState,
    reducers: {
        join(state, action) {
            state.clickJoin = action.payload;
        },
    },
});

const rootReducer = combineReducers({
    itemList: itemListSlice.reducer,
    request: requestSlice.reducer,
    search: searchSlice.reducer,
    login: loginSlice.reducer,
    join: joinSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const makeStore = () =>
    configureStore({
        reducer: {
            itemList: itemListSlice.reducer,
            request: requestSlice.reducer,
            search: searchSlice.reducer,
            login: loginSlice.reducer,
            join: joinSlice.reducer,
        },
    });

export const itemListAction = itemListSlice.actions;
export const requestAction = requestSlice.actions;
export const searchAction = searchSlice.actions;
export const loginAction = loginSlice.actions;
export const joinAction = joinSlice.actions;

export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production',
});
