import { Injectable } from '@nestjs/common';
import { publicClient, decodeEventLog } from '../../../viem/viem.config';
import { WalletService } from '../../../viem/wallet.service';
import { getAddress } from 'viem';
import {
  COLLATERAL_SMART_CONTRACT_ADDRESS,
  COLLATERAL_SMART_CONTRACT_ABI,
} from '../lib/collateral.abi';
import { transformBigIntToString } from '../../../utils/bigint.util';

export interface CollateralAgreement {
  lender: string;
  nftContract: string;
  tokenId: string;
  hourlyRentalFee: string;
  collateral: string;
  rentalDurationInHours: string;
  nftStandard: number;
  dealDuration: number;
  renter: string;
  rentalState: number;
  rentalEndTime: string;
  lenderDepositDeadline: string;
  returnDeadline: string;
  renterClaimDeadline: string;
  platformFeeBps: string;
  factoryAddress: string;
}

export interface CreateRentalAgreementParams {
  rentalId: string;
  lender: string;
  nftContract: string;
  tokenId: string;
  hourlyRentalFee: string;
  collateral: string;
  rentalDurationInHours: string;
  nftStandard: number;
  dealDuration: number;
}

export interface InitiateRentalParams {
  rentalId: string;
  payment: string;
}

@Injectable()
export class CollateralContractService {
  constructor(private readonly walletService: WalletService) {}

