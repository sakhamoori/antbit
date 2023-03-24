/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable import/no-extraneous-dependencies */
import { useWallet } from '@solana/wallet-adapter-react';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js'
import Axios from 'axios';
import { Button, Checkbox, Label, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';

import { LAMPORTS_PER_SOL } from '@/constants';

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

declare global {
  interface Window { // ⚠️ notice that "Window" is capitalized here
    solana: any;
  }
}

const NewCluster = ({ handleClose }: NewClusterProps) => {
  const { publicKey } = useWallet();

  const [checkedCPU, setChekcedCPU] = useState<string[]>();
  const [clusterOffering, setClusterOffering] = useState<Offerings | undefined>(
    undefined
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const network = clusterApiUrl('testnet');
  const connection = new Connection(network, 'confirmed');

  const fetchClustersOfferings = async () => {
    await Axios.get(`/api/getclusters`).then((response) => {
      setClusterOffering(response?.data.result);
    });
  };

  const createCluster = async () => {
    if ((checkedCPU && checkedCPU.length === 0) || publicKey === null) {
      return;
    }

    setIsProcessing(true)

    await Axios.post('/api/createcluster', {
      data: {
        hired_workers_ips: checkedCPU,
        max_age_in_hours: 10,
        credits_paid: 100,
      },
    });

    const lamportAmount = parseFloat('.01') * LAMPORTS_PER_SOL

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey('GCAfdoG1VbyRhTUnnHBp2wtmpmxpiU42VMyFj5GjKEyz'),
          lamports: lamportAmount,
        }),
      )

      tx.feePayer = publicKey
      const { blockhash } = await connection.getLatestBlockhash()
      tx.recentBlockhash = blockhash

      const { signature } = await window.solana.signAndSendTransaction(tx)

      await connection.confirmTransaction(signature, 'confirmed')
    
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
            <h3 className="text-center text-sm underline">CPU's Available</h3>
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
              {
                isProcessing && <Button disabled={true}
                  className=" bg-gray-800 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                  <div className="mr-3">
                    <Spinner
                      size="sm"
                      light={true}
                    />
                  </div>
                  Processing ...
                </Button>
              }
              {
                !isProcessing && <Button onClick={() => createCluster()} className="bg-gray-800 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                  Deploy Cluster
                </Button>
              }
              
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewCluster;
