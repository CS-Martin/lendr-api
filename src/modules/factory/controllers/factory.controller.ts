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
} from '../dto/factory-contract.dto';
import { ErrorResponseDto } from '../../../shared/dto/common.dto';

@ApiTags('factory')
@Controller('factory')
export class FactoryController {
  constructor(
    private readonly factoryContractService: FactoryContractService,
  ) {}

  @Post('create-collateral-rental-agreement')
  @ApiOperation({ summary: 'Create a collateral rental agreement' })
  @ApiBody({ type: CreateCollateralRentalAgreementDto })
  @ApiResponse({
    status: 201,
    description: 'Collateral rental agreement created successfully',
    type: FactoryContractResponseDto,
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
  @ApiOperation({ summary: 'Create a delegation rental agreement' })
  @ApiBody({ type: CreateDelegationRentalAgreementDto })
  @ApiResponse({
    status: 201,
    description: 'Delegation rental agreement created successfully',
    type: FactoryContractResponseDto,
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
  @ApiOperation({ summary: 'Get the collateral registry address' })
  @ApiResponse({
    status: 200,
    description: 'Collateral registry address retrieved successfully',
    type: FactoryContractResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async getCollateralRegistry() {
    const result = await this.factoryContractService.getCollateralRegistry();
    return {
      result,
      message: 'Collateral registry address retrieved successfully',
    };
  }

  @Get('delegation-registry')
  @ApiOperation({ summary: 'Get the delegation registry address' })
  @ApiResponse({
    status: 200,
    description: 'Delegation registry address retrieved successfully',
    type: FactoryContractResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async getDelegationRegistry() {
    const result = await this.factoryContractService.getDelegationRegistry();
    return {
      result,
      message: 'Delegation registry address retrieved successfully',
    };
  }

  @Get('deployer')
  @ApiOperation({ summary: 'Get the deployer address' })
  @ApiResponse({
    status: 200,
    description: 'Deployer address retrieved successfully',
    type: FactoryContractResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async getDeployer() {
    const result = await this.factoryContractService.getDeployer();
    return {
      result,
      message: 'Deployer address retrieved successfully',
    };
  }

  @Get('collateral-rental-agreement/:rentalId')
  @ApiOperation({ summary: 'Get collateral rental agreement by ID' })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Collateral rental agreement address retrieved successfully',
    type: FactoryContractResponseDto,
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
  @ApiOperation({ summary: 'Get the platform fee in basis points' })
  @ApiResponse({
    status: 200,
    description: 'Platform fee retrieved successfully',
    type: FactoryContractResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async getFeeBps() {
    const result = await this.factoryContractService.getFeeBps();
    return {
      result,
      message: 'Platform fee retrieved successfully',
    };
  }

  @Get('total-rentals')
  @ApiOperation({ summary: 'Get the total number of rentals' })
  @ApiResponse({
    status: 200,
    description: 'Total rentals retrieved successfully',
    type: FactoryContractResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async getTotalRentals() {
    const result = await this.factoryContractService.getTotalRentals();
    return {
      result,
      message: 'Total rentals retrieved successfully',
    };
  }
}
