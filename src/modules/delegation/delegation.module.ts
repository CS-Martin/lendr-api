import { Module } from '@nestjs/common';
import { DelegationContractService } from './services/delegation-contract.service';
import { DelegationController } from './controllers/delegation.controller';
import { WalletService } from '../../viem/wallet.service';

@Module({
  controllers: [DelegationController],
  providers: [DelegationContractService, WalletService],
  exports: [DelegationContractService],
})
export class DelegationModule {}
