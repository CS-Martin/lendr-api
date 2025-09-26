import { Module } from '@nestjs/common';
import { CollateralContractService } from './services/collateral-contract.service';
import { CollateralController } from './controllers/collateral.controller';
import { WalletService } from '../../viem/wallet.service';

@Module({
  controllers: [CollateralController],
  providers: [CollateralContractService, WalletService],
  exports: [CollateralContractService],
})
export class CollateralModule {}
