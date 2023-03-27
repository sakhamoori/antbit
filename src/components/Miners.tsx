/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-key */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable import/no-extraneous-dependencies */
import Axios from 'axios';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';

type WorkerObj = {
  id: number;
  worker_ip: string;
  hours_idle: number;
  hours_hired: number;
  rewards_claimed: number;
  rewards_unclaimed: number;
  status: string;
  cpu_count: number;
};

const Miners = () => {
  const [workersHealth, setWorkersHealth] = useState<
    Array<WorkerObj> | undefined
  >(undefined);

  const fetchWorkers = async () => {
    await Axios.get(`/api/allworkers`).then((response) => {
      setWorkersHealth(JSON.parse(response.data.result));
    });
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const claimRewards = async (ip: string) => {
    await Axios.post('/api/claimrewards', {
      data: {
        worker_ip: ip,
      },
    });
    await fetchWorkers();
  };

  const renderState = (status: string) => {
    if (status === 'offline' || status === 'disabled') {
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
      <img
        src="https://gauelondvgmzvqfdmhco.supabase.co/storage/v1/object/public/cloud/online.png?t=2023-03-18T00%3A43%3A17.461Z"
        width="25px"
        height="25px"
        title={status}
      />
    );
  };

  return (
    <div key="miners">
      <h5 className="mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        My Mining Nodes
      </h5>
      {workersHealth &&
        workersHealth.length > 0 &&
        workersHealth.map((worker) => (
          <div
            className="container my-10 items-center md:mx-auto"
            style={{ maxWidth: '600px' }}
          >
            <div className="mb-3 flex">
              {renderState(worker.status)}
              <span className="ml-2">Worker: {worker?.worker_ip}</span>
            </div>
            <div className="space-y-2 divide-y divide-dotted divide-zinc-600 leading-10">
              <div className="grid grid-cols-2">
                <div>Idle Hours</div>
                <div className="text-right">{worker.hours_idle} hrs</div>
              </div>
              <div className="grid grid-cols-2">
                <div>Compute Hours</div>
                <div className="text-right">{worker.hours_hired} hrs</div>
              </div>
              <div className="grid grid-cols-2">
                <div>Total Hours</div>
                <div className="text-right">
                  {worker.hours_idle + worker.hours_hired} hrs
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div>Count</div>
                <div className="text-right">{worker.cpu_count}</div>
              </div>
              <div className="grid grid-cols-2">
                <div>Status</div>
                <div className="text-right">{worker.status}</div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2">
                  <div>Claimed Earnings</div>
                  <div className="text-right">{worker.rewards_claimed} xnt</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>Unclaimed Earnings:</div>
                  <div className="flex justify-end">
                    <Button
                      color="dark"
                      size={'md'}
                      style={{ width: '150px' }}
                      onClick={() => claimRewards(worker?.worker_ip)}
                    >
                      Claim {worker.rewards_unclaimed}xnt
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-5 border-b-2 border-black text-center text-2xl"></div>
          </div>
        ))}
    </div>
  );
};

export default Miners;
