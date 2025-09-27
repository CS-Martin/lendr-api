import { Injectable } from '@nestjs/common';
import { publicClient, decodeEventLog } from '../../../viem/viem.config';
import { WalletService } from '../../../viem/wallet.service';
import { getAddress } from 'viem';
import {
  CUSTOM_NFT_COLLECTION_ADDRESS,
  CUSTOM_NFT_COLLECTION_ABI,
} from '../lib/custom-nft-collection.abi';

export interface ApproveParams {
  to: string;
  tokenId: string;
}

@Injectable()
export class CustomNftCollectionContractService {
  constructor(private readonly walletService: WalletService) {}

  /**
   * Approve an address to manage a specific NFT token
   * @param params - The approval parameters
   * @returns Promise<string> - Transaction hash
   */
  async approve(params: ApproveParams): Promise<string> {
    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: CUSTOM_NFT_COLLECTION_ADDRESS,
        abi: CUSTOM_NFT_COLLECTION_ABI,
        functionName: 'approve',
        args: [getAddress(params.to), BigInt(params.tokenId)],
        chain: this.walletService.getWalletClient().chain,
        account: this.walletService.getWalletClient().account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: CUSTOM_NFT_COLLECTION_ABI,
            data: log.data,
            topics: log.topics,
          });
          return decoded.eventName === 'Approval';
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: CUSTOM_NFT_COLLECTION_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).tokenId.toString();
      }
      return hash;
    } catch (error) {
      throw new Error(`Failed to approve NFT: ${error.message}`);
    }
  }

  /**
   * Get the approved address for a specific token
   * @param tokenId - The token ID
   * @returns Promise<string> - The approved address
   */
  async getApproved(tokenId: string): Promise<string> {
    try {
      const result = await publicClient.readContract({
        address: CUSTOM_NFT_COLLECTION_ADDRESS,
        abi: CUSTOM_NFT_COLLECTION_ABI,
        functionName: 'getApproved',
        args: [BigInt(tokenId)],
      });

      return result as string;
    } catch (error) {
      throw new Error(`Failed to get approved address: ${error.message}`);
    }
  }

  /**
   * Get the owner of a specific token
   * @param tokenId - The token ID
   * @returns Promise<string> - The owner address
   */
  async ownerOf(tokenId: string): Promise<string> {
    try {
      const result = await publicClient.readContract({
        address: CUSTOM_NFT_COLLECTION_ADDRESS,
        abi: CUSTOM_NFT_COLLECTION_ABI,
        functionName: 'ownerOf',
        args: [BigInt(tokenId)],
      });

      return result as string;
    } catch (error) {
      throw new Error(`Failed to get token owner: ${error.message}`);
    }
  }

  /**
   * Get the balance of NFTs for a specific address
   * @param owner - The owner address
   * @returns Promise<string> - The balance
   */
  async balanceOf(owner: string): Promise<string> {
    try {
      const result = await publicClient.readContract({
        address: CUSTOM_NFT_COLLECTION_ADDRESS,
        abi: CUSTOM_NFT_COLLECTION_ABI,
        functionName: 'balanceOf',
        args: [getAddress(owner)],
      });

      return (result as bigint).toString();
    } catch (error) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  /**
   * Get the token URI for a specific token
   * @param tokenId - The token ID
   * @returns Promise<string> - The token URI
   */
  async tokenURI(tokenId: string): Promise<string> {
    try {
      const result = await publicClient.readContract({
        address: CUSTOM_NFT_COLLECTION_ADDRESS,
        abi: CUSTOM_NFT_COLLECTION_ABI,
        functionName: 'tokenURI',
        args: [BigInt(tokenId)],
      });

      return result as string;
    } catch (error) {
      throw new Error(`Failed to get token URI: ${error.message}`);
    }
  }

  /**
   * Get the total number of minted tokens
   * @returns Promise<string> - The total minted count
   */
  async totalMinted(): Promise<string> {
    try {
      const result = await publicClient.readContract({
        address: CUSTOM_NFT_COLLECTION_ADDRESS,
        abi: CUSTOM_NFT_COLLECTION_ABI,
        functionName: 'totalMinted',
      });

      return (result as bigint).toString();
    } catch (error) {
      throw new Error(`Failed to get total minted: ${error.message}`);
    }
  }
}
