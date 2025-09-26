import { ApiProperty } from '@nestjs/swagger';

export class RentalAgreementDto {
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
  })
  s_nftStandard: number;

  @ApiProperty({
    description: 'Deal duration type',
    example: 0,
  })
  dealDuration: number;

  @ApiProperty({
    description: 'Address of the renter',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  renter: string;

  @ApiProperty({
    description: 'Current rental state',
    example: 0,
  })
  rentalState: number;

  @ApiProperty({
    description: 'Rental end time timestamp',
    example: '1640995200',
  })
  rentalEndTime: string;

  @ApiProperty({
    description: 'Lender delegation deadline timestamp',
    example: '1640995200',
  })
  lenderDelegationDeadline: string;

  @ApiProperty({
    description: 'Platform fee in basis points',
    example: '250',
  })
  platformFeeBps: string;

  @ApiProperty({
    description: 'Factory contract address',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  factoryAddress: string;
}
