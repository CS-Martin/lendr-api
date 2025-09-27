import { Module } from '@nestjs/common';
import { CustomNftCollectionContractService } from './services/custom-nft-collection-contract.service';
import { CustomNftCollectionController } from './controllers/custom-nft-collection.controller';
import { WalletService } from '../../viem/wallet.service';

@Module({
  controllers: [CustomNftCollectionController],
  providers: [CustomNftCollectionContractService, WalletService],
  exports: [CustomNftCollectionContractService],
})
export class CustomNftCollectionModule {}
