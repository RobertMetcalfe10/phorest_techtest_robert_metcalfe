import React from 'react';
import {connect, useSelector} from 'react-redux';
import {Pressable} from 'react-native';
import styled from 'styled-components';

import ClientState from '../state/client/client.state';
import VoucherState from '../state/voucher/voucher.state';
import {State} from '../store';

const Button = styled(Pressable)`
  flex: 1;
  background-color: yellow;
  width: 100px;
  height: 100px;
`;

interface Props {
  searchForClientStart: (test: string) => void;
  createVoucherStart: (test: string) => void;
}

const Entry = ({searchForClientStart, createVoucherStart}: Props) => {
  const {clientId} = useSelector((state: State) => state.client);
  return (
    <>
      <Button
        onPress={() => {
          console.log('HERE');
          searchForClientStart('CLIENT_START!!!');
          createVoucherStart('CLIENT_START!!!');
          console.log(clientId);
        }}
      />
    </>
  );
};

const mapDispatchToProps = {
  searchForClientStart: ClientState.actions.searchForClientStart,
  createVoucherStart: VoucherState.actions.createVoucherStart,
};
export default connect(null, mapDispatchToProps)(Entry);
