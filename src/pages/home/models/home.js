
export default {
  namespace: 'home',
  state: {
  },
  effects: {
  },
  reducers: {
    updateData(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
