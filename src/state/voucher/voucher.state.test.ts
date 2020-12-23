import VoucherState, {
  createdVoucherSelector,
  VoucherInternalState,
  Voucher,
  balanceSelector,
} from './voucher.state';

const INITIAL_STATE: VoucherInternalState = {
  createdVoucher: undefined,
  balance: undefined,
};

const voucher: Voucher = {
  clientId: 'testClientId',
  creatingBranchId: 'testCreatingBranchId',
  expiryDate: 'testExpiryDate',
  issueDate: 'testIssueDate',
  originalBalance: 100,
};

describe('VoucherState', () => {
  describe('reducer', () => {
    it('returns the initial state', () => {
      const state = VoucherState.reducer(INITIAL_STATE, {type: ''});
      expect(state).toEqual(INITIAL_STATE);
    });

    it('sets correct state when clearVoucherState called', () => {
      const state = VoucherState.reducer(INITIAL_STATE, {
        type: 'voucher/clearVoucherState',
      });
      expect(state).toEqual({
        createdVoucher: undefined,
        balance: undefined,
      });
    });

    it('sets correct state when setBalance called', () => {
      const state = VoucherState.reducer(INITIAL_STATE, {
        type: 'voucher/setBalance',
        payload: 50,
      });
      expect(state).toEqual({createdVoucher: undefined, balance: 50});
    });

    it('sets correct state when createVoucher called', () => {
      const state = VoucherState.reducer(INITIAL_STATE, {
        type: 'voucher/createVoucher',
      });
      expect(state).toEqual(INITIAL_STATE);
    });

    it('sets correct state when createVoucherSuccess called', () => {
      const state = VoucherState.reducer(INITIAL_STATE, {
        type: 'voucher/createVoucherSuccess',
        payload: voucher,
      });
      expect(state).toEqual({
        createdVoucher: voucher,
        balance: undefined,
      });
    });

    it('sets correct state when createVoucherFailure called', () => {
      const state = VoucherState.reducer(INITIAL_STATE, {
        type: 'voucher/createVoucherFailure',
      });
      expect(state).toEqual(INITIAL_STATE);
    });
  });

  describe('actions', () => {
    it('voucher/clearVoucherState returns correct object', () => {
      expect(VoucherState.actions.clearVoucherState()).toEqual({
        type: 'voucher/clearVoucherState',
      });
    });

    it('voucher/setBalance returns correct object', () => {
      expect(VoucherState.actions.setBalance(50)).toEqual({
        type: 'voucher/setBalance',
        payload: 50,
      });
    });

    it('voucher/createVoucher returns correct object', () => {
      expect(VoucherState.actions.createVoucher()).toEqual({
        type: 'voucher/createVoucher',
      });
    });

    it('voucher/createVoucherSuccess returns correct object', () => {
      expect(VoucherState.actions.createVoucherSuccess(voucher)).toEqual({
        type: 'voucher/createVoucherSuccess',
        payload: voucher,
      });
    });

    it('voucher/createVoucherFailure returns correct object', () => {
      expect(VoucherState.actions.createVoucherFailure()).toEqual({
        type: 'voucher/createVoucherFailure',
      });
    });
  });

  describe('selectors', () => {
    it('createdVoucherSelector returns correct result', () => {
      const stateClone: VoucherInternalState = {
        createdVoucher: voucher,
        balance: 50,
      };
      expect(createdVoucherSelector({voucher: stateClone})).toEqual(voucher);
    });

    it('balanceSelector returns correct result', () => {
      const stateClone: VoucherInternalState = {
        createdVoucher: undefined,
        balance: 50,
      };
      expect(balanceSelector({voucher: stateClone})).toEqual(50);
    });
  });
});
