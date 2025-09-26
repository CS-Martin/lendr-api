import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { DelegationContractService } from '../services/delegation-contract.service';
import { RentalAgreementDto } from '../dto/rental-agreement.dto';
import { DelegationDto } from '../dto/delegation.dto';
import {
  RentalIdParamDto,
  NftQueryDto,
  ErrorResponseDto,
} from '../../../shared/dto/common.dto';

@ApiTags('delegation')
@Controller('delegation')
export class DelegationController {
  constructor(
    private readonly delegationContractService: DelegationContractService,
  ) {}

  @Get('rental-agreement/:rentalId')
  @ApiOperation({ summary: 'Get rental agreement details by ID' })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Rental agreement details retrieved successfully',
    type: RentalAgreementDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid rental ID',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async getRentalAgreement(@Param('rentalId') rentalId: string) {
    const rentalIdNumber = parseInt(rentalId, 10);
    if (isNaN(rentalIdNumber)) {
      throw new HttpException(
        'Invalid rental ID. Must be a number.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.delegationContractService.getRentalAgreement(
      rentalIdNumber,
    );
  }

  @Get('delegation')
  @ApiOperation({ summary: 'Get delegation details for an NFT' })
  @ApiQuery({
    name: 'nftContract',
    description: 'NFT contract address',
    example: '0x1234567890123456789012345678901234567890',
  })
  @ApiQuery({ name: 'tokenId', description: 'Token ID', example: '123' })
  @ApiResponse({
    status: 200,
    description: 'Delegation details retrieved successfully',
    type: DelegationDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async getDelegation(
    @Query('nftContract') nftContract: string,
    @Query('tokenId') tokenId: string,
  ) {
    const tokenIdNumber = parseInt(tokenId, 10);
    if (isNaN(tokenIdNumber)) {
      throw new HttpException(
        'Invalid token ID. Must be a number.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.delegationContractService.getDelegation(
      nftContract,
      tokenIdNumber,
    );
  }

  @Get('user-of')
  @ApiOperation({ summary: 'Get the user who has delegated access to an NFT' })
  @ApiQuery({
    name: 'nftContract',
    description: 'NFT contract address',
    example: '0x1234567890123456789012345678901234567890',
  })
  @ApiQuery({ name: 'tokenId', description: 'Token ID', example: '123' })
  @ApiResponse({
    status: 200,
    description: 'User address retrieved successfully',
    schema: {
      type: 'string',
      example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async getUserOf(
    @Query('nftContract') nftContract: string,
    @Query('tokenId') tokenId: string,
  ) {
    const tokenIdNumber = parseInt(tokenId, 10);
    if (isNaN(tokenIdNumber)) {
      throw new HttpException(
        'Invalid token ID. Must be a number.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.delegationContractService.userOf(
      nftContract,
      tokenIdNumber,
    );
  }

  @Get('user-expires')
  @ApiOperation({
    summary: 'Get the expiration time for delegated access to an NFT',
  })
  @ApiQuery({
    name: 'nftContract',
    description: 'NFT contract address',
    example: '0x1234567890123456789012345678901234567890',
  })
  @ApiQuery({ name: 'tokenId', description: 'Token ID', example: '123' })
  @ApiResponse({
    status: 200,
    description: 'Expiration timestamp retrieved successfully',
    schema: { type: 'string', example: '1640995200' },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async getUserExpires(
    @Query('nftContract') nftContract: string,
    @Query('tokenId') tokenId: string,
  ) {
    const tokenIdNumber = parseInt(tokenId, 10);
    if (isNaN(tokenIdNumber)) {
      throw new HttpException(
        'Invalid token ID. Must be a number.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.delegationContractService.userExpires(
      nftContract,
      tokenIdNumber,
    );
  }

  @Get('total-hourly-fee/:rentalId')
  @ApiOperation({ summary: 'Get the total hourly fee for a rental agreement' })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Total hourly fee retrieved successfully',
    schema: { type: 'string', example: '1000000000000000000' },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid rental ID',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async getTotalHourlyFee(@Param('rentalId') rentalId: string) {
    const rentalIdNumber = parseInt(rentalId, 10);
    if (isNaN(rentalIdNumber)) {
      throw new HttpException(
        'Invalid rental ID. Must be a number.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.delegationContractService.getTotalHourlyFee(
      rentalIdNumber,
    );
  }
}
