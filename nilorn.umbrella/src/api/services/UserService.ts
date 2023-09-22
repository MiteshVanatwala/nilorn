/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorMessage } from '../models/ErrorMessage';
import type { SearchBy } from '../models/SearchBy';
import type { User } from '../models/User';
import type { UserContext } from '../models/UserContext';
import type { UserInformation } from '../models/UserInformation';
import type { UserShortInformation } from '../models/UserShortInformation';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param requestBody
     * @returns ErrorMessage Success
     * @throws ApiError
     */
    public static putV1User(
        requestBody?: User,
    ): CancelablePromise<Array<ErrorMessage>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/user',
            body: requestBody,
            mediaType: 'application/json; x-api-version=1.0',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @returns string Success
     * @throws ApiError
     */
    public static getV1UserEmailvalidationrule(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/user/emailvalidationrule',
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @returns string Success
     * @throws ApiError
     */
    public static getV1UserPasswordvalidationrule(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/user/passwordvalidationrule',
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @returns UserContext Success
     * @throws ApiError
     */
    public static getV1UserContext(): CancelablePromise<UserContext> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/user/context',
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param searchByAction
     * @param searchByValue
     * @returns UserShortInformation Success
     * @throws ApiError
     */
    public static getV1UserList(
        searchByAction?: SearchBy,
        searchByValue?: string,
    ): CancelablePromise<Array<UserShortInformation>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/user/list',
            query: {
                'searchByAction': searchByAction,
                'searchByValue': searchByValue,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param loginId
     * @returns UserInformation Success
     * @throws ApiError
     */
    public static getV1UserEditinfo(
        loginId?: number,
    ): CancelablePromise<UserInformation> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/user/editinfo',
            query: {
                'LoginId': loginId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

}
