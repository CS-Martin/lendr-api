import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CollateralContractService } from '../services/collateral-contract.service';
import {
  CreateRentalAgreementDto,
  InitiateRentalDto,
  CollateralAgreementDto,
  CollateralContractResponseDto,
  AddressResponseDto,
  StringResponseDto,
  BooleanResponseDto,
  RentalIdParamDto,
  AddressParamDto,
} from '../dto/collateral-contract.dto';
import {
  BadRequestErrorResponseDto,
  InternalServerErrorResponseDto,
} from '../../../shared/dto/common.dto';

@ApiTags('collateral')
@Controller('collateral')
export class CollateralController {
  constructor(
    private readonly collateralContractService: CollateralContractService,
  ) {}

  @Post('create-rental-agreement')
  @ApiOperation({
    summary: 'Create a rental agreement in collateral registry',
    description:
      'Creates a new collateral-based rental agreement in the collateral registry',
  })
  @ApiBody({ type: CreateRentalAgreementDto })
  @ApiResponse({
    status: 201,
    description: 'Rental agreement created successfully',
    type: CollateralContractResponseDto,
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
  async createRentalAgreement(
    @Body() createRentalAgreementDto: CreateRentalAgreementDto,
  ) {
    const result = await this.collateralContractService.createRentalAgreement(
      createRentalAgreementDto,
    );
    return {
      result,
      message: 'Rental agreement created successfully',
    };
  }

  @Post('initiate-rental')
  @ApiOperation({
    summary: 'Initiate a rental by paying required fees',
    description:
      'Initiates a collateral-based rental by paying the required fees and collateral',
  })
  @ApiBody({ type: InitiateRentalDto })
  @ApiResponse({
    status: 201,
    description: 'Rental initiated successfully',
    type: CollateralContractResponseDto,
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
  async initiateRental(@Body() initiateRentalDto: InitiateRentalDto) {
    const result =
      await this.collateralContractService.initiateRental(initiateRentalDto);
    return {
      result,
      message: 'Rental initiated successfully',
    };
  }

  @Post('deposit-nft/:rentalId')
  @ApiOperation({
    summary: 'Deposit NFT by lender',
    description:
      'Allows the lender to deposit their NFT into the collateral-based rental agreement',
  })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 201,
    description: 'NFT deposited successfully',
    type: CollateralContractResponseDto,
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
  async depositNFTByLender(@Param('rentalId') rentalId: string) {
    const result =
      await this.collateralContractService.depositNFTByLender(rentalId);
    return {
      result,
      message: 'NFT deposited successfully',
    };
  }

  @Post('release-nft/:rentalId')
  @ApiOperation({
    summary: 'Release NFT to renter',
    description:
      'Releases the NFT to the renter after they have paid the required fees and collateral',
  })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 201,
    description: 'NFT released to renter successfully',
    type: CollateralContractResponseDto,
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
  async releaseNFTToRenter(@Param('rentalId') rentalId: string) {
    const result =
      await this.collateralContractService.releaseNFTToRenter(rentalId);
    return {
      result,
      message: 'NFT released to renter successfully',
    };
  }

  @Post('return-nft/:rentalId')
  @ApiOperation({
    summary: 'Return NFT to lender',
    description:
      'Returns the NFT to the lender after the rental period ends or is completed',
  })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 201,
    description: 'NFT returned to lender successfully',
    type: CollateralContractResponseDto,
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
  async returnNFTToLender(@Param('rentalId') rentalId: string) {
    const result =
      await this.collateralContractService.returnNFTToLender(rentalId);
    return {
      result,
      message: 'NFT returned to lender successfully',
    };
  }

  @Post('claim-collateral/:rentalId')
  @ApiOperation({
    summary: 'Claim collateral when defaulted',
    description:
      'Allows the lender to claim the collateral when the renter defaults on the agreement',
  })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 201,
    description: 'Collateral claimed successfully',
    type: CollateralContractResponseDto,
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
  async claimCollateralWhenDefaulted(@Param('rentalId') rentalId: string) {
    const result =
      await this.collateralContractService.claimCollateralWhenDefaulted(
        rentalId,
      );
    return {
      result,
      message: 'Collateral claimed successfully',
    };
  }

  @Get('rental-agreement/:rentalId')
  @ApiOperation({
    summary: 'Get rental agreement details by ID',
    description:
      'Retrieves detailed information about a specific collateral-based rental agreement',
  })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Rental agreement details retrieved successfully',
    type: CollateralAgreementDto,
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
    return await this.collateralContractService.getRentalAgreement(
      rentalIdNumber,
    );
  }

  @Get('total-hourly-fee/:rentalId')
  @ApiOperation({
    summary: 'Get total hourly fee for a rental',
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
    const result =
      await this.collateralContractService.getTotalHourlyFee(rentalIdNumber);
    return {
      result,
      message: 'Total hourly fee retrieved successfully',
    };
  }

  @Get('total-rental-fee-with-collateral/:rentalId')
  @ApiOperation({
    summary: 'Get total rental fee with collateral',
    description:
      'Returns the total amount (rental fee + collateral) required to initiate the rental',
  })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Total rental fee with collateral retrieved successfully',
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
  async getTotalRentalFeeWithCollateral(@Param('rentalId') rentalId: string) {
    const rentalIdNumber = parseInt(rentalId, 10);
    if (isNaN(rentalIdNumber)) {
      throw new HttpException(
        'Invalid rental ID. Must be a number.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result =
      await this.collateralContractService.getTotalRentalFeeWithCollateral(
        rentalIdNumber,
      );
    return {
      result,
      message: 'Total rental fee with collateral retrieved successfully',
    };
  }

  @Get('owner')
  @ApiOperation({
    summary: 'Get contract owner',
    description: 'Returns the address of the owner of the collateral contract',
  })
  @ApiResponse({
    status: 200,
    description: 'Contract owner retrieved successfully',
    type: AddressResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
  })
  async getOwner() {
    const result = await this.collateralContractService.getOwner();
    return {
      result,
      message: 'Contract owner retrieved successfully',
    };
  }

  @Get('is-authorized/:address')
  @ApiOperation({
    summary: 'Check if address is authorized',
    description:
      'Checks whether a specific address is authorized to perform certain operations on the contract',
  })
  @ApiParam({
    name: 'address',
    description: 'Ethereum address to check',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  @ApiResponse({
    status: 200,
    description: 'Authorization status retrieved successfully',
    type: BooleanResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid address',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
  })
  async isAuthorized(@Param('address') address: string) {
    const result = await this.collateralContractService.isAuthorized(address);
    return {
      result,
      message: 'Authorization status retrieved successfully',
    };
  }
}
