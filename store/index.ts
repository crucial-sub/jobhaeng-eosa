import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

// interface PostListTypes {
//     title: string;
//     date: Date;
//     address: string;
//     reward: number | string;
//     ongoing?: boolean;
// }
interface PostListTypes {
    posts: {
        title: string;
        date: string;
        address: string;
        reward: number | string;
        ongoing: boolean;
    }[];
}

const sampleData = [
    {
        title: '화장지 좀 가져다 주실 분',
        date: new Date().toLocaleDateString(),
        address: '회기동',
        reward: '3,000원',
        ongoing: true,
    },
    {
        title: '면접 연습 상대 구해요',
        date: new Date().toLocaleDateString(),
        address: '회기동',
        reward: '20,000원',
        ongoing: false,
    },
    {
        title: '강아지 산책 좀 대신 시켜주실 분?',
        date: new Date().toLocaleDateString(),
        address: '회기동',
        reward: '10,000원',
        ongoing: true,
    },
];

const postListInitialState: PostListTypes = {
    posts: sampleData,
};

const postListSlice = createSlice({
    name: 'postList',
    initialState: postListInitialState,
    reducers: {
        posting(state, action) {
            state.posts = action.payload;
        },
    },
});

const rootReducer = combineReducers({
    posting: postListSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const makeStore = () =>
    configureStore({
        reducer: {
            posting: postListSlice.reducer,
        },
    });

export const postListAction = postListSlice.actions;

export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production',
});
