import { Injectable, Logger } from '@nestjs/common';
import { publicClient, decodeEventLog } from '../../../viem/viem.config';
import { WalletService } from '../../../viem/wallet.service';
import { getAddress } from 'viem';
import {
  FACTORY_SMART_CONTRACT_ADDRESS,
  FACTORY_SMART_CONTRACT_ABI,
} from '../lib/factory.abi';
import { transformBigIntToString } from '../../../utils/bigint.util';

export interface CollateralRentalAgreementParams {
  lender: string;
  nftContract: string;
  tokenId: string;
  hourlyRentalFee: string;
  collateral: string;
  rentalDurationInHours: string;
  nftStandard: number;
  dealDuration: number;
}

export interface DelegationRentalAgreementParams {
  lender: string;
  nftContract: string;
  tokenId: string;
  hourlyRentalFee: string;
  rentalDurationInHours: string;
  nftStandard: number;
  dealDuration: number;
}

@Injectable()
export class FactoryContractService {
  private readonly logger: Logger;

  constructor(private readonly walletService: WalletService) {
    this.logger = new Logger(FactoryContractService.name);
  }
  /**
   * Create a collateral rental agreement
   * @param params - The collateral rental agreement parameters
   * @returns Promise<string> - The deployed rental agreement contract address
   */
  async createCollateralRentalAgreement(
    params: CollateralRentalAgreementParams,
  ): Promise<string> {
    this.logger.log('Creating collateral rental agreement', params);

    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: FACTORY_SMART_CONTRACT_ADDRESS,
        abi: FACTORY_SMART_CONTRACT_ABI,
        functionName: 'createCollateralRentalAgreement',
        args: [
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
      });

