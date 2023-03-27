/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import Axios from 'axios';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

import Modal from './Modal';
import NewCluster from './NewCluster';

type Cluster = {
  id: string;
  cluster_id: string;
  status: string;
  age_in_hours: number;
  max_age_in_hours: number;
  credits_paid: number;
  workers_ips: string[];
  head_ip: string;
  created_at: any;
};

const Clusters = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [clusterObj, setClusterObj] = useState<Array<Cluster> | undefined>(
    undefined
  );

  const [deployCluster, setDeployCluster] = useState(false);
  // const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
    }

    const fetchData = async () => {
      fetchAllClusters();
    };
    fetchData();
  }, [wallet.publicKey, connection]);

  const fetchAllClusters = async () => {
    try {
      const response = await Axios.get(`/api/allclusters`);
      const result = JSON.parse(response.data.result);
      result.sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setClusterObj(result);
    } catch (error) {
      console.log(`Error fetching all clusters`, JSON.stringify(error));
    }
  };

  const destroyCluster = async (id: string) => {
    try {
      await Axios.get(`/api/destroycluster/?clusterId=${id}`);
      await fetchAllClusters();
    } catch (error) {
      console.log(`Error Destroying Cluster`, JSON.stringify(error));
    }
  };

  const showHideDeployCluster = async () => {
    setDeployCluster(!deployCluster);
    await fetchAllClusters();
  };

  const renderState = (status: string) => {
    if (status === 'initiating') {
      return (
        <img
          src="https://gauelondvgmzvqfdmhco.supabase.co/storage/v1/object/public/cloud/initiating.png?t=2023-03-18T00%3A44%3A48.006Z"
          width="25px"
          height="25px"
          title={status}
        />
      );
    }
    if (status === 'online') {
      return (
        <img
          src="https://gauelondvgmzvqfdmhco.supabase.co/storage/v1/object/public/cloud/online.png?t=2023-03-18T00%3A43%3A17.461Z"
          width="25px"
          height="25px"
          title={status}
        />
      );
    }
    if (status === 'destroyed' || status === 'offline') {
      return (
        <img
          src="https://gauelondvgmzvqfdmhco.supabase.co/storage/v1/object/public/cloud/destroyed.png?t=2023-03-18T00%3A42%3A56.337Z"
          width="25px"
          height="25px"
          title={status}
        />
      );
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z" />
      </svg>
    );
  };

  return (
    <div key="clusters">
      <h2>
        <b>Limitless computing power on-demand</b>
      </h2>
      <div className="flex items-center justify-center">
        <div>
          <Button
            className="mr-2 mb-2 rounded-lg bg-gray-800 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            onClick={() => {
              setDeployCluster(!deployCluster);
            }}
          >
            DEPLOY A CLUSTER
          </Button>
          <Modal show={deployCluster} handleClose={showHideDeployCluster}>
            <NewCluster key="newCluster" handleClose={showHideDeployCluster} />
          </Modal>
        </div>
        <div>
          <Button
            className="mr-2 mb-2 rounded-lg bg-yellow-400 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
            href="https://docs.antbit.io/p/NYfvBrNBdz2Qk2/Deploy-a-cluster"
            target="_blank"
          >
            SEE DOCS
          </Button>
        </div>
      </div>
      <div>
        <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          My Clusters
        </h5>
        <div>
          {clusterObj &&
            clusterObj.map((cluster) => (
              <div
                className="container my-10 items-center md:mx-auto"
                style={{ maxWidth: '700px' }}
              >
                <div className="grid grid-cols-2">
                  <div className="mb-3 flex">
                    <span className="flex">
                      <div className="pt-0.5">
                        {renderState(cluster?.status)}
                      </div>
                      <div className="ml-2">Cluster Head Address</div>
                    </span>
                  </div>
                  <div className="text-right">{cluster?.head_ip}</div>
                </div>
                <div className="space-y-2 divide-y divide-dotted divide-zinc-600 leading-10">
                  <div className="grid grid-cols-2">
                    <div>Workers</div>
                    <div className="text-right">
                      {cluster.workers_ips.length}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div>Cluster Age</div>
                    <div className="text-right">
                      {cluster.age_in_hours}/hours
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div>Cluster Paid Age</div>
                    <div className="text-right">
                      {cluster.max_age_in_hours}/hours
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2">
                      <div>Credit Paid</div>
                      <div className="text-right">
                        {cluster.credits_paid} xnt
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={() => destroyCluster(cluster.cluster_id)}
                        disabled={cluster.status !== 'online'}
                        style={{ width: '100px', height: '30px' }}
                        className="mr-2 mb-2 flex rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Destroy
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="h-5 border-b-2 border-black text-center text-2xl"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Clusters;
