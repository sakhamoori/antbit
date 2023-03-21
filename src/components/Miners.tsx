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

  useEffect(() => {
    Axios.get(`/api/allworkers`).then((response) => {
      setWorkersHealth(JSON.parse(response.data.result));
    });
  }, []);

  const renderState = (status: string) => {
    if (status === 'idle') {
      return (
        <img
          src="https://gauelondvgmzvqfdmhco.supabase.co/storage/v1/object/public/cloud/initiating.png?t=2023-03-18T00%3A44%3A48.006Z"
          width="30px"
          height="30px"
          title={status}
        />
      );
    }
    if (status === 'hired') {
      return (
        <img
          src="https://gauelondvgmzvqfdmhco.supabase.co/storage/v1/object/public/cloud/online.png?t=2023-03-18T00%3A43%3A17.461Z"
          width="25px"
          height="25px"
          title={status}
        />
      );
    }
    if (status === 'offline') {
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
    <div>
      <h5 className="mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        My Mining Nodes
      </h5>
      {workersHealth &&
        workersHealth.map((worker) => (
          <div
            className="container my-10 items-center md:mx-auto"
            style={{ maxWidth: '600px' }}
          >
            <div className="mb-3 flex">
              {renderState(worker.status)}
              <span className="ml-2">Node: {worker?.worker_ip}</span>
            </div>
            <div className="space-y-2 divide-y divide-dotted divide-zinc-600 leading-10">
              <div className="grid grid-cols-2">
                <div className="flex">
                  Idle Hours
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000000#b2aeae"
                    transform="rotate(180)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        d="M12 7C12.5523 7 13 7.44772 13 8V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V8C11 7.44772 11.4477 7 12 7Z"
                        fill="#b2aeae"
                      />{' '}
                      <path
                        d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                        fill="#b2aeae"
                      />{' '}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
                        fill="#b2aeae"
                      />{' '}
                    </g>
                  </svg>
                </div>
                <div className="text-right">{worker.hours_idle} hrs</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex">
                  Compute Hours
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000000#b2aeae"
                    transform="rotate(180)"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        d="M12 7C12.5523 7 13 7.44772 13 8V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V8C11 7.44772 11.4477 7 12 7Z"
                        fill="#b2aeae"
                      />{' '}
                      <path
                        d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                        fill="#b2aeae"
                      />{' '}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
                        fill="#b2aeae"
                      />{' '}
                    </g>
                  </svg>
                </div>
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
              <div className="space-y-3">
                <div className="grid grid-cols-2">
                  <div>Claimed Earnings</div>
                  <div className="text-right">{worker.rewards_claimed} xnt</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>Hired Unclaimed Earnings:</div>
                  <div className="flex justify-end">
                    <Button color="dark" size={'md'} style={{ width: '150px' }}>
                      Claim {worker.rewards_unclaimed} xnt ~4$
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
