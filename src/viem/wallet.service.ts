import { Injectable, OnModuleInit } from '@nestjs/common';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { polygonAmoy } from 'viem/chains';

@Injectable()
export class WalletService implements OnModuleInit {
  private walletClient: any = null;

  async onModuleInit() {
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('PRIVATE_KEY environment variable is required');
    }

    const account = privateKeyToAccount(privateKey as `0x${string}`);
    this.walletClient = createWalletClient({
      account,
      chain: polygonAmoy,
      transport: http(),
    });
  }

  getWalletClient() {
    if (!this.walletClient) {
      throw new Error('Wallet client not initialized');
    }
    return this.walletClient;
  }
}
