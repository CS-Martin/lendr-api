import { Injectable } from '@nestjs/common';
import { publicClient } from '../../../viem/viem.config';
import {
  DELEGATION_REGISTRY_ADDRESS,
  DELEGATION_REGISTRY_ABI,
} from '../lib/delegation.abi';
import {
  transformRentalAgreement,
  transformDelegation,
  transformBigIntToString,
} from '../../../utils/bigint.util';

export interface RentalAgreement {
  lender: string;
  nftContract: string;
  tokenId: string;
  hourlyRentalFee: string;
  rentalDurationInHours: string;
  s_nftStandard: number;
  dealDuration: number;
  renter: string;
  rentalState: number;
  rentalEndTime: string;
  lenderDelegationDeadline: string;
  platformFeeBps: string;
  factoryAddress: string;
}

@Injectable()
export class DelegationContractService {
  /**
   * Get rental agreement details by rental ID
   * @param rentalId - The rental agreement ID
   * @returns Promise<RentalAgreement> - The rental agreement details
   */
  async getRentalAgreement(rentalId: number): Promise<RentalAgreement> {
    try {
      const result = await publicClient.readContract({
        address: DELEGATION_REGISTRY_ADDRESS,
        abi: DELEGATION_REGISTRY_ABI,
        functionName: 'getRentalAgreement',
        args: [BigInt(rentalId)],
      });

      return transformRentalAgreement(result) as RentalAgreement;
    } catch (error) {
      throw new Error(`Failed to get rental agreement: ${error.message}`);
    }
  }

  /**
   * Get delegation details for an NFT
   * @param nftContract - The NFT contract address
   * @param tokenId - The token ID
   * @returns Promise<{user: string, expires: bigint}> - The delegation details
   */
  async getDelegation(
    nftContract: string,
    tokenId: number,
  ): Promise<{ user: string; expires: string }> {
    try {
      const result = await publicClient.readContract({
        address: DELEGATION_REGISTRY_ADDRESS,
        abi: DELEGATION_REGISTRY_ABI,
        functionName: 'getDelegation',
        args: [nftContract as `0x${string}`, BigInt(tokenId)],
      });

      return transformDelegation(result) as { user: string; expires: string };
    } catch (error) {
      throw new Error(`Failed to get delegation: ${error.message}`);
    }
  }

  /**
   * Get the user who has delegated access to an NFT
   * @param nftContract - The NFT contract address
   * @param tokenId - The token ID
   * @returns Promise<string> - The user address
   */
  async userOf(nftContract: string, tokenId: number): Promise<string> {
    try {
      const result = await publicClient.readContract({
        address: DELEGATION_REGISTRY_ADDRESS,
        abi: DELEGATION_REGISTRY_ABI,
        functionName: 'userOf',
        args: [nftContract as `0x${string}`, BigInt(tokenId)],
      });

      return result as string;
    } catch (error) {
      throw new Error(`Failed to get user of NFT: ${error.message}`);
    }
  }

  /**
   * Get the expiration time for delegated access to an NFT
   * @param nftContract - The NFT contract address
   * @param tokenId - The token ID
   * @returns Promise<bigint> - The expiration timestamp
   */
  async userExpires(nftContract: string, tokenId: number): Promise<string> {
    try {
      const result = await publicClient.readContract({
        address: DELEGATION_REGISTRY_ADDRESS,
        abi: DELEGATION_REGISTRY_ABI,
        functionName: 'userExpires',
        args: [nftContract as `0x${string}`, BigInt(tokenId)],
      });

      return transformBigIntToString(result) as string;
    } catch (error) {
      throw new Error(`Failed to get user expiration: ${error.message}`);
    }
  }

  /**
   * Get the total hourly fee for a rental agreement
   * @param rentalId - The rental agreement ID
   * @returns Promise<bigint> - The total hourly fee
   */
  async getTotalHourlyFee(rentalId: number): Promise<string> {
    try {
      const result = await publicClient.readContract({
        address: DELEGATION_REGISTRY_ADDRESS,
        abi: DELEGATION_REGISTRY_ABI,
        functionName: 'getTotalHourlyFee',
        args: [BigInt(rentalId)],
      });

      return transformBigIntToString(result) as string;
    } catch (error) {
      throw new Error(`Failed to get total hourly fee: ${error.message}`);
    }
  }
}
