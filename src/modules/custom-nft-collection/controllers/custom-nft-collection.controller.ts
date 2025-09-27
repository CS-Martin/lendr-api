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
import { CustomNftCollectionContractService } from '../services/custom-nft-collection-contract.service';
import {
  ApproveDto,
  CustomNftCollectionResponseDto,
  ErrorResponseDto,
} from '../dto/custom-nft-collection.dto';

@ApiTags('custom-nft-collection')
@Controller('custom-nft-collection')
export class CustomNftCollectionController {
  constructor(
    private readonly customNftCollectionContractService: CustomNftCollectionContractService,
  ) {}

  @Post('approve')
  @ApiOperation({
    summary: 'Approve an address to manage a specific NFT token',
  })
  @ApiBody({ type: ApproveDto })
  @ApiResponse({
    status: 201,
    description: 'NFT approved successfully',
    type: CustomNftCollectionResponseDto,
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
  async approve(@Body() approveDto: ApproveDto) {
    try {
      const result =
        await this.customNftCollectionContractService.approve(approveDto);
      return {
        result,
        message: 'NFT approved successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('approved/:tokenId')
  @ApiOperation({ summary: 'Get the approved address for a specific token' })
  @ApiParam({
    name: 'tokenId',
    description: 'Token ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Approved address retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        result: {
          type: 'string',
          example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        },
        message: {
          type: 'string',
          example: 'Approved address retrieved successfully',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid token ID',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async getApproved(@Param('tokenId') tokenId: string) {
    try {
      const result =
        await this.customNftCollectionContractService.getApproved(tokenId);
      return {
        result,
        message: 'Approved address retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('owner/:tokenId')
  @ApiOperation({ summary: 'Get the owner of a specific token' })
  @ApiParam({
    name: 'tokenId',
    description: 'Token ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Token owner retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        result: {
          type: 'string',
          example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        },
        message: {
          type: 'string',
          example: 'Token owner retrieved successfully',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid token ID',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async ownerOf(@Param('tokenId') tokenId: string) {
    try {
      const result =
        await this.customNftCollectionContractService.ownerOf(tokenId);
      return {
        result,
        message: 'Token owner retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('balance/:owner')
  @ApiOperation({ summary: 'Get the balance of NFTs for a specific address' })
  @ApiParam({
    name: 'owner',
    description: 'Owner address',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  @ApiResponse({
    status: 200,
    description: 'Balance retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'string', example: '5' },
        message: {
          type: 'string',
          example: 'Balance retrieved successfully',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid owner address',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async balanceOf(@Param('owner') owner: string) {
    try {
      const result =
        await this.customNftCollectionContractService.balanceOf(owner);
      return {
        result,
        message: 'Balance retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('token-uri/:tokenId')
  @ApiOperation({ summary: 'Get the token URI for a specific token' })
  @ApiParam({
    name: 'tokenId',
    description: 'Token ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Token URI retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        result: {
          type: 'string',
          example: 'https://example.com/metadata/1',
        },
        message: {
          type: 'string',
          example: 'Token URI retrieved successfully',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid token ID',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async tokenURI(@Param('tokenId') tokenId: string) {
    try {
      const result =
        await this.customNftCollectionContractService.tokenURI(tokenId);
      return {
        result,
        message: 'Token URI retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('total-minted')
  @ApiOperation({ summary: 'Get the total number of minted tokens' })
  @ApiResponse({
    status: 200,
    description: 'Total minted count retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'string', example: '100' },
        message: {
          type: 'string',
          example: 'Total minted count retrieved successfully',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed',
    type: ErrorResponseDto,
  })
  async totalMinted() {
    try {
      const result =
        await this.customNftCollectionContractService.totalMinted();
      return {
        result,
        message: 'Total minted count retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
