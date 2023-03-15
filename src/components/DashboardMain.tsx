import { Tabs } from 'flowbite-react';
import { useState } from 'react';

import Clusters from './Clusters';
// import Engineering from "./Engineering"
import ConnectToPhantom from './ConnectToPhantom';
// import Apps from "./Apps"
import Miners from './Miners';

type DashboardMainProps = {
  session: any;
  onConnected: any;
};

const DashboardMain = ({ session }: DashboardMainProps) => {
  // const [app, setApp] = useState('')
  const [publicKey, setPublicKey] = useState('');

  // const handleOnChange = (value: string) => {
  //   setApp(value);
  // };

  // const handleWalletConnect = (value: string) => {
  //   setPublicKey(value)
  // }

  const onConnect = (value: any) => {
    setPublicKey(value || undefined);
  };

  return (
    <div>
      {/* <Apps changeState={handleOnChange} selected={app} />
      {app === 'miners' && publicKey === '' ? <ConnectToPhantom session={session} onConnect={onConnect} /> : 
        <Miners session={session} publicKey={publicKey} />
        }
      {app === 'eng' && <Engineering />} */}
      <Tabs.Group aria-label="Tabs with underline" style="underline">
        <Tabs.Item active={true} title="Miner - Nodes">
          {publicKey === '' ? (
            <ConnectToPhantom session={session} onConnect={onConnect} />
          ) : (
            <Miners />
          )}
        </Tabs.Item>
        <Tabs.Item title="Eng Clusters">
          <Clusters />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default DashboardMain;
