import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateCollateralRentalAgreementDto {
  @ApiProperty({
    description: 'Address of the lender',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  lender: string;

  @ApiProperty({
    description: 'Address of the NFT contract',
    example: '0x1234567890123456789012345678901234567890',
  })
  nftContract: string;

  @ApiProperty({
    description: 'Token ID of the NFT',
    example: '123',
  })
  tokenId: string;

  @ApiProperty({
    description: 'Hourly rental fee in wei',
    example: '1000000000000000000',
  })
  hourlyRentalFee: string;

  @ApiProperty({
    description: 'Collateral amount in wei',
    example: '2000000000000000000',
  })
  collateral: string;

  @ApiProperty({
    description: 'Rental duration in hours',
    example: '24',
  })
  rentalDurationInHours: string;

  @ApiProperty({
    description: 'NFT standard (0=ERC721, 1=ERC1155)',
    example: 0,
    enum: [0, 1],
  })
  nftStandard: number;

  @ApiProperty({
    description: 'Deal duration type',
    example: 0,
  })
  dealDuration: number;
}

export class CreateDelegationRentalAgreementDto {
  @ApiProperty({
    description: 'Address of the lender',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  lender: string;

  @ApiProperty({
    description: 'Address of the NFT contract',
    example: '0x1234567890123456789012345678901234567890',
  })
  nftContract: string;

  @ApiProperty({
    description: 'Token ID of the NFT',
    example: '123',
  })
  tokenId: string;

  @ApiProperty({
    description: 'Hourly rental fee in wei',
    example: '1000000000000000000',
  })
  hourlyRentalFee: string;

  @ApiProperty({
    description: 'Rental duration in hours',
    example: '24',
  })
  rentalDurationInHours: string;

  @ApiProperty({
    description: 'NFT standard (0=ERC721, 1=ERC1155)',
    example: 0,
    enum: [0, 1],
  })
  nftStandard: number;

  @ApiProperty({
    description: 'Deal duration type',
    example: 0,
  })
  dealDuration: number;
}

export class RentalIdParamDto {
  @ApiProperty({
    description: 'Rental agreement ID',
    example: '1',
  })
  rentalId: string;
}

export class FactoryContractResponseDto {
  @ApiProperty({
    description: 'Contract address or value returned from the function',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  result: string;

  @ApiProperty({
    description: 'Success message',
    example: 'Operation completed successfully',
  })
  message: string;
}

// Zod validation schemas
export const CreateCollateralRentalAgreementSchema = z.object({
  lender: z.string().min(1, 'Lender address is required'),
  nftContract: z.string().min(1, 'NFT contract address is required'),
  tokenId: z.string().min(1, 'Token ID is required'),
  hourlyRentalFee: z.string().min(1, 'Hourly rental fee is required'),
  collateral: z.string().min(1, 'Collateral amount is required'),
  rentalDurationInHours: z.string().min(1, 'Rental duration is required'),
  nftStandard: z.number().int().min(0).max(1, 'NFT standard must be 0 or 1'),
  dealDuration: z
    .number()
    .int()
    .min(0, 'Deal duration must be a positive integer'),
});

export const CreateDelegationRentalAgreementSchema = z.object({
  lender: z.string().min(1, 'Lender address is required'),
  nftContract: z.string().min(1, 'NFT contract address is required'),
  tokenId: z.string().min(1, 'Token ID is required'),
  hourlyRentalFee: z.string().min(1, 'Hourly rental fee is required'),
  rentalDurationInHours: z.string().min(1, 'Rental duration is required'),
  nftStandard: z.number().int().min(0).max(1, 'NFT standard must be 0 or 1'),
  dealDuration: z
    .number()
    .int()
    .min(0, 'Deal duration must be a positive integer'),
});

export const RentalIdParamSchema = z.object({
  rentalId: z.string().min(1, 'Rental ID is required'),
});
