import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class ApproveDto {
  @ApiProperty({
    description: 'Address to approve for the NFT',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  to: string;

  @ApiProperty({
    description: 'Token ID to approve',
    example: '1',
  })
  tokenId: string;
}

export class CustomNftCollectionResponseDto {
  @ApiProperty({
    description: 'Transaction hash',
    example: '0x1234567890abcdef...',
  })
  result: string;

  @ApiProperty({
    description: 'Success message',
    example: 'Operation completed successfully',
  })
  message: string;
}

export class AddressResponseDto {
  @ApiProperty({
    description: 'Address result',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  result: string;

  @ApiProperty({
    description: 'Success message',
    example: 'Address retrieved successfully',
  })
  message: string;
}

export class NumberResponseDto {
  @ApiProperty({
    description: 'Numeric result',
    example: '5',
  })
  result: string;

  @ApiProperty({
    description: 'Success message',
    example: 'Value retrieved successfully',
  })
  message: string;
}

export class StringResponseDto {
  @ApiProperty({
    description: 'String result',
    example: 'https://example.com/metadata/1',
  })
  result: string;

  @ApiProperty({
    description: 'Success message',
    example: 'String retrieved successfully',
  })
  message: string;
}

// Zod validation schemas
export const ApproveSchema = z.object({
  to: z.string().min(1, 'Approval address is required'),
  tokenId: z.string().min(1, 'Token ID is required'),
});
