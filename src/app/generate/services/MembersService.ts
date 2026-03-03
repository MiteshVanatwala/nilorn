/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MemberBriefDto } from '../models/MemberBriefDto';
import type { MemberDto } from '../models/MemberDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MembersService {

    /**
     * @returns MemberBriefDto Success
     * @throws ApiError
     */
    public static getApiMembers(): CancelablePromise<Array<MemberBriefDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Members',
        });
    }

    /**
     * @param no
     * @returns MemberBriefDto Success
     * @throws ApiError
     */
    public static getApiMembersFilter(
        no?: string,
    ): CancelablePromise<Array<MemberBriefDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Members/Filter',
            query: {
                'no': no,
            },
        });
    }

    /**
     * @returns MemberDto Success
     * @throws ApiError
     */
    public static getApiMembersCurrent(): CancelablePromise<MemberDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Members/Current',
        });
    }

    /**
     * @returns MemberBriefDto Success
     * @throws ApiError
     */
    public static getApiMembersClientProject(): CancelablePromise<Array<MemberBriefDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Members/ClientProject',
        });
    }

}
