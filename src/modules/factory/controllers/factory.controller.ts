import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { FactoryContractService } from '../services/factory-contract.service';
import {
  CreateCollateralRentalAgreementDto,
  CreateDelegationRentalAgreementDto,
  FactoryContractResponseDto,
  AddressResponseDto,
  NumberResponseDto,
} from '../dto/factory-contract.dto';
import {
  BadRequestErrorResponseDto,
  InternalServerErrorResponseDto,
} from '../../../shared/dto/common.dto';

@ApiTags('factory')
@Controller('factory')
export class FactoryController {
  constructor(
    private readonly factoryContractService: FactoryContractService,
  ) {}

  @Post('create-collateral-rental-agreement')
  @ApiOperation({
    summary: 'Create a collateral rental agreement',
    description:
      'Creates a new collateral-based rental agreement where the renter provides collateral instead of upfront payment',
  })
  @ApiBody({ type: CreateCollateralRentalAgreementDto })
  @ApiResponse({
    status: 201,
    description: 'Collateral rental agreement created successfully',
    type: FactoryContractResponseDto,
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
  async createCollateralRentalAgreement(
    @Body()
    createCollateralRentalAgreementDto: CreateCollateralRentalAgreementDto,
  ) {
    const result =
      await this.factoryContractService.createCollateralRentalAgreement(
        createCollateralRentalAgreementDto,
      );
    return {
      result,
      message: 'Collateral rental agreement created successfully',
    };
  }

  @Post('create-delegation-rental-agreement')
  @ApiOperation({
    summary: 'Create a delegation rental agreement',
    description:
      'Creates a new delegation-based rental agreement where the renter pays upfront and gets temporary access to the NFT',
  })
  @ApiBody({ type: CreateDelegationRentalAgreementDto })
  @ApiResponse({
    status: 201,
    description: 'Delegation rental agreement created successfully',
    type: FactoryContractResponseDto,
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
  async createDelegationRentalAgreement(
    @Body()
    createDelegationRentalAgreementDto: CreateDelegationRentalAgreementDto,
  ) {
    const result =
      await this.factoryContractService.createDelegationRentalAgreement(
        createDelegationRentalAgreementDto,
      );
    return {
      result,
      message: 'Delegation rental agreement created successfully',
    };
  }

  @Get('collateral-registry')
  @ApiOperation({
    summary: 'Get the collateral registry address',
    description:
      'Returns the address of the collateral registry contract that manages collateral-based rental agreements',
  })
  @ApiResponse({
    status: 200,
    description: 'Collateral registry address retrieved successfully',
    type: AddressResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: InternalServerErrorResponseDto,
  })
  async getCollateralRegistry() {
    const result = await this.factoryContractService.getCollateralRegistry();
    return {
      result,
      message: 'Collateral registry address retrieved successfully',
    };
  }

  @Get('delegation-registry')
  @ApiOperation({
    summary: 'Get the delegation registry address',
    description:
      'Returns the address of the delegation registry contract that manages delegation-based rental agreements',
  })
  @ApiResponse({
    status: 200,
    description: 'Delegation registry address retrieved successfully',
    type: AddressResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: InternalServerErrorResponseDto,
  })
  async getDelegationRegistry() {
    const result = await this.factoryContractService.getDelegationRegistry();
    return {
      result,
      message: 'Delegation registry address retrieved successfully',
    };
  }

  @Get('deployer')
  @ApiOperation({
    summary: 'Get the deployer address',
    description:
      'Returns the address of the account that deployed the factory contract',
  })
  @ApiResponse({
    status: 200,
    description: 'Deployer address retrieved successfully',
    type: AddressResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: InternalServerErrorResponseDto,
  })
  async getDeployer() {
    const result = await this.factoryContractService.getDeployer();
    return {
      result,
      message: 'Deployer address retrieved successfully',
    };
  }

  @Get('collateral-rental-agreement/:rentalId')
  @ApiOperation({
    summary: 'Get collateral rental agreement by ID',
    description:
      'Returns the contract address of a specific collateral rental agreement by its ID',
  })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Collateral rental agreement address retrieved successfully',
    type: AddressResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid rental ID',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: InternalServerErrorResponseDto,
  })
  async getCollateralRentalAgreementById(@Param('rentalId') rentalId: string) {
    const rentalIdNumber = parseInt(rentalId, 10);
    if (isNaN(rentalIdNumber)) {
      throw new HttpException(
        'Invalid rental ID. Must be a number.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result =
      await this.factoryContractService.getCollateralRentalAgreementById(
        rentalIdNumber,
      );
    return {
      result,
      message: 'Collateral rental agreement address retrieved successfully',
    };
  }

  @Get('fee-bps')
  @ApiOperation({
    summary: 'Get the platform fee in basis points',
    description:
      'Returns the platform fee percentage expressed in basis points (1 basis point = 0.01%)',
  })
  @ApiResponse({
    status: 200,
    description: 'Platform fee retrieved successfully',
    type: NumberResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: InternalServerErrorResponseDto,
  })
  async getFeeBps() {
    const result = await this.factoryContractService.getFeeBps();
    return {
      result,
      message: 'Platform fee retrieved successfully',
    };
  }

  @Get('total-rentals')
  @ApiOperation({
    summary: 'Get the total number of rentals',
    description:
      'Returns the total number of rental agreements created through this factory contract',
  })
  @ApiResponse({
    status: 200,
    description: 'Total rentals retrieved successfully',
    type: NumberResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: InternalServerErrorResponseDto,
  })
  async getTotalRentals() {
    const result = await this.factoryContractService.getTotalRentals();
    return {
      result,
      message: 'Total rentals retrieved successfully',
    };
  }
}
