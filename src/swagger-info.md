# Swagger API Documentation

## Overview

This API provides endpoints for interacting with the DelegationRegistry smart contract on Polygon Amoy testnet.

## Accessing Swagger Documentation

Once the application is running, you can access the Swagger documentation at:

- **URL**: `http://localhost:3000/api`
- **Title**: Lendr API Documentation

## Available Endpoints

### Contract Endpoints

#### 1. Get Rental Agreement

- **Endpoint**: `GET /rental-agreement/:rentalId`
- **Description**: Retrieves rental agreement details by ID
- **Parameters**:
  - `rentalId` (path): Rental agreement ID (number)
- **Response**: RentalAgreement object with all agreement details

#### 2. Get Delegation

- **Endpoint**: `GET /delegation`
- **Description**: Gets delegation details for an NFT
- **Query Parameters**:
  - `nftContract`: NFT contract address
  - `tokenId`: Token ID (number)
- **Response**: Delegation object with user and expiration

#### 3. Get User Of NFT

- **Endpoint**: `GET /user-of`
- **Description**: Gets the user who has delegated access to an NFT
- **Query Parameters**:
  - `nftContract`: NFT contract address
  - `tokenId`: Token ID (number)
- **Response**: User address (string)

#### 4. Get User Expires

- **Endpoint**: `GET /user-expires`
- **Description**: Gets the expiration time for delegated access
- **Query Parameters**:
  - `nftContract`: NFT contract address
  - `tokenId`: Token ID (number)
- **Response**: Expiration timestamp (string)

#### 5. Get Total Hourly Fee

- **Endpoint**: `GET /total-hourly-fee/:rentalId`
- **Description**: Gets the total hourly fee for a rental agreement
- **Parameters**:
  - `rentalId` (path): Rental agreement ID (number)
- **Response**: Total hourly fee (string)

## Error Responses

All endpoints return standardized error responses with:

- `message`: Error description
- `statusCode`: HTTP status code
- `timestamp`: Error timestamp
- `path`: Request path

## Example Usage

### Get Rental Agreement

```bash
curl http://localhost:3000/rental-agreement/1
```

### Get Delegation

```bash
curl "http://localhost:3000/delegation?nftContract=0x1234567890123456789012345678901234567890&tokenId=123"
```

### Get User Of NFT

```bash
curl "http://localhost:3000/user-of?nftContract=0x1234567890123456789012345678901234567890&tokenId=123"
```

## Smart Contract Details

- **Contract Address**: `0xC1cB861d721ca17b0b38E181F88C4340f8f2E476`
- **Network**: Polygon Amoy Testnet
- **Contract Name**: DelegationRegistry
