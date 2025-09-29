import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { DelegationContractService } from '../services/delegation-contract.service';
import { RentalAgreementDto } from '../dto/rental-agreement.dto';
import {
  DelegationDto,
  InitiateDelegationRentalDto,
  ActivateDelegationDto,
  DepositNFTByLenderDto,
  CompleteDelegationRentalDto,
  DelegationContractResponseDto,
  AddressResponseDto,
  StringResponseDto,
} from '../dto/delegation.dto';
import {
  RentalIdParamDto,
  NftQueryDto,
  BadRequestErrorResponseDto,
  InternalServerErrorResponseDto,
} from '../../../shared/dto/common.dto';

@ApiTags('delegation')
@Controller('delegation')
export class DelegationController {
  constructor(
    private readonly delegationContractService: DelegationContractService,
  ) {}

  @Post('initiate-delegation-rental')
  @ApiOperation({
    summary: 'Initiate a delegation rental by paying required fees',
    description:
      'Initiates a delegation rental by paying the required fees to start the rental process',
  })
  @ApiBody({ type: InitiateDelegationRentalDto })
  @ApiResponse({
    status: 201,
    description: 'Delegation rental initiated successfully',
    type: DelegationContractResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters or validation error',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
  })
  async initiateDelegationRental(
    @Body() initiateDelegationRentalDto: InitiateDelegationRentalDto,
  ) {
    const result =
      await this.delegationContractService.initiateDelegationRental(
        initiateDelegationRentalDto.rentalId,
        initiateDelegationRentalDto.payment,
      );
    return {
      result,
      message: 'Delegation rental initiated successfully',
    };
  }

  @Post('activate-delegation')
  @ApiOperation({
    summary: 'Activate delegation for a rental agreement',
    description:
      'Activates the delegation for a rental agreement, allowing the renter to access the NFT',
  })
  @ApiBody({ type: ActivateDelegationDto })
  @ApiResponse({
    status: 201,
    description: 'Delegation activated successfully',
    type: DelegationContractResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters or validation error',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
  })
  async activateDelegation(
    @Body() activateDelegationDto: ActivateDelegationDto,
  ) {
    const result = await this.delegationContractService.activateDelegation(
      activateDelegationDto.rentalId,
    );
    return {
      result,
      message: 'Delegation activated successfully',
    };
  }

  @Post('deposit-nft-by-lender')
  @ApiOperation({
    summary: 'Deposit NFT by lender for a rental agreement',
    description:
      'Allows the lender to deposit their NFT into the rental agreement',
  })
  @ApiBody({ type: DepositNFTByLenderDto })
  @ApiResponse({
    status: 201,
    description: 'NFT deposited by lender successfully',
    type: DelegationContractResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters or validation error',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
  })
  async depositNFTByLender(
    @Body() depositNFTByLenderDto: DepositNFTByLenderDto,
  ) {
    const result = await this.delegationContractService.depositNFTByLender(
      depositNFTByLenderDto.rentalId,
    );
    return {
      result,
      message: 'NFT deposited by lender successfully',
    };
  }

  @Post('complete-delegation-rental')
  @ApiOperation({
    summary: 'Complete delegation rental for a rental agreement',
    description:
      'Completes the delegation rental process and returns the NFT to the lender',
  })
  @ApiBody({ type: CompleteDelegationRentalDto })
  @ApiResponse({
    status: 201,
    description: 'Delegation rental completed successfully',
    type: DelegationContractResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters or validation error',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
  })
  async completeDelegationRental(
    @Body() completeDelegationRentalDto: CompleteDelegationRentalDto,
  ) {
    const result =
      await this.delegationContractService.completeDelegationRental(
        completeDelegationRentalDto.rentalId,
      );
    return {
      result,
      message: 'Delegation rental completed successfully',
    };
  }

  @Get('rental-agreement/:rentalId')
  @ApiOperation({
    summary: 'Get rental agreement details by ID',
    description:
      'Retrieves detailed information about a specific rental agreement',
  })
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
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
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
  @ApiOperation({
    summary: 'Get delegation details for an NFT',
    description:
      'Retrieves delegation information for a specific NFT including user and expiration details',
  })
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
    description: 'Invalid parameters or validation error',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
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
  @ApiOperation({
    summary: 'Get the user who has delegated access to an NFT',
    description:
      'Returns the address of the user who currently has delegated access to the specified NFT',
  })
  @ApiQuery({
    name: 'nftContract',
    description: 'NFT contract address',
    example: '0x1234567890123456789012345678901234567890',
  })
  @ApiQuery({ name: 'tokenId', description: 'Token ID', example: '123' })
  @ApiResponse({
    status: 200,
    description: 'User address retrieved successfully',
    type: AddressResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters or validation error',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
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
    description:
      'Returns the timestamp when the delegated access to the NFT will expire',
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
    type: StringResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters or validation error',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
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
  @ApiOperation({
    summary: 'Get the total hourly fee for a rental agreement',
    description:
      'Returns the total hourly fee (including platform fees) for a specific rental agreement',
  })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Total hourly fee retrieved successfully',
    type: StringResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid rental ID',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
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
