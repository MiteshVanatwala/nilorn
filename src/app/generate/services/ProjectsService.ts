/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OptionItem } from '../models/OptionItem';
import type { ProjectDto } from '../models/ProjectDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProjectsService {

    /**
     * @returns ProjectDto Success
     * @throws ApiError
     */
    public static getApiProjects(): CancelablePromise<Array<ProjectDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Projects',
        });
    }

    /**
     * @param clientNo 
     * @returns OptionItem Success
     * @throws ApiError
     */
    public static getApiProjectsOptionItem(
clientNo?: string,
): CancelablePromise<Array<OptionItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Projects/OptionItem',
            query: {
                'clientNo': clientNo,
            },
        });
    }

}
