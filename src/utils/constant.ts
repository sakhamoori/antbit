import { clusterApiUrl, Connection } from '@solana/web3.js';

/* eslint-disable @typescript-eslint/naming-convention */
export const API_UserName = process.env.API_USER;
export const API_Password = process.env.API_PASSWORD;
export const { BASE_URL } = process.env;

export const commitmentLevel = 'processed';
export const endpoint =
  process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || clusterApiUrl('devnet');
export const connection = new Connection(endpoint, commitmentLevel);
