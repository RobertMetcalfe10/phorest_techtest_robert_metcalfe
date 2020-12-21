import {createSlice} from '@reduxjs/toolkit';

export interface ClientInternalState {
  clientId?: string;
}

const INITIAL_STATE: ClientInternalState = {
  clientId: undefined,
};

const clientSlice = createSlice({
  name: 'client',
  initialState: INITIAL_STATE as ClientInternalState,
  reducers: {
    searchForClientStart(state, action) {
      state.clientId = action.payload;
      console.log(state);
      console.log(action);
    },
    searchForClientSuccess(state, action) {},
    searchForClientFailure(state, action) {},
  },
});

export default clientSlice;
