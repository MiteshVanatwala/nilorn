/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePriceCalculationCommand } from '../models/CreatePriceCalculationCommand';
import type { PriceCalculationDto } from '../models/PriceCalculationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PriceCalculationService {

    /**
     * @param requestBody 
     * @returns PriceCalculationDto Success
     * @throws ApiError
     */
    public static postApiPriceCalculation(
requestBody?: CreatePriceCalculationCommand,
): CancelablePromise<PriceCalculationDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/PriceCalculation',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
