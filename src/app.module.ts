import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactoryModule } from './modules/factory/factory.module';
import { DelegationModule } from './modules/delegation/delegation.module';
import { CollateralModule } from './modules/collateral/collateral.module';
import { CustomNftCollectionModule } from './modules/custom-nft-collection/custom-nft-collection.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FactoryModule,
    DelegationModule,
    CollateralModule,
    CustomNftCollectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
