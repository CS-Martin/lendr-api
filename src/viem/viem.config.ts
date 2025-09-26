import {
  createPublicClient,
  http,
  createWalletClient,
  decodeEventLog,
} from 'viem';
import { polygonAmoy } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// Public Client (for reading data)
export const publicClient = createPublicClient({
  chain: polygonAmoy, // Specify the blockchain network
  transport: http(), // Use HTTP transport for RPC communication
});

// Wallet Client will be provided by WalletService

// Export decodeEventLog for use in services
export { decodeEventLog };