  /**
   * Create a rental agreement in the collateral registry
   * @param params - The rental agreement parameters
   * @returns Promise<string> - Transaction hash
   */
  async createRentalAgreement(
    params: CreateRentalAgreementParams,
  ): Promise<string> {
    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: COLLATERAL_SMART_CONTRACT_ADDRESS,
        abi: COLLATERAL_SMART_CONTRACT_ABI,
        functionName: 'createRentalAgreement',
        args: [
          BigInt(params.rentalId),
          getAddress(params.lender),
          getAddress(params.nftContract),
          BigInt(params.tokenId),
          BigInt(params.hourlyRentalFee),
          BigInt(params.collateral),
          BigInt(params.rentalDurationInHours),
          params.nftStandard,
          params.dealDuration,
        ],
        chain: this.walletService.getWalletClient().chain,
        account: this.walletService.getWalletClient().account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: COLLATERAL_SMART_CONTRACT_ABI,
            data: log.data,
            topics: log.topics,
          });
          return decoded.eventName === 'StateChanged';
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: COLLATERAL_SMART_CONTRACT_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).rentalId.toString();
      }
      return hash;
    } catch (error) {
      throw new Error(`Failed to create rental agreement: ${error.message}`);
    }
  }

  /**
   * Initiate a rental by paying the required fees
   * @param params - The rental initiation parameters
   * @returns Promise<string> - Transaction hash
   */
  async initiateRental(params: InitiateRentalParams): Promise<string> {
    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: COLLATERAL_SMART_CONTRACT_ADDRESS,
        abi: COLLATERAL_SMART_CONTRACT_ABI,
        functionName: 'initiateRental',
        args: [BigInt(params.rentalId)],
        value: BigInt(params.payment),
        chain: this.walletService.getWalletClient().chain,
        account: this.walletService.getWalletClient().account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: COLLATERAL_SMART_CONTRACT_ABI,
            data: log.data,
            topics: log.topics,
          });
          return decoded.eventName === 'RentalInitiated';
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: COLLATERAL_SMART_CONTRACT_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).rentalId.toString();
      }
      return hash;
    } catch (error) {
      throw new Error(`Failed to initiate rental: ${error.message}`);
    }
  }

  /**
   * Deposit NFT by lender
   * @param rentalId - The rental agreement ID
   * @returns Promise<string> - Transaction hash
   */
  async depositNFTByLender(rentalId: string): Promise<string> {
    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: COLLATERAL_SMART_CONTRACT_ADDRESS,
        abi: COLLATERAL_SMART_CONTRACT_ABI,
        functionName: 'depositNFTByLender',
        args: [BigInt(rentalId)],
        chain: this.walletService.getWalletClient().chain,
        account: this.walletService.getWalletClient().account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: COLLATERAL_SMART_CONTRACT_ABI,
            data: log.data,
            topics: log.topics,
          });
          return decoded.eventName === 'NftDepositedByLender';
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: COLLATERAL_SMART_CONTRACT_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).rentalId.toString();
      }
      return hash;
    } catch (error) {
      throw new Error(`Failed to deposit NFT: ${error.message}`);
    }
  }

  /**
   * Release NFT to renter
   * @param rentalId - The rental agreement ID
   * @returns Promise<string> - Transaction hash
   */
  async releaseNFTToRenter(rentalId: string): Promise<string> {
    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: COLLATERAL_SMART_CONTRACT_ADDRESS,
        abi: COLLATERAL_SMART_CONTRACT_ABI,
        functionName: 'releaseNFTToRenter',
        args: [BigInt(rentalId)],
        chain: this.walletService.getWalletClient().chain,
        account: this.walletService.getWalletClient().account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: COLLATERAL_SMART_CONTRACT_ABI,
            data: log.data,
            topics: log.topics,
          });
          return decoded.eventName === 'NftReleasedToRenter';
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: COLLATERAL_SMART_CONTRACT_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).rentalId.toString();
      }
      return hash;
    } catch (error) {
      throw new Error(`Failed to release NFT to renter: ${error.message}`);
    }
  }

  /**
   * Return NFT to lender
   * @param rentalId - The rental agreement ID
   * @returns Promise<string> - Transaction hash
   */
  async returnNFTToLender(rentalId: string): Promise<string> {
    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: COLLATERAL_SMART_CONTRACT_ADDRESS,
        abi: COLLATERAL_SMART_CONTRACT_ABI,
        functionName: 'returnNFTToLender',
        args: [BigInt(rentalId)],
        chain: this.walletService.getWalletClient().chain,
        account: this.walletService.getWalletClient().account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: COLLATERAL_SMART_CONTRACT_ABI,
            data: log.data,
            topics: log.topics,
          });
          return decoded.eventName === 'NftReturnedByRenter';
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: COLLATERAL_SMART_CONTRACT_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).rentalId.toString();
      }
      return hash;
    } catch (error) {
      throw new Error(`Failed to return NFT to lender: ${error.message}`);
    }
  }

  /**
   * Claim collateral when defaulted
   * @param rentalId - The rental agreement ID
   * @returns Promise<string> - Transaction hash
   */
  async claimCollateralWhenDefaulted(rentalId: string): Promise<string> {
    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: COLLATERAL_SMART_CONTRACT_ADDRESS,
        abi: COLLATERAL_SMART_CONTRACT_ABI,
        functionName: 'claimCollateralWhenDefaulted',
        args: [BigInt(rentalId)],
        chain: this.walletService.getWalletClient().chain,
        account: this.walletService.getWalletClient().account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: COLLATERAL_SMART_CONTRACT_ABI,
            data: log.data,
            topics: log.topics,
          });
          return decoded.eventName === 'CollateralClaimed';
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: COLLATERAL_SMART_CONTRACT_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).rentalId.toString();
      }
      return hash;
    } catch (error) {
      throw new Error(`Failed to claim collateral: ${error.message}`);
    }
  }

  /**
   * Get rental agreement details
   * @param rentalId - The rental agreement ID
   * @returns Promise<CollateralAgreement> - The rental agreement details
   */
  async getRentalAgreement(rentalId: number): Promise<CollateralAgreement> {
    try {
      const result = await publicClient.readContract({
        address: COLLATERAL_SMART_CONTRACT_ADDRESS,
        abi: COLLATERAL_SMART_CONTRACT_ABI,
        functionName: 's_agreements',
        args: [BigInt(rentalId)],
      });

      return transformBigIntToString(result) as CollateralAgreement;
    } catch (error) {
      throw new Error(`Failed to get rental agreement: ${error.message}`);
    }
  }

  /**
   * Get total hourly fee for a rental
   * @param rentalId - The rental agreement ID
   * @returns Promise<string> - The total hourly fee
   */
  async getTotalHourlyFee(rentalId: number): Promise<string> {
    try {
      const result = await publicClient.readContract({
        address: COLLATERAL_SMART_CONTRACT_ADDRESS,
        abi: COLLATERAL_SMART_CONTRACT_ABI,
        functionName: 'getTotalHourlyFee',
        args: [BigInt(rentalId)],
      });

      return (result as bigint).toString();
    } catch (error) {
      throw new Error(`Failed to get total hourly fee: ${error.message}`);
    }
  }

  /**
   * Get total rental fee with collateral
   * @param rentalId - The rental agreement ID
   * @returns Promise<string> - The total rental fee with collateral
   */
  async getTotalRentalFeeWithCollateral(rentalId: number): Promise<string> {
    try {
      const result = await publicClient.readContract({
        address: COLLATERAL_SMART_CONTRACT_ADDRESS,
        abi: COLLATERAL_SMART_CONTRACT_ABI,
        functionName: 'getTotalRentalFeeWithCollateral',
        args: [BigInt(rentalId)],
      });

      return (result as bigint).toString();
    } catch (error) {
      throw new Error(
        `Failed to get total rental fee with collateral: ${error.message}`,
      );
    }
  }

  /**
   * Get contract owner
   * @returns Promise<string> - The contract owner address
   */
  async getOwner(): Promise<string> {
    try {
      const result = await publicClient.readContract({
        address: COLLATERAL_SMART_CONTRACT_ADDRESS,
        abi: COLLATERAL_SMART_CONTRACT_ABI,
        functionName: 'i_owner',
      });

      return result as string;
    } catch (error) {
      throw new Error(`Failed to get owner: ${error.message}`);
    }
  }

  /**
   * Check if address is authorized
   * @param address - The address to check
   * @returns Promise<boolean> - Whether the address is authorized
   */
  async isAuthorized(address: string): Promise<boolean> {
    try {
      const result = await publicClient.readContract({
        address: COLLATERAL_SMART_CONTRACT_ADDRESS,
        abi: COLLATERAL_SMART_CONTRACT_ABI,
        functionName: 's_isAuthorized',
        args: [getAddress(address)],
      });

      return result as boolean;
    } catch (error) {
      throw new Error(`Failed to check authorization: ${error.message}`);
    }
  }
}
