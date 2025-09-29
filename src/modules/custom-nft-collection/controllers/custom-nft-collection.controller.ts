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
  AddressResponseDto,
  NumberResponseDto,
  StringResponseDto,
} from '../dto/custom-nft-collection.dto';
import {
  BadRequestErrorResponseDto,
  InternalServerErrorResponseDto,
} from '../../../shared/dto/common.dto';

@ApiTags('custom-nft-collection')
@Controller('custom-nft-collection')
export class CustomNftCollectionController {
  constructor(
    private readonly customNftCollectionContractService: CustomNftCollectionContractService,
  ) {}

  @Post('approve')
  @ApiOperation({
    summary: 'Approve an address to manage a specific NFT token',
    description:
      'Grants approval for a specific address to manage a particular NFT token in the collection',
  })
  @ApiBody({ type: ApproveDto })
  @ApiResponse({
    status: 201,
    description: 'NFT approved successfully',
    type: CustomNftCollectionResponseDto,
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
  async approve(@Body() approveDto: ApproveDto) {
    const result =
      await this.customNftCollectionContractService.approve(approveDto);
    return {
      result,
      message: 'NFT approved successfully',
    };
  }

  @Get('approved/:tokenId')
  @ApiOperation({
    summary: 'Get the approved address for a specific token',
    description:
      'Returns the address that has been approved to manage the specified NFT token',
  })
  @ApiParam({
    name: 'tokenId',
    description: 'Token ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Approved address retrieved successfully',
    type: AddressResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid token ID',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
  })
  async getApproved(@Param('tokenId') tokenId: string) {
    const result =
      await this.customNftCollectionContractService.getApproved(tokenId);
    return {
      result,
      message: 'Approved address retrieved successfully',
    };
  }

  @Get('owner/:tokenId')
  @ApiOperation({
    summary: 'Get the owner of a specific token',
    description: 'Returns the current owner address of the specified NFT token',
  })
  @ApiParam({
    name: 'tokenId',
    description: 'Token ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Token owner retrieved successfully',
    type: AddressResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid token ID',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
  })
  async ownerOf(@Param('tokenId') tokenId: string) {
    const result =
      await this.customNftCollectionContractService.ownerOf(tokenId);
    return {
      result,
      message: 'Token owner retrieved successfully',
    };
  }

  @Get('balance/:owner')
  @ApiOperation({
    summary: 'Get the balance of NFTs for a specific address',
    description: 'Returns the number of NFTs owned by the specified address',
  })
  @ApiParam({
    name: 'owner',
    description: 'Owner address',
    example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  })
  @ApiResponse({
    status: 200,
    description: 'Balance retrieved successfully',
    type: NumberResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid owner address',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
  })
  async balanceOf(@Param('owner') owner: string) {
    const result =
      await this.customNftCollectionContractService.balanceOf(owner);
    return {
      result,
      message: 'Balance retrieved successfully',
    };
  }

  @Get('token-uri/:tokenId')
  @ApiOperation({
    summary: 'Get the token URI for a specific token',
    description: 'Returns the metadata URI for the specified NFT token',
  })
  @ApiParam({
    name: 'tokenId',
    description: 'Token ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Token URI retrieved successfully',
    type: StringResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid token ID',
    type: BadRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
  })
  async tokenURI(@Param('tokenId') tokenId: string) {
    const result =
      await this.customNftCollectionContractService.tokenURI(tokenId);
    return {
      result,
      message: 'Token URI retrieved successfully',
    };
  }

  @Get('total-minted')
  @ApiOperation({
    summary: 'Get the total number of minted tokens',
    description:
      'Returns the total number of tokens that have been minted in this NFT collection',
  })
  @ApiResponse({
    status: 200,
    description: 'Total minted count retrieved successfully',
    type: NumberResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Contract interaction failed or blockchain error',
    type: InternalServerErrorResponseDto,
  })
  async totalMinted() {
    const result = await this.customNftCollectionContractService.totalMinted();
    return {
      result,
      message: 'Total minted count retrieved successfully',
    };
  }
}
