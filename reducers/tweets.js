import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    likeTweet: (state, action) => {
      const index = state.value.findIndex(tweet => tweet._id === action.payload.tweetId);
      const isLiked = state.value[index].likes.some(e => e.username === action.payload.username);
      if (isLiked) {
        state.value[index].likes = state.value[index].likes.filter(e => e.username !== action.payload.username);
      } else {
        state.value[index].likes.push({ username: action.payload.username });
      }
    },
  },
});

export const {  likeTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;
