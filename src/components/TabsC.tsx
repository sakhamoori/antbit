import { Tabs, TabsRef } from "flowbite-react";
import { FC, useRef, useState } from "react";
import Clusters from "./Clusters";

const TabsC : FC= () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabsRef = useRef<TabsRef>(null);

  return (
    <>
      <Tabs.Group
        aria-label="Tabs with underline"
        style="underline"
        ref={tabsRef}
        onActiveTabChange={tab => setActiveTab(tab)}
      >
        <Tabs.Item active={true} title="Clusters">
          <Clusters />
        </Tabs.Item>
        <Tabs.Item title="Billing">
          Billing
        </Tabs.Item>
      </Tabs.Group>
    </>
  );
};

export default TabsC;