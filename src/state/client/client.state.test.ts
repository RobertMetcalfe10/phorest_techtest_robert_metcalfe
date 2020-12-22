import ClientState, {
  Client,
  ClientInternalState,
  selectedClientIdSelector,
  selectedClientSelector,
} from './client.state';

const INITIAL_STATE: ClientInternalState = {
  selectedClientId: undefined,
  selectedClient: undefined,
  clients: [],
};

const client: Client = {
  firstName: 'testFirstName',
  lastName: 'testLastName',
  clientId: 'testClientId',
  email: 'test@email.com',
  clientSince: '',
  createdAt: '',
  gender: '',
  mobile: '',
  notes: '',
  preferredStaffId: '',
  updatedAt: '',
};

describe('ClientState', () => {
  describe('reducer', () => {
    it('returns the initial state', () => {
      const state = ClientState.reducer(INITIAL_STATE, {type: ''});
      expect(state).toEqual(INITIAL_STATE);
    });

    it('sets correct state when setSelectedClient called', () => {
      const state = ClientState.reducer(INITIAL_STATE, {
        type: 'client/setSelectedClient',
        payload: client,
      });
      expect(state).toEqual({
        selectedClient: client,
        selectedClientId: 'testClientId',
        clients: [],
      });
    });

    it('sets correct state when searchForClient called', () => {
      const state = ClientState.reducer(INITIAL_STATE, {
        type: 'client/searchForClient',
      });
      expect(state).toEqual(INITIAL_STATE);
    });

    it('sets correct state when searchForClientSuccess called', () => {
      const state = ClientState.reducer(INITIAL_STATE, {
        type: 'client/searchForClientSuccess',
        payload: [client, client],
      });
      expect(state).toEqual({
        selectedClient: undefined,
        selectedClientId: undefined,
        clients: [client, client],
      });
    });

    it('sets correct state when searchForClientFailure called', () => {
      const state = ClientState.reducer(INITIAL_STATE, {
        type: 'client/searchForClientFailure',
      });
      expect(state).toEqual({
        selectedClient: undefined,
        selectedClientId: undefined,
        clients: [],
      });
    });
  });

  describe('actions', () => {
    it('client/setSelectedClient returns correct object', () => {
      expect(ClientState.actions.setSelectedClient(client)).toEqual({
        type: 'client/setSelectedClient',
        payload: client,
      });
    });

    it('client/searchForClient returns correct object', () => {
      expect(ClientState.actions.searchForClient()).toEqual({
        type: 'client/searchForClient',
      });
    });

    it('client/searchForClientSuccess returns correct object', () => {
      expect(
        ClientState.actions.searchForClientSuccess([client, client]),
      ).toEqual({
        type: 'client/searchForClientSuccess',
        payload: [client, client],
      });
    });

    it('client/searchForClientFailure returns correct object', () => {
      expect(ClientState.actions.searchForClientFailure()).toEqual({
        type: 'client/searchForClientFailure',
      });
    });
  });

  describe('selectors', () => {
    it('selectedClientIdSelector returns correct result', () => {
      const stateClone: ClientInternalState = {
        selectedClientId: '12345',
        selectedClient: undefined,
        clients: [],
      };
      expect(selectedClientIdSelector({client: stateClone})).toEqual('12345');
    });

    it('selectedClientSelector returns correct result', () => {
      const stateClone: ClientInternalState = {
        selectedClientId: undefined,
        selectedClient: client,
        clients: [],
      };
      expect(selectedClientSelector({client: stateClone})).toEqual(client);
    });
  });
});
