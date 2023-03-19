/* eslint-disable import/no-extraneous-dependencies */
import { Tabs } from 'flowbite-react';
import { useState } from 'react';

import Clusters from './Clusters';
import ConnectToPhantom from './ConnectToPhantom';
import Miners from './Miners';

type DashboardMainProps = {
  session: any;
  onConnected: any;
};

const DashboardMain = ({ session }: DashboardMainProps) => {
  const [publicKey, setPublicKey] = useState('');

  const onConnect = (value: any) => {
    setPublicKey(value || undefined);
  };

  return (
    <div>
      <Tabs.Group aria-label="Default tabs" style="default">
        <Tabs.Item active={true} title="GPU/CPU Mining Nodes[for miners ]">
          {publicKey === '' ? (
            <ConnectToPhantom session={session} onConnect={onConnect} />
          ) : (
            <Miners />
          )}
        </Tabs.Item>
        <Tabs.Item title="Clusters[ML Engineers]">
          <Clusters />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default DashboardMain;
