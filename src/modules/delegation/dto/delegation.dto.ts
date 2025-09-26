import { ApiProperty } from '@nestjs/swagger';

export class DelegationDto {
  @ApiProperty({
    description: 'Address of the user who has delegated access',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  user: string;

  @ApiProperty({
    description: 'Expiration timestamp for the delegation',
    example: '1640995200',
  })
  expires: string;
}

export class DelegationQueryDto {
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
}

export class InitiateDelegationRentalDto {
  @ApiProperty({
    description: 'Rental agreement ID',
    example: '1',
  })
  rentalId: string;

  @ApiProperty({
    description: 'Payment amount in wei (rental fee)',
    example: '1000000000000000000',
  })
  payment: string;
}

export class ActivateDelegationDto {
  @ApiProperty({
    description: 'Rental agreement ID',
    example: '1',
  })
  rentalId: string;
}

export class DepositNFTByLenderDto {
  @ApiProperty({
    description: 'Rental agreement ID',
    example: '1',
  })
  rentalId: string;
}

export class CompleteDelegationRentalDto {
  @ApiProperty({
    description: 'Rental agreement ID',
    example: '1',
  })
  rentalId: string;
}

export class DelegationContractResponseDto {
  @ApiProperty({
    description: 'Transaction hash or rental ID',
    example: '0x1234567890abcdef...',
  })
  result: string;

  @ApiProperty({
    description: 'Success message',
    example: 'Delegation rental initiated successfully',
  })
  message: string;
}
