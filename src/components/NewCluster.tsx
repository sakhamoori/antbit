/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable import/no-extraneous-dependencies */
import Axios from 'axios';
import { Button, Checkbox, Label } from 'flowbite-react';
import { useEffect, useState } from 'react';

type Offerings = {
  gpu_offer: [AvailableNodes];
  cpu_offer: [AvailableNodes];
  cpu_offer_price_per_hour: number;
  gpu_offer_price_per_hour: number;
};

type AvailableNodes = {
  cpu_count: number;
  worker_ip: string;
};

type NewClusterProps = {
  handleClose: any
}

const NewCluster = ({ handleClose }: NewClusterProps) => {
  const [checkedCPU, setChekcedCPU] = useState<string[]>();
  const [clusterOffering, setClusterOffering] = useState<Offerings | undefined>(
    undefined
  );

  const fetchClustersOfferings = async () => {
    await Axios.get(`/api/getclusters`).then((response) => {
      setClusterOffering(response?.data.result);
    });
  };

  const createCluster = async (ips: string[]) => {
    await Axios.post('/api/createcluster', {
      data: {
        hired_workers_ips: ips,
        max_age_in_hours: 10,
        credits_paid: 100,
      },
    });
    handleClose();
  };

  useEffect(() => {
    fetchClustersOfferings();
  }, []);

  const handleCPUOnChange = (e: any) => {
    let values: string[] = checkedCPU && checkedCPU?.length > 0 ? [...checkedCPU] : []; 
    if (e.target.checked) {
      values = [...values , e.target.value];
    } else {
      values = values.filter((item) => item !== e.target.value);
    }

    setChekcedCPU(values);
  };

  return (
    <div key="new-cluster" className="border-2">
      <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Workers available</h5>
      {!clusterOffering && <div>All our nodes are currently hired by other engineers please try again later</div>}
      {clusterOffering && clusterOffering.gpu_offer.length > 0 && (
        <>
          {clusterOffering.gpu_offer.map((gpu: AvailableNodes) => (
            <div className="mb-4 flex justify-center text-center">
              <div className="w-1/2">
                <Label htmlFor="txt_count">CPU Count: {gpu.cpu_count}</Label>
              </div>
              <div className="w-1/2">
                <Label className='mr-5'>{gpu.worker_ip}</Label>
                <Checkbox value={gpu.worker_ip} />
              </div>
            </div>
          ))}
          <div>
            <Label>
              GPU Offer: Price per hour - ${' '}
              {clusterOffering.gpu_offer_price_per_hour}
            </Label>
            <Button id="btn-gpu">Submit - GPU</Button>
          </div>
        </>
      )}
      <div>
        {clusterOffering && clusterOffering.cpu_offer.length > 0 && (
          <>
            <h3 className="text-center text-sm underline">CPU Available</h3>
            <div className="mb-3 flex justify-center text-center">
              <div className="w-1/2">
                <Label htmlFor="txt_count"><b>CPU Count</b></Label>
              </div>
              <div className="flex w-1/2 flex-row justify-center space-x-1 md:flex md:grow">
                <Label htmlFor="txt_count"><b>Checked</b></Label>
              </div>
            </div>
            {clusterOffering.cpu_offer.map((cpu: AvailableNodes) => (
              <div className="mb-3 flex">
                <div className="flex w-1/2 flex-row justify-center space-x-1 md:flex md:grow">
                  <Label htmlFor="txt_count">{cpu.cpu_count}</Label>
                </div>
                <div className="flex w-1/2 flex-row justify-center space-x-1 md:flex md:grow">
                  <Checkbox className="border-black bg-white text-black focus:ring-black"
                    value={cpu.worker_ip}
                    onChange={(e) => handleCPUOnChange(e)}
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-row justify-end space-x-1 md:flex md:grow">
              <Label>
                CPU Offer: Price per hour - ${' '}
                {clusterOffering?.cpu_offer_price_per_hour}
              </Label>
              <Button onClick={() => createCluster(checkedCPU && checkedCPU.length > 0 ? checkedCPU: [] )} color="dark" style={{width: "120px"}}>
                Deploy Cluster
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewCluster;