      // Wait for transaction to be mined
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      // Get the event data to return the deployed contract address
      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: FACTORY_SMART_CONTRACT_ABI,
            data: log.data,
            topics: log.topics,
          });

          return decoded.eventName === 'CollateralRentalAgreementCreated';
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: FACTORY_SMART_CONTRACT_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).rentalId.toString();
      }

      return hash; // Return transaction hash if event not found
    } catch (error) {
      this.logger.error('Error creating collateral rental agreement', error);
      throw new Error(
        `Failed to create collateral rental agreement: ${error.message}`,
      );
    }
  }

  /**
   * Create a delegation rental agreement
   * @param params - The delegation rental agreement parameters
   * @returns Promise<string> - The deployed rental agreement contract address
   */
  async createDelegationRentalAgreement(
    params: DelegationRentalAgreementParams,
  ): Promise<string> {
    this.logger.log('Creating delegation rental agreement', params);

    try {
      const hash = await this.walletService.getWalletClient().writeContract({
        address: FACTORY_SMART_CONTRACT_ADDRESS,
        abi: FACTORY_SMART_CONTRACT_ABI,
        functionName: 'createDelegationRentalAgreement',
        args: [
          getAddress(params.lender),
          getAddress(params.nftContract),
          BigInt(params.tokenId),
          BigInt(params.hourlyRentalFee),
          BigInt(params.rentalDurationInHours),
          params.nftStandard,
          params.dealDuration,
        ],
        chain: this.walletService.getWalletClient().chain,
      });

      // Wait for transaction to be mined
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      // Get the event data to return the deployed contract address
      const event = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: FACTORY_SMART_CONTRACT_ABI,
            data: log.data,
            topics: log.topics,
          });
          return decoded.eventName === 'DelegationRentalAgreementCreated';
        } catch {
          return false;
        }
      });

      if (event) {
        const decoded = decodeEventLog({
          abi: FACTORY_SMART_CONTRACT_ABI,
          data: event.data,
          topics: event.topics,
        });
        return (decoded.args as any).rentalId.toString();
      }

      return hash; // Return transaction hash if event not found
    } catch (error) {
      this.logger.error('Error creating delegation rental agreement', error);
      throw new Error(
        `Failed to create delegation rental agreement: ${error.message}`,
      );
    }
  }

  /**
   * Get the collateral registry address
   * @returns Promise<string> - The collateral registry contract address
   */
  async getCollateralRegistry(): Promise<string> {
    this.logger.log('Getting collateral registry');

    try {
      const result = await publicClient.readContract({
        address: FACTORY_SMART_CONTRACT_ADDRESS,
        abi: FACTORY_SMART_CONTRACT_ABI,
        functionName: 'i_collateralRegistry',
      });

      this.logger.log('Collateral registry', result);

      return result as string;
    } catch (error) {
      this.logger.error('Error getting collateral registry', error);
      throw new Error(`Failed to get collateral registry: ${error.message}`);
    }
  }

  /**
   * Get the delegation registry address
   * @returns Promise<string> - The delegation registry contract address
   */
  async getDelegationRegistry(): Promise<string> {
    this.logger.log('Getting delegation registry');

    try {
      const result = await publicClient.readContract({
        address: FACTORY_SMART_CONTRACT_ADDRESS,
        abi: FACTORY_SMART_CONTRACT_ABI,
        functionName: 'i_delegationRegistry',
      });

      this.logger.log('Delegation registry', result);

      return result as string;
    } catch (error) {
      this.logger.error('Error getting delegation registry', error);
      throw new Error(`Failed to get delegation registry: ${error.message}`);
    }
  }

  /**
   * Get the deployer address
   * @returns Promise<string> - The deployer address
   */
  async getDeployer(): Promise<string> {
    this.logger.log('Getting deployer');

    try {
      const result = await publicClient.readContract({
        address: FACTORY_SMART_CONTRACT_ADDRESS,
        abi: FACTORY_SMART_CONTRACT_ABI,
        functionName: 'i_deployer',
      });

      this.logger.log('Deployer', result);

      return result as string;
    } catch (error) {
      this.logger.error('Error getting deployer', error);
      throw new Error(`Failed to get deployer: ${error.message}`);
    }
  }

  /**
   * Get a collateral rental agreement by ID
   * @param rentalId - The rental agreement ID
   * @returns Promise<string> - The rental agreement contract address
   */
  async getCollateralRentalAgreementById(rentalId: number): Promise<string> {
    this.logger.log('Getting collateral rental agreement by ID', rentalId);

    try {
      const result = await publicClient.readContract({
        address: FACTORY_SMART_CONTRACT_ADDRESS,
        abi: FACTORY_SMART_CONTRACT_ABI,
        functionName: 's_collateralRentalAgreementById',
        args: [BigInt(rentalId)],
      });

      this.logger.log('Collateral rental agreement by ID', result);

      return result as string;
    } catch (error) {
      this.logger.error(
        'Error getting collateral rental agreement by ID',
        error,
      );
      throw new Error(
        `Failed to get collateral rental agreement by ID: ${error.message}`,
      );
    }
  }

  /**
   * Get the platform fee in basis points
   * @returns Promise<string> - The platform fee in basis points
   */
  async getFeeBps(): Promise<string> {
    this.logger.log('Getting fee BPS');

    try {
      const result = await publicClient.readContract({
        address: FACTORY_SMART_CONTRACT_ADDRESS,
        abi: FACTORY_SMART_CONTRACT_ABI,
        functionName: 's_feeBps',
      });

      this.logger.log('Fee BPS', result);

      return transformBigIntToString(result) as string;
    } catch (error) {
      this.logger.error('Error getting fee BPS', error);
      throw new Error(`Failed to get fee BPS: ${error.message}`);
    }
  }

  /**
   * Get the total number of rentals
   * @returns Promise<string> - The total number of rentals
   */
  async getTotalRentals(): Promise<string> {
    this.logger.log('Getting total rentals');

    try {
      const result = await publicClient.readContract({
        address: FACTORY_SMART_CONTRACT_ADDRESS,
        abi: FACTORY_SMART_CONTRACT_ABI,
        functionName: 's_totalRentals',
      });

      this.logger.log('Total rentals', result);

      return transformBigIntToString(result);
    } catch (error) {
      this.logger.error('Error getting total rentals', error);
      throw new Error(`Failed to get total rentals: ${error.message}`);
    }
  }
}
