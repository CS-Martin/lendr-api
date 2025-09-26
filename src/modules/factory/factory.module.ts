import { Module } from '@nestjs/common';
import { FactoryContractService } from './services/factory-contract.service';
import { FactoryController } from './controllers/factory.controller';
import { WalletService } from '../../viem/wallet.service';

@Module({
  controllers: [FactoryController],
  providers: [FactoryContractService, WalletService],
  exports: [FactoryContractService],
})
export class FactoryModule {}
