import { useCallback } from 'react';
import { useWallet } from './use-wallet';
import { ethers } from 'ethers';
import ChessBetABI from '@/contracts/ChessBet.json';

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your deployed contract address

export function useContract() {
  const { provider, address } = useWallet();

  const getContract = useCallback(() => {
    if (!provider || !address) return null;
    return new ethers.Contract(CONTRACT_ADDRESS, ChessBetABI, provider.getSigner());
  }, [provider, address]);

  const createGame = useCallback(async (lichessGameId: string, betAmount: string) => {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");

    const amountInWei = ethers.parseEther(betAmount);
    const tx = await contract.createGame(lichessGameId, amountInWei);
    await tx.wait();
  }, [getContract]);

  const joinGame = useCallback(async (lichessGameId: string, betAmount: string) => {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");

    const amountInWei = ethers.parseEther(betAmount);
    const tx = await contract.joinGame(lichessGameId);
    await tx.wait();
  }, [getContract]);

  const completeGame = useCallback(async (lichessGameId: string, winner: string) => {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");

    const tx = await contract.completeGame(lichessGameId, winner);
    await tx.wait();
  }, [getContract]);

  const getGame = useCallback(async (lichessGameId: string) => {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");

    return contract.getGame(lichessGameId);
  }, [getContract]);

  const getPlayerGames = useCallback(async (playerAddress: string) => {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");

    return contract.getPlayerGames(playerAddress);
  }, [getContract]);

  return {
    createGame,
    joinGame,
    completeGame,
    getGame,
    getPlayerGames,
  };
} 