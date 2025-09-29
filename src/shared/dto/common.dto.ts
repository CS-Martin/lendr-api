import { ApiProperty } from '@nestjs/swagger';

export class RentalIdParamDto {
  @ApiProperty({
    description: 'Rental agreement ID',
    example: '1',
  })
  rentalId: string;
}

export class NftQueryDto {
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

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Invalid rental ID. Must be a number.',
  })
  message: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/rental-agreement/invalid',
  })
  path: string;
}

export class BadRequestErrorResponseDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Invalid parameters or validation error',
  })
  message: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/factory/create-collateral-rental-agreement',
  })
  path: string;
}

export class InternalServerErrorResponseDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Contract interaction failed or blockchain error',
  })
  message: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/factory/create-collateral-rental-agreement',
  })
  path: string;
}
