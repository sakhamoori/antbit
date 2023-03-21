/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { useWallet } from '@solana/wallet-adapter-react';
import { Tabs } from 'flowbite-react';

import Clusters from './Clusters';
import Miners from './Miners';

const DashboardMain = () => {
  const { publicKey } = useWallet();

  return (
    <div key="dashboard-main">
      <Tabs.Group aria-label="Default tabs" style="default">
        <Tabs.Item
          tabIndex={0}
          active={true}
          title="GPU/CPU Mining Nodes[for miners ]"
        >
          <>{publicKey && <Miners />}</>
        </Tabs.Item>
        <Tabs.Item title="Clusters[ML Engineers]" tabIndex={1}>
          <Clusters />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default DashboardMain;
