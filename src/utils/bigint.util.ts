/**
 * Utility functions for handling BigInt serialization
 */

/**
 * Recursively converts BigInt values to strings in an object
 * @param obj - The object to transform
 * @returns The object with BigInt values converted to strings
 */
export function transformBigIntToString(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'bigint') {
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    return obj.map(transformBigIntToString);
  }

  if (typeof obj === 'object') {
    const transformed: any = {};
    for (const [key, value] of Object.entries(obj)) {
      transformed[key] = transformBigIntToString(value);
    }
    return transformed;
  }

  return obj;
}

/**
 * Transforms a rental agreement object by converting BigInt values to strings
 * @param rentalAgreement - The rental agreement object from the contract
 * @returns The transformed rental agreement with string values
 */
export function transformRentalAgreement(rentalAgreement: any) {
  return transformBigIntToString(rentalAgreement);
}

/**
 * Transforms a delegation object by converting BigInt values to strings
 * @param delegation - The delegation object from the contract
 * @returns The transformed delegation with string values
 */
export function transformDelegation(delegation: any) {
  return transformBigIntToString(delegation);
}
