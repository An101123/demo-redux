import { createSlice } from '@reduxjs/toolkit'

export const INITIAL_STATE = {
    id: 1,
    title: "",
    author: "",
    isLoading: false,
  };
  
  export const RewardSlice = createSlice({
    name: 'reward',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(RewardAsyncAction.getItemsWaiting.fulfilled, (state: STATES.Reward, {payload}) => {
        state.total = payload.total;
      });
      builder.addCase(RewardAsyncAction.getAvailableReward.pending, (state: STATES.Reward, {meta}) => {
        const {lastItem} = meta.arg;
        state.available.lastItem = lastItem;
        state.available.isLoading = true;
      });
      builder.addCase(RewardAsyncAction.getAvailableReward.rejected, (state: STATES.Reward) => {
        state.available.isLoading = false;
      });
      builder.addCase(RewardAsyncAction.getAvailableReward.fulfilled, (state: STATES.Reward, {payload, meta}) => {
        const {listRewardAvailable, lastItem} = payload;
        const currentLastItem = meta.arg.lastItem;
        state.available.isLoading = false;
        state.available.availableRewards =
          currentLastItem === '' ? listRewardAvailable : [...state.available.availableRewards, ...listRewardAvailable];
        state.available.lastItem = lastItem;
      });
      builder.addCase(RewardAsyncAction.getMyReward.pending, (state: STATES.Reward, {meta}) => {
        const {lastItem} = meta.arg;
        state.mine.isLoading = true;
        state.mine.lastItem = lastItem;
      });
      builder.addCase(RewardAsyncAction.getMyReward.rejected, (state: STATES.Reward) => {
        state.mine.isLoading = false;
      });
      builder.addCase(RewardAsyncAction.getMyReward.fulfilled, (state: STATES.Reward, {payload, meta}) => {
        const {listRewardMine, lastItem} = payload;
        const currentLastItem = meta.arg.lastItem;
        state.mine.isLoading = false;
        state.mine.myRewards = currentLastItem === '' ? listRewardMine : [...state.mine.myRewards, ...listRewardMine];
        state.mine.lastItem = lastItem;
      });
      builder.addCase(RewardAsyncAction.getAvailableRewardDetail.pending, (state: STATES.Reward) => {
        state.isLoading = true;
      });
      builder.addCase(RewardAsyncAction.getAvailableRewardDetail.fulfilled, (state: STATES.Reward, {payload}) => {
        state.isLoading = false;
  
        const {
          description,
          costInPoints,
          expired_at,
          name,
          productImage,
          how_to_use,
          reward_all,
          reward_unsued,
          brandName,
        } = payload;
  
        state.campaignInfo = {
          ...state.campaignInfo,
          expired_at,
          description,
          point: costInPoints,
          name,
          howToUse: how_to_use,
          image: productImage,
          quantity: reward_all,
          rewardUnsued: reward_unsued,
          brandName,
        };
      });
      builder.addCase(RewardAsyncAction.getMyRewardDetail.pending, (state: STATES.Reward) => {
        state.isLoading = true;
      });
  
      builder.addCase(RewardAsyncAction.getMyRewardDetail.fulfilled, (state: STATES.Reward, {payload}) => {
        state.isLoading = false;
  
        const {
          description,
          costInPoints,
          expired_at,
          name,
          productImage,
          how_to_use,
          status,
          code,
          reward_images,
        } = payload;
  
        state.campaignInfo = {
          ...state.campaignInfo,
          expired_at,
          description,
          point: costInPoints,
          name,
          howToUse: how_to_use,
          image: productImage,
          status,
          code,
          rewardImages: reward_images,
        };
      });
      builder.addCase(RewardAsyncAction.buyReward.pending, (state: STATES.Reward) => {
        state.isLoading = true;
      });
      builder.addCase(RewardAsyncAction.buyReward.fulfilled, (state: STATES.Reward, {payload}) => {
        state.isLoading = false;
        // eslint-disable-next-line operator-assignment
        state.campaignInfo.rewardUnsued = state.campaignInfo.rewardUnsued - 1;
        const {reward_id} = payload;
        state.idUse = reward_id;
      });
      builder.addCase(RewardAsyncAction.buyReward.rejected, (state: STATES.Reward) => {
        state.isLoading = false;
      });
      builder.addCase(RewardAsyncAction.updateRewardStatus.pending, (state: STATES.Reward) => {
        state.isLoading = true;
      });
      builder.addCase(RewardAsyncAction.updateRewardStatus.fulfilled, (state: STATES.Reward, {payload}) => {
        state.isLoading = false;
        state.campaignInfo.status = payload.status;
        const news = state.mine.myRewards.map((x) => {
          if (x.reward_id === payload.reward_id) {
            x.used = payload.status;
            return x;
          }
          return x;
        });
        state.mine.myRewards = news;
        // console.log("hahahahahha", state.mine.myRewards);
        MessageHolder.success('reward.notification', 'Reward.notification.used');
      });
      builder.addCase(RewardAsyncAction.updateRewardStatus.rejected, (state: STATES.Reward) => {
        state.isLoading = false;
      });
    },
  });
// Action creators are generated for each case reducer function
