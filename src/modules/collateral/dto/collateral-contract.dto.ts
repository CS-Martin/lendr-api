import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateRentalAgreementDto {
  @ApiProperty({
    description: 'Rental agreement ID',
    example: '1',
  })
  rentalId: string;

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
    example: '1',
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
    description: 'NFT standard (0 for ERC721, 1 for ERC1155)',
    example: 0,
    enum: [0, 1],
  })
  nftStandard: number;

  @ApiProperty({
    description: 'Deal duration in hours',
    example: 48,
  })
  dealDuration: number;
}

export class InitiateRentalDto {
  @ApiProperty({
    description: 'Rental agreement ID',
    example: '1',
  })
  rentalId: string;

  @ApiProperty({
    description: 'Payment amount in wei (rental fee + collateral)',
    example: '3000000000000000000',
  })
  payment: string;
}

export class CollateralAgreementDto {
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
    example: '1',
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
    description: 'NFT standard (0 for ERC721, 1 for ERC1155)',
    example: 0,
  })
  nftStandard: number;

  @ApiProperty({
    description: 'Deal duration in hours',
    example: 48,
  })
  dealDuration: number;

  @ApiProperty({
    description: 'Address of the renter',
    example: '0x0000000000000000000000000000000000000000',
  })
  renter: string;

  @ApiProperty({
    description: 'Current rental state',
    example: 0,
  })
  rentalState: number;

  @ApiProperty({
    description: 'Rental end time timestamp',
    example: '0',
  })
  rentalEndTime: string;

  @ApiProperty({
    description: 'Lender deposit deadline timestamp',
    example: '0',
  })
  lenderDepositDeadline: string;

  @ApiProperty({
    description: 'Return deadline timestamp',
    example: '0',
  })
  returnDeadline: string;

  @ApiProperty({
    description: 'Renter claim deadline timestamp',
    example: '0',
  })
  renterClaimDeadline: string;

  @ApiProperty({
    description: 'Platform fee in basis points',
    example: '250',
  })
  platformFeeBps: string;

  @ApiProperty({
    description: 'Factory contract address',
    example: '0xee4dA4e4246Cea354208b10609511E72aDC64058',
  })
  factoryAddress: string;
}

export class CollateralContractResponseDto {
  @ApiProperty({
    description: 'Transaction hash or rental ID',
    example: '0x1234567890abcdef...',
  })
  result: string;

  @ApiProperty({
    description: 'Success message',
    example: 'Operation completed successfully',
  })
  message: string;
}

export class RentalIdParamDto {
  @ApiProperty({
    description: 'Rental agreement ID',
    example: '1',
  })
  rentalId: string;
}

export class AddressParamDto {
  @ApiProperty({
    description: 'Ethereum address',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  address: string;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Invalid parameters',
  })
  message: string;

  @ApiProperty({
    description: 'Error status code',
    example: 400,
  })
  statusCode: number;
}

// Zod validation schemas
export const CreateRentalAgreementSchema = z.object({
  rentalId: z.string().min(1, 'Rental ID is required'),
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

export const InitiateRentalSchema = z.object({
  rentalId: z.string().min(1, 'Rental ID is required'),
  payment: z.string().min(1, 'Payment amount is required'),
});

export const RentalIdParamSchema = z.object({
  rentalId: z.string().min(1, 'Rental ID is required'),
});

export const AddressParamSchema = z.object({
  address: z.string().min(1, 'Address is required'),
});
