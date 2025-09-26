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
  RentalIdParamDto,
  AddressParamDto,
  ErrorResponseDto,
} from '../dto/collateral-contract.dto';

@ApiTags('collateral')
@Controller('collateral')
export class CollateralController {
  constructor(
    private readonly collateralContractService: CollateralContractService,
  ) {}

  @Post('create-rental-agreement')
  @ApiOperation({ summary: 'Create a rental agreement in collateral registry' })
  @ApiBody({ type: CreateRentalAgreementDto })
  @ApiResponse({
    status: 201,
    description: 'Rental agreement created successfully',
    type: CollateralContractResponseDto,
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
  async createRentalAgreement(
    @Body() createRentalAgreementDto: CreateRentalAgreementDto,
  ) {
    try {
      const result = await this.collateralContractService.createRentalAgreement(
        createRentalAgreementDto,
      );
      return {
        result,
        message: 'Rental agreement created successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('initiate-rental')
  @ApiOperation({ summary: 'Initiate a rental by paying required fees' })
  @ApiBody({ type: InitiateRentalDto })
  @ApiResponse({
    status: 201,
    description: 'Rental initiated successfully',
    type: CollateralContractResponseDto,
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
  async initiateRental(@Body() initiateRentalDto: InitiateRentalDto) {
    try {
      const result =
        await this.collateralContractService.initiateRental(initiateRentalDto);
      return {
        result,
        message: 'Rental initiated successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('deposit-nft/:rentalId')
  @ApiOperation({ summary: 'Deposit NFT by lender' })
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
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async depositNFTByLender(@Param('rentalId') rentalId: string) {
    try {
      const result =
        await this.collateralContractService.depositNFTByLender(rentalId);
      return {
        result,
        message: 'NFT deposited successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('release-nft/:rentalId')
  @ApiOperation({ summary: 'Release NFT to renter' })
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
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async releaseNFTToRenter(@Param('rentalId') rentalId: string) {
    try {
      const result =
        await this.collateralContractService.releaseNFTToRenter(rentalId);
      return {
        result,
        message: 'NFT released to renter successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('return-nft/:rentalId')
  @ApiOperation({ summary: 'Return NFT to lender' })
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
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async returnNFTToLender(@Param('rentalId') rentalId: string) {
    try {
      const result =
        await this.collateralContractService.returnNFTToLender(rentalId);
      return {
        result,
        message: 'NFT returned to lender successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('claim-collateral/:rentalId')
  @ApiOperation({ summary: 'Claim collateral when defaulted' })
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
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async claimCollateralWhenDefaulted(@Param('rentalId') rentalId: string) {
    try {
      const result =
        await this.collateralContractService.claimCollateralWhenDefaulted(
          rentalId,
        );
      return {
        result,
        message: 'Collateral claimed successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

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
    type: CollateralAgreementDto,
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
    return await this.collateralContractService.getRentalAgreement(
      rentalIdNumber,
    );
  }

  @Get('total-hourly-fee/:rentalId')
  @ApiOperation({ summary: 'Get total hourly fee for a rental' })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Total hourly fee retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'string', example: '1000000000000000000' },
        message: {
          type: 'string',
          example: 'Total hourly fee retrieved successfully',
        },
      },
    },
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
    const result =
      await this.collateralContractService.getTotalHourlyFee(rentalIdNumber);
    return {
      result,
      message: 'Total hourly fee retrieved successfully',
    };
  }

  @Get('total-rental-fee-with-collateral/:rentalId')
  @ApiOperation({ summary: 'Get total rental fee with collateral' })
  @ApiParam({
    name: 'rentalId',
    description: 'Rental agreement ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Total rental fee with collateral retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'string', example: '3000000000000000000' },
        message: {
          type: 'string',
          example: 'Total rental fee with collateral retrieved successfully',
        },
      },
    },
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
  @ApiOperation({ summary: 'Get contract owner' })
  @ApiResponse({
    status: 200,
    description: 'Contract owner retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        result: {
          type: 'string',
          example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        },
        message: {
          type: 'string',
          example: 'Contract owner retrieved successfully',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async getOwner() {
    const result = await this.collateralContractService.getOwner();
    return {
      result,
      message: 'Contract owner retrieved successfully',
    };
  }

  @Get('is-authorized/:address')
  @ApiOperation({ summary: 'Check if address is authorized' })
  @ApiParam({
    name: 'address',
    description: 'Ethereum address to check',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  @ApiResponse({
    status: 200,
    description: 'Authorization status retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example: 'Authorization status retrieved successfully',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid address',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async isAuthorized(@Param('address') address: string) {
    const result = await this.collateralContractService.isAuthorized(address);
    return {
      result,
      message: 'Authorization status retrieved successfully',
    };
  }
}
