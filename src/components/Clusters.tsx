/* eslint-disable react/jsx-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
import Axios from 'axios';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

import NewCluster from './NewCluster';

type Cluster = {
  id: string;
  cluster_id: string;
  status: string;
  age_in_hours: number;
  max_age_in_hours: number;
  credits_paid: number;
};

const Clusters = () => {
  const [clusterObj, setClusterObj] = useState<Array<Cluster> | undefined>(
    undefined
  );

  const [deployCluster, setDeployCluster] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      fetchAllClusters();
    };
    fetchData();
  }, []);

  const fetchAllClusters = () => {
    Axios.get(`/api/allclusters`).then(
      (response: { data: { result: string } }) => {
        setClusterObj(JSON.parse(response.data.result));
      }
    );
  };

  const destroyCluster = (id: string) => {
    Axios.get(`/api/destroycluster/?clusterId=${id}`).then(async () => {
      await fetchAllClusters();
    });
  };

  return (
    <div key="clusters">
      <h2>
        <b>Limitless computing power on-demand</b>
      </h2>
      <div className="flex flex-wrap gap-5">
        <div>
          <Button
            color="dark"
            onClick={() => {
              setDeployCluster(!deployCluster);
            }}
          >
            DEPLOY A CLUSTER
          </Button>
          {deployCluster && <NewCluster />}
        </div>
        <div>
          <Button color="gray">SEE DOCUMENTATION</Button>
        </div>
      </div>
      <div>
        <h1>My Clusters</h1>
        <div>
          {clusterObj &&
            clusterObj.map((cluster) => (
              <div className="h-48 px-3">
                <div>Idle Hours: {cluster.age_in_hours}</div>
                <div>Compute Hours: {cluster.max_age_in_hours}</div>
                <div>Total Hours: {cluster.max_age_in_hours}</div>
                <div>Credit Paid: {cluster.credits_paid}</div>
                <div>Status: {cluster.status}</div>
                <div className={cluster.status !== 'online' ? 'w-3/12' : ''}>
                  <Button
                    onClick={() => destroyCluster(cluster.cluster_id)}
                    disabled={cluster.status !== 'online'}
                    color="dark"
                  >
                    Destroy
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Clusters;
