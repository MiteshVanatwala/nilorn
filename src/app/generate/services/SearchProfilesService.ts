/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeleteSearchProfileCommand } from '../models/DeleteSearchProfileCommand';
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
   * @param requestBody
   * @returns any Success
   * @throws ApiError
   */

  public static deleteApiSearchProfiles(
    filterName: string
  ): CancelablePromise<any> {
    const apiUrl = `/api/SearchProfiles/${filterName}`;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: apiUrl,
      body: undefined,
      mediaType: 'application/json',
    });
  }
}
