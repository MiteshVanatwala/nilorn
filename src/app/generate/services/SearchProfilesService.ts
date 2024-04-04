/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OptionItem } from '../models/OptionItem';
import type { UpsertSearchProfileCommand } from '../models/UpsertSearchProfileCommand';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SearchProfilesService {
  /**
   * @returns OptionItem Success
   * @throws ApiError
   */
  public static getApiSearchProfiles(): CancelablePromise<Array<OptionItem>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/SearchProfiles',
    });
  }

  /**
   * @param requestBody
   * @returns any Success
   * @throws ApiError
   */
  public static postApiSearchProfiles(
    requestBody?: UpsertSearchProfileCommand
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/SearchProfiles',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @param name
   * @returns any Success
   * @throws ApiError
   */
  public static deleteApiSearchProfiles(name: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/SearchProfiles/{name}',
      path: {
        name: name,
      },
    });
  }
}
