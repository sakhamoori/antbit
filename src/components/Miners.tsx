// import { getWokersHealth } from "@/pages/api/workers";
// import { getWokersHealth } from '../pages/api/workers'
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

  return (
    <div>
      <p>Miners</p>
      {workersHealth &&
        workersHealth.map((worker) => (
          <div className="card bg-neutral hover:bg-primary px-3">
            <div className="flex">
              <svg
                className="h-6 w-6 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Node: {worker?.worker_ip}</span>
            </div>
            {/* <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div className="h-1 bg-primary" style={{ width: "45%" }}></div>
              </div> */}
            <div>Idle Hours: {worker.hours_idle}</div>
            <div>Compute Hours: {worker.hours_hired}</div>
            <div>Total Hours: {worker.hours_idle + worker.hours_hired}</div>
            <div>Claimed Earnings: {worker.rewards_claimed} xnt</div>
            <div className="flex flex-wrap gap-2">
              Idle Unclaimed Earnings:{' '}
              <Button color="dark" size={'sm'}>
                {worker.rewards_unclaimed} xnt
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              Hired Unclaimed Earnings:{' '}
              <Button color="dark" size={'sm'}>
                {worker.rewards_unclaimed} xnt
              </Button>
            </div>
            <br />
          </div>
        ))}
    </div>
  );
};

export default Miners;
