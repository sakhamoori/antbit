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
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAn5JREFUSEuNlouR2kAQRN9kQAbgCI6L4OwMIAJfBkAExhGAI7AvAnAE2BGYywAyIINx9e5I2pUEtqqgJNV8e3p6ZegywNNd/di+v2fQ+dR32V7/1kTvhRhmLSP0Eg9962ILV+XzqhvgFXgB5vGT/Tn/7Aj+s0zQT9Z20ANHjwtgB8zGYCzsL8AGOI4B1oMod2DO3mEVDlewPfivqFo2c5yPwBqYht0+ElXwqqN+gXuDVZq5scGRY0GEtog8RvO1ObvgyLdIWhKmQk2wHOLNc2A9SrNyVAZzhz8RdZlmEwZ9Fl0wpnjCNFc+0mKf1mEiuHYGF4cPhVvbgdjyHeNqziwgqkjVY8iEPKevxXsNfAq2xPyo3cod5HZ+AJ81KENDLik7YPrE4OSZukqwjRmkLoA3jNcuQR7X2bEnzJ/xxPPBYGPbVfkpcH+HxKZbQKKEmsUZQ3GqDhqxsGJRt0HZJkAKjjE3590V3LiVMpNFJ0VIDC0hygkMC4ct8CWY9CkGe4ptjsrt1q19W1YVp9xkrX4JkarVcj1FyxqV6NiHpdykBiLZ6D7V1VztkDNF05AnuJLYU1Sag/dg6bTT10ZaujdpWKhpAOUsHA4YF1w8bltuOlEh5UB7EpAKkq+kY4kxoKkc0qKZs/Fq0WwS+n5r9iPPqaLvGmOHc20EsuugNbUF+CEwK6Si2unBwz+kYqAHkohGSbU4ErB6LbqC7otdNFcOuWxZQ14FLNIWJf1dyrU5L46tMZ8FrWsl7RKMnmJKJrgUuNH7DvH6CJN2rf3+gXNPMkt22SIOGe2ELtE1H5khagNpibbGDpzHE62Y81AQm5wPvgla/+Gx/j9fIbL5C0t9GCyWvBRmAAAAAElFTkSuQmCC" />
              <span className="ml-2">Node: {worker?.worker_ip}</span>
            </div>
            <div className="space-y-2 divide-y divide-dotted divide-zinc-600 leading-10">
              <div className="grid grid-cols-2">
                <div className="flex">
                  Ideal Hours
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
              <div className="space-y-3">
                <div className="grid grid-cols-2">
                  <div>Claimed Earnings</div>
                  <div className="text-right">{worker.rewards_claimed} xnt</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>Hired Unclaimed Earnings:</div>
                  <div className="flex justify-end">
                    <Button color="light" size={'md'}>
                      Claim {worker.rewards_unclaimed} xnt ~4$
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-5 border-b-2 border-black text-center text-2xl"></div>
          </div>
          // <div className="relative mx-auto grid max-w-sm grid-cols-1 items-center py-5">
          //   <div className="my-px space-y-1.5 divide-y divide-dotted divide-gray-600">
          //     <div className="flex">
          //       <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAn5JREFUSEuNlouR2kAQRN9kQAbgCI6L4OwMIAJfBkAExhGAI7AvAnAE2BGYywAyIINx9e5I2pUEtqqgJNV8e3p6ZegywNNd/di+v2fQ+dR32V7/1kTvhRhmLSP0Eg9962ILV+XzqhvgFXgB5vGT/Tn/7Aj+s0zQT9Z20ANHjwtgB8zGYCzsL8AGOI4B1oMod2DO3mEVDlewPfivqFo2c5yPwBqYht0+ElXwqqN+gXuDVZq5scGRY0GEtog8RvO1ObvgyLdIWhKmQk2wHOLNc2A9SrNyVAZzhz8RdZlmEwZ9Fl0wpnjCNFc+0mKf1mEiuHYGF4cPhVvbgdjyHeNqziwgqkjVY8iEPKevxXsNfAq2xPyo3cod5HZ+AJ81KENDLik7YPrE4OSZukqwjRmkLoA3jNcuQR7X2bEnzJ/xxPPBYGPbVfkpcH+HxKZbQKKEmsUZQ3GqDhqxsGJRt0HZJkAKjjE3590V3LiVMpNFJ0VIDC0hygkMC4ct8CWY9CkGe4ptjsrt1q19W1YVp9xkrX4JkarVcj1FyxqV6NiHpdykBiLZ6D7V1VztkDNF05AnuJLYU1Sag/dg6bTT10ZaujdpWKhpAOUsHA4YF1w8bltuOlEh5UB7EpAKkq+kY4kxoKkc0qKZs/Fq0WwS+n5r9iPPqaLvGmOHc20EsuugNbUF+CEwK6Si2unBwz+kYqAHkohGSbU4ErB6LbqC7otdNFcOuWxZQ14FLNIWJf1dyrU5L46tMZ8FrWsl7RKMnmJKJrgUuNH7DvH6CJN2rf3+gXNPMkt22SIOGe2ELtE1H5khagNpibbGDpzHE62Y81AQm5wPvgla/+Gx/j9fIbL5C0t9GCyWvBRmAAAAAElFTkSuQmCC" />
          //       <span>Node: {worker?.worker_ip}</span>
          //     </div>
          //     <div>
          //       Idle Hours: {worker.hours_idle}
          //     </div>
          //     <div className="divide-dotted">Compute Hours: {worker.hours_hired}</div>
          //     <div className="divide-dotted">Total Hours: {worker.hours_idle + worker.hours_hired}</div>
          //     <div className="divide-dotted">Claimed Earnings: {worker.rewards_claimed} xnt</div>
          //     <div className="flex flex-wrap gap-2 divide-dotted">
          //       Idle Unclaimed Earnings:{' '}
          //       <Button color="dark" size={'sm'}>
          //         {worker.rewards_unclaimed} xnt
          //       </Button>
          //     </div>
          //     <div className="flex flex-wrap gap-2 ">
          //       Hired Unclaimed Earnings:{' '}
          //       <Button
          //         color="dark"
          //         size={'sm'}
          //         onClick={() => signAndSendTransactionRequest()}
          //       >
          //         {worker.rewards_unclaimed} xnt
          //       </Button>
          //     </div>
          //   </div>
          //   <div className="h-5 border-b-4 border-black text-center text-2xl"></div>
          // </div>
        ))}
    </div>
  );
};

export default Miners;
