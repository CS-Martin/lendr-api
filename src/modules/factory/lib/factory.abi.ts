export const FACTORY_SMART_CONTRACT_ADDRESS =
  '0x4159fdD5fa660b717841de2a271f95b5982D68D8' as const;

export const FACTORY_SMART_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'initialPlatformFeePercentInBps',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'LendrRentalSystem__CollateralMustBeGreaterThanZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LendrRentalSystem__FeeMustBeGreaterThanZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LendrRentalSystem__InvalidDepositDeadline',
    type: 'error',
  },
  { inputs: [], name: 'LendrRentalSystem__InvalidNftStandard', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'sender', type: 'address' }],
    name: 'LendrRentalSystem__NotDeployer',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LendrRentalSystem__RentalDurationMustBeGreaterThanZero',
    type: 'error',
  },
  { inputs: [], name: 'LendrRentalSystem__WithdrawFailed', type: 'error' },
  { inputs: [], name: 'LendrRentalSystem__ZeroAddress', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'rentalId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'lender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'hourlyRentalFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collateral',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rentalDurationInHours',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum RentalEnums.NftStandard',
        name: 'nftStandard',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum RentalEnums.DealDuration',
        name: 'dealDuration',
        type: 'uint8',
      },
    ],
    name: 'CollateralRentalAgreementCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'rentalId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'lender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'hourlyRentalFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rentalDurationInHours',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum RentalEnums.NftStandard',
        name: 'nftStandard',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum RentalEnums.DealDuration',
        name: 'dealDuration',
        type: 'uint8',
      },
    ],
    name: 'DelegationRentalAgreementCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newFeePercent',
        type: 'uint256',
      },
    ],
    name: 'FeeUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'delegationRegistry',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collateralRegistry',
        type: 'address',
      },
    ],
    name: 'RegistriesDeployed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Withdrawn',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: '_lender', type: 'address' },
      { internalType: 'address', name: '_nftContract', type: 'address' },
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      { internalType: 'uint256', name: '_hourlyRentalFee', type: 'uint256' },
      { internalType: 'uint256', name: '_collateral', type: 'uint256' },
      {
        internalType: 'uint256',
        name: '_rentalDurationInHours',
        type: 'uint256',
      },
      {
        internalType: 'enum RentalEnums.NftStandard',
        name: '_nftStandard',
        type: 'uint8',
      },
      {
        internalType: 'enum RentalEnums.DealDuration',
        name: '_dealDuration',
        type: 'uint8',
      },
    ],
    name: 'createCollateralRentalAgreement',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_lender', type: 'address' },
      { internalType: 'address', name: '_nftContract', type: 'address' },
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      { internalType: 'uint256', name: '_hourlyRentalFee', type: 'uint256' },
      {
        internalType: 'uint256',
        name: '_rentalDurationInHours',
        type: 'uint256',
      },
      {
        internalType: 'enum RentalEnums.NftStandard',
        name: '_nftStandard',
        type: 'uint8',
      },
      {
        internalType: 'enum RentalEnums.DealDuration',
        name: '_dealDuration',
        type: 'uint8',
      },
    ],
    name: 'createDelegationRentalAgreement',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'i_collateralRegistry',
    outputs: [
      {
        internalType: 'contract CollateralRegistry',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'i_delegationRegistry',
    outputs: [
      {
        internalType: 'contract DelegationRegistry',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'i_deployer',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 's_collateralRentalAgreementById',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 's_feeBps',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 's_totalRentals',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'newFeeBps', type: 'uint256' }],
    name: 'setFeeBps',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];
