import { Injectable } from '@nestjs/common';
import { publicClient, decodeEventLog } from '../../../viem/viem.config';
import { WalletService } from '../../../viem/wallet.service';
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
  constructor(private readonly walletService: WalletService) {}
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

  /**
   * Initiate a delegation rental by paying the required fees
   * @param rentalId - The rental agreement ID
   * @param payment - The payment amount in wei
   * @returns Promise<string> - Transaction hash or rental ID
   */
  async initiateDelegationRental(
    rentalId: string,
    payment: string,
  ): Promise<string> {
    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: DELEGATION_REGISTRY_ADDRESS,
        abi: DELEGATION_REGISTRY_ABI,
        functionName: 'initiateDelegationRental',
        args: [BigInt(rentalId)],
        value: BigInt(payment),
        chain: this.walletService.getWalletClient().chain,
        account: this.walletService.getWalletClient().account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      // Look for relevant events in the transaction logs
      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: DELEGATION_REGISTRY_ABI,
            data: log.data,
            topics: log.topics,
          });
          return (
            decoded.eventName === 'RentalInitiated' ||
            decoded.eventName === 'StateChanged'
          );
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: DELEGATION_REGISTRY_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).rentalId?.toString() || hash;
      }
      return hash;
    } catch (error) {
      throw new Error(`Failed to initiate delegation rental: ${error.message}`);
    }
  }

  /**
   * Activate delegation for a rental agreement
   * @param rentalId - The rental agreement ID
   * @returns Promise<string> - Transaction hash or rental ID
   */
  async activateDelegation(rentalId: string): Promise<string> {
    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: DELEGATION_REGISTRY_ADDRESS,
        abi: DELEGATION_REGISTRY_ABI,
        functionName: 'activateDelegation',
        args: [BigInt(rentalId)],
        chain: this.walletService.getWalletClient().chain,
        account: this.walletService.getWalletClient().account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      // Look for relevant events in the transaction logs
      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: DELEGATION_REGISTRY_ABI,
            data: log.data,
            topics: log.topics,
          });
          return (
            decoded.eventName === 'DelegationActivated' ||
            decoded.eventName === 'StateChanged'
          );
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: DELEGATION_REGISTRY_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).rentalId?.toString() || hash;
      }
      return hash;
    } catch (error) {
      throw new Error(`Failed to activate delegation: ${error.message}`);
    }
  }

  /**
   * Deposit NFT by lender for a rental agreement
   * @param rentalId - The rental agreement ID
   * @returns Promise<string> - Transaction hash or rental ID
   */
  async depositNFTByLender(rentalId: string): Promise<string> {
    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: DELEGATION_REGISTRY_ADDRESS,
        abi: DELEGATION_REGISTRY_ABI,
        functionName: 'depositNFTByLender',
        args: [BigInt(rentalId)],
        chain: this.walletService.getWalletClient().chain,
        account: this.walletService.getWalletClient().account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      // Look for relevant events in the transaction logs
      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: DELEGATION_REGISTRY_ABI,
            data: log.data,
            topics: log.topics,
          });
          return (
            decoded.eventName === 'NftDepositedByLender' ||
            decoded.eventName === 'StateChanged'
          );
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: DELEGATION_REGISTRY_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).rentalId?.toString() || hash;
      }
      return hash;
    } catch (error) {
      throw new Error(`Failed to deposit NFT by lender: ${error.message}`);
    }
  }

  /**
   * Complete delegation rental for a rental agreement
   * @param rentalId - The rental agreement ID
   * @returns Promise<string> - Transaction hash or rental ID
   */
  async completeDelegationRental(rentalId: string): Promise<string> {
    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: DELEGATION_REGISTRY_ADDRESS,
        abi: DELEGATION_REGISTRY_ABI,
        functionName: 'completeDelegationRental',
        args: [BigInt(rentalId)],
        chain: this.walletService.getWalletClient().chain,
        account: this.walletService.getWalletClient().account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      // Look for relevant events in the transaction logs
      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: DELEGATION_REGISTRY_ABI,
            data: log.data,
            topics: log.topics,
          });
          return (
            decoded.eventName === 'DelegationRentalCompleted' ||
            decoded.eventName === 'StateChanged'
          );
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: DELEGATION_REGISTRY_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).rentalId?.toString() || hash;
      }
      return hash;
    } catch (error) {
      throw new Error(`Failed to complete delegation rental: ${error.message}`);
    }
  }
}
