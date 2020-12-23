import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Input, Card, Button} from '@ui-kitten/components';

import VoucherState from '../state/voucher/voucher.state';

interface Props {
  createVoucher: () => void;
  setBalance: (amount: number) => void;
  clearVoucherState: () => void;
}

const VoucherScreen = ({
  createVoucher,
  setBalance,
  clearVoucherState,
}: Props) => {
  const inputRef = useRef(null);

  const [amountValue, setAmountValue] = useState('');

  useEffect(() => {
    return () => {
      clearVoucherState();
    };
  }, []);

  const checkAndSetBalance = (amount: string) => {
    const balance = amount.match(/^(\d+)?([.]?\d{0,2})?$/);
    if (balance) {
      setAmountValue(balance[0]);
      setBalance(parseFloat(balance[0]));
    } else {
      setAmountValue(amountValue);
      setBalance(parseFloat(amountValue));
    }
  };

  return (
    <Card>
      <Input
        ref={inputRef}
        style={{paddingBottom: 20}}
        keyboardType={'number-pad'}
        status="primary"
        placeholder="Amount"
        onChangeText={(amount) => checkAndSetBalance(amount)}
        value={amountValue}
      />
      <Button
        onPress={() => {
          createVoucher();
          // @ts-ignore
          inputRef.current.blur();
        }}>
        Create
      </Button>
    </Card>
  );
};

const mapDispatchToProps = {
  createVoucher: VoucherState.actions.createVoucher,
  setBalance: VoucherState.actions.setBalance,
  clearVoucherState: VoucherState.actions.clearVoucherState,
};
export default connect(null, mapDispatchToProps)(VoucherScreen);
