import {
    applyMiddleware,
    combineReducers,
    createSlice,
    createStore,
    Reducer,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';

export interface ItemTypes {
    title?: string;
    date?: string;
    location?: string;
    reward?: number | string;
    ongoing?: boolean;
    contents?: string;
    userId?: string;
    id?: string | undefined;
    nickName?: string;
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
        nickName: '',
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

interface checkLoginTypes {
    checkLogin: boolean;
}

const checkLoginInitialSate: checkLoginTypes = {
    checkLogin: false,
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

export interface userDataTypes {
    uid: string;
    nickName?: string;
    email: string;
    address?: string;
    phoneNumber?: string;
    town?: string;
}

export interface currentUserDataTypes {
    currentUser: userDataTypes;
}

export const currentUserInitialState: currentUserDataTypes = {
    currentUser: {
        uid: '',
        nickName: '',
        email: '',
        address: '',
        phoneNumber: '',
        town: '',
    },
};

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: currentUserInitialState,
    reducers: {
        user(state, action) {
            state.currentUser = action.payload;
        },
    },
});

const rootReducer = combineReducers({
    itemList: itemListSlice.reducer,
    request: requestSlice.reducer,
    login: loginSlice.reducer,
    join: joinSlice.reducer,
    currentUser: currentUserSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['join', 'currentUser'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeConfiguredStore = (reducer: Reducer) =>
    createStore(reducer, undefined, applyMiddleware(logger));
const makeStore = () => {
    const isServer = typeof window === 'undefined';

    if (isServer) {
        return makeConfiguredStore(rootReducer);
    } else {
        // we need it only on client side
        const store = makeConfiguredStore(persistedReducer);
        let persistor = persistStore(store);
        return { persistor, ...store };
    }
};

export const persistor = persistStore(makeConfiguredStore(persistedReducer));

export const itemListAction = itemListSlice.actions;
export const requestAction = requestSlice.actions;
export const loginAction = loginSlice.actions;
export const joinAction = joinSlice.actions;
export const currentUserAction = currentUserSlice.actions;

export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production',
});
