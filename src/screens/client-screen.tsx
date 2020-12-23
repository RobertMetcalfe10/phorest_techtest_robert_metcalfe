import React, {useState} from 'react';
import {connect, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {Input, Card, List, ListItem, Button} from '@ui-kitten/components';

import ClientState, {Client} from '../state/client/client.state';
import {State} from '../state/store';
import {emailIsValid} from '../utils/helpers';

interface Props {
  searchForClient: (email: string) => void;
  setSelectedClient: (client: Client) => void;
  navigation: StackNavigationProp<any>;
}

const renderClientItem = (
  {item}: any,
  navigation: StackNavigationProp<any>,
  setSelectedClient: (client: Client) => void,
) => {
  const {firstName, lastName, clientId}: Client = item;

  return (
    <ListItem
      title={`${firstName} ${lastName}`}
      description={`${clientId}`}
      accessoryRight={() =>
        renderButtonRight(navigation, setSelectedClient, item)
      }
    />
  );
};

const renderButtonRight = (
  navigation: StackNavigationProp<any>,
  setSelectedClient: (client: Client) => void,
  item: Client,
) => (
  <Button
    size="tiny"
    onPress={() => {
      setSelectedClient(item);
      navigation.push('VoucherScreen');
    }}>
    Create Voucher
  </Button>
);

const renderEmptyItem = ({item}: any) => <ListItem title={item.title} />;

const ClientScreen = ({
  searchForClient,
  setSelectedClient,
  navigation,
}: Props) => {
  const {clients} = useSelector((state: State) => state.client);
  const [inputStatus, setInputStatus] = useState('primary');

  return (
    <Card>
      <Input
        style={{paddingBottom: 20}}
        status={inputStatus}
        placeholder="Email"
        onChangeText={(email) => {
          if (emailIsValid(email)) {
            setInputStatus('success');
            searchForClient(email);
          } else {
            setInputStatus('danger');
          }
        }}
      />

      <List
        data={
          clients.length === 0
            ? [{title: 'Search for a client by email'}]
            : clients
        }
        renderItem={(renderItem) =>
          clients.length === 0
            ? renderEmptyItem(renderItem)
            : renderClientItem(renderItem, navigation, setSelectedClient)
        }
      />
    </Card>
  );
};

const mapDispatchToProps = {
  searchForClient: ClientState.actions.searchForClient,
  setSelectedClient: ClientState.actions.setSelectedClient,
};
export default connect(null, mapDispatchToProps)(ClientScreen);
