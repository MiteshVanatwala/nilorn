/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Role } from '../models/Role';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MetaService {

    /**
     * @param name 
     * @param role 
     * @param belongsToSourcingCompany 
     * @param amountOfClients 
     * @param includeSeedFromCsv 
     * @returns boolean Success
     * @throws ApiError
     */
    public static getApiMetaSeed(
name?: string,
role?: Role,
belongsToSourcingCompany?: boolean,
amountOfClients?: number,
includeSeedFromCsv?: boolean,
): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Meta/Seed',
            query: {
                'Name': name,
                'Role': role,
                'BelongsToSourcingCompany': belongsToSourcingCompany,
                'AmountOfClients': amountOfClients,
                'IncludeSeedFromCsv': includeSeedFromCsv,
            },
        });
    }

}
