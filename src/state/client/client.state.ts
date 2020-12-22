import {createSlice} from '@reduxjs/toolkit';

export interface Client {
  clientId: string;
  clientSince: string;
  createdAt: string;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  mobile: string;
  notes: string;
  preferredStaffId: string;
  updatedAt: string;
}
export interface ClientInternalState {
  selectedClientId?: string;
  selectedClient?: Client;
  clients: Client[];
}

const INITIAL_STATE: ClientInternalState = {
  selectedClientId: undefined,
  selectedClient: undefined,
  clients: [],
};

const clientSlice = createSlice({
  name: 'client',
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedClient(state, action) {
      state.selectedClientId = action.payload.clientId;
      state.selectedClient = action.payload;
    },
    searchForClient() {},
    searchForClientSuccess(state, action) {
      state.clients = action.payload;
    },
    searchForClientFailure(state) {
      state.clients = [];
    },
  },
});

export const selectedClientIdSelector = ({
  client,
}: {
  client: ClientInternalState;
}) => client.selectedClientId;

export const selectedClientSelector = ({
  client,
}: {
  client: ClientInternalState;
}) => client.selectedClient;

export default clientSlice;
