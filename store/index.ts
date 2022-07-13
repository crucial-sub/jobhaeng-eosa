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
    town?: string;
    reward?: number | string;
    ongoing?: boolean;
    contents?: string;
    userId?: string;
    id?: string | undefined;
    nickName?: string;
    extraLocation?: string;
    reqeustEnd?: string;
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

        removeList(state, action) {
            const req = action.payload;
            state.itemList = state.itemList.filter(
                (item) =>
                    item.id !== req.userId && item.title !== req.userTitle,
            );
        },

        update(state, action) {
            const req = action.payload;
            for (let i = 0; i < state.itemList.length; i++) {
                if (state.itemList[i].id === req.id) {
                    state.itemList.splice(i, 1, req.items);
                }
            }
        },

        add(state, action) {
            const req = action.payload;
            state.itemList = [...state.itemList, req];
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
        town: '',
        reward: '',
        ongoing: false,
        contents: '',
        userId: '',
        nickName: '',
        extraLocation: '',
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
    emailVerified?: string;
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
        emailVerified: '',
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

export interface FilterTypes {
    filterInfo: {
        name: string;
        code: string;
        filteredItem: ItemTypes[];
    };
}

const filterInitialState: FilterTypes = {
    filterInfo: {
        name: '',
        code: '',
        filteredItem: [],
    },
};
const filterSlice = createSlice({
    name: 'filter',
    initialState: filterInitialState,
    reducers: {
        filter(state, action) {
            state.filterInfo = action.payload;
        },
    },
});

const tabSlice = createSlice({
    name: 'tab',
    initialState: { currentTab: '' },
    reducers: {
        tab(state, action) {
            state.currentTab = action.payload;
        },
    },
});

export interface ChatTypes {
    user?: string[] | undefined;
    onOff?: string[] | undefined;
    users?: [] | undefined;
    requestId?: string | undefined;
    title?: string | undefined;
    id?: string | undefined;
    nickName?: [] | undefined;
    lastChat?: string | undefined;
    ongoing?: boolean | undefined;
    town?: string | undefined;
}

interface ChatListsTypes {
    chatsList: ChatTypes[];
}
export const ChatListInitialTypes: ChatListsTypes = {
    chatsList: [],
};
const chatListsSlice = createSlice({
    name: 'chatList',
    initialState: ChatListInitialTypes,
    reducers: {
        chatList(state, action) {
            state.chatsList = action.payload;
        },
    },
});

export interface ItemNdocIdTypes {
    itemsId?: string;
    docNumber?: string;
}

interface ItemNDocTypes {
    itemDocId: ItemNdocIdTypes[];
}

export const ItemDocIdInitial: ItemNDocTypes = {
    itemDocId: [],
};

const itemDocIdSlice = createSlice({
    name: 'itemDoc',
    initialState: ItemDocIdInitial,
    reducers: {
        itemDocId(state, action) {
            state.itemDocId = action.payload;
        },
    },
});

interface docIdTypes {
    docId: string;
}

const docIdInitialState: docIdTypes = {
    docId: '',
};

const docIdSlice = createSlice({
    name: 'docId',
    initialState: docIdInitialState,
    reducers: {
        docId(state, action) {
            state.docId = action.payload;
        },
    },
});

const rootReducer = combineReducers({
    itemList: itemListSlice.reducer,
    request: requestSlice.reducer,
    login: loginSlice.reducer,
    join: joinSlice.reducer,
    currentUser: currentUserSlice.reducer,
    removeList: requestSlice.reducer,
    filter: filterSlice.reducer,
    tab: tabSlice.reducer,
    chatList: chatListsSlice.reducer,
    itemDoc: itemDocIdSlice.reducer,
    docId: docIdSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['join', 'currentUser', 'request', 'chatList', 'itemDocId'],
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
export const filterAction = filterSlice.actions;
export const chatListsAction = chatListsSlice.actions;
// export const itemEditCheckAction = itemEditCheckSlice.actions;
// export const removeItemAction = removeItemSlice.actions;
export const tabAction = tabSlice.actions;
export const itemNdocAction = itemDocIdSlice.actions;
export const docIdAction = docIdSlice.actions;

export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production',
});
