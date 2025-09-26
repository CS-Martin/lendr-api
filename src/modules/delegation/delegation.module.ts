import { Module } from '@nestjs/common';
import { DelegationContractService } from './services/delegation-contract.service';
import { DelegationController } from './controllers/delegation.controller';

@Module({
  controllers: [DelegationController],
  providers: [DelegationContractService],
  exports: [DelegationContractService],
})
export class DelegationModule {}
