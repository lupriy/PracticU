/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ActiveStudentCourse {
  /** Active course */
  course: Course;
  /** Active module in active course */
  module: Module;
  /** Active lesson in active module */
  lesson: Lesson;
  /** Active lesson bookmark */
  bookmark: string;
}

export interface Attachment {
  /**
   * Attachment unique id
   * @min 1
   */
  id: number;
  /** Attachment file name */
  filename: string;
  /** Attachment content type */
  content_type: string;
}

export interface Chat {
  /** @min 1 */
  id: number;
  course: Course;
  student: User;
  mentor: User;
  /** @min 0 */
  unread_messages_count: number;
}

export interface Course {
  /**
   * Course unique id
   * @min 1
   */
  id: number;
  /** Course unique name */
  name: string;
  /** Course description */
  description: string;
  /** Course tags */
  tags: string[];
  /** Course mentor, if student send this request and 'group' filter is 'student' */
  mentor: User;
  /**
   * Course hours needed for educate
   * @min 1
   */
  hours: number;
  /**
   * Course price
   * @min 0
   */
  price: number;
}

export interface CourseCreateUpdate {
  /** Course unique name */
  name: string;
  /** Course description */
  description?: string;
  /** Course tags keys */
  tags?: string[];
  /**
   * Course hours needed for educate
   * @min 1
   */
  hours: number;
  /**
   * Course price
   * @min 0
   */
  price?: number;
}

export interface CourseNested {
  /**
   * Course unique id
   * @min 1
   */
  id: number;
  /** Course unique name */
  name: string;
  /** Course description */
  description: string;
  /** Course tags */
  tags: string[];
  /** Course mentor, if student send this request and 'group' filter is 'student' */
  mentor: User;
  /**
   * Course hours needed for educate
   * @min 1
   */
  hours: number;
  /**
   * Course price
   * @min 0
   */
  price: number;
  /** List of course modules */
  modules: ModuleNested[];
}

export interface Credentials {
  /** User email */
  email: string;
  /** User password */
  password: string;
}

export interface Lesson {
  /**
   * Lesson unique id
   * @min 1
   */
  id: number;
  /** Lesson module id */
  module: number;
  /** Lesson name */
  name: string;
  /** Lesson description */
  description: string;
  /**
   * Lesson position in module
   * @min 1
   */
  position: number;
  /** Lesson ahead */
  ahead: string;
}

export interface LessonAttachmentCreateUpdate {
  /** Attachment file name */
  filename: string;
  /** Attachment content type */
  content_type: string;
}

export interface LessonCreateUpdate {
  /** Lesson parent module */
  module: number;
  /** Lesson name */
  name: string;
  /** Lesson description */
  description?: string;
  /**
   * Lesson position in module
   * @min 1
   */
  position: number;
  /** Lesson ahead */
  ahead?: string | null;
  /** Lesson content */
  content?: string;
}

export interface LessonFull {
  /**
   * Lesson unique id
   * @min 1
   */
  id: number;
  /** Lesson module id */
  module: number;
  /** Lesson name */
  name: string;
  /** Lesson description */
  description: string;
  /**
   * Lesson position in module
   * @min 1
   */
  position: number;
  /** Lesson ahead */
  ahead: string;
  /** Lesson content */
  content: string;
  /** Lesson progress */
  bookmark: string | null;
  /** Pointer to next lesson */
  next: LessonPointer;
  /** Pointer to previous lesson */
  previous: LessonPointer;
}

export interface LessonPointer {
  /**
   * Lesson unique id
   * @min 1
   */
  id: number;
  /** Access to this lesson by current student */
  has_student_access: boolean;
}

export interface LessonSetBookmark {
  bookmark: string;
}

export interface Message {
  /**
   * Message unique id
   * @min 1
   */
  id: number;
  /** Message course */
  course: Course;
  /** Message student */
  student: User;
  /** Message sender */
  sender: User;
  /** Message recipient */
  recipient: User;
  /** Message text */
  text: string;
  /** Message attachments */
  attachments: Attachment[];
  /** Message is read */
  was_read: boolean;
  /**
   * Message create time
   * @format date-time
   */
  created_at: string;
  /**
   * Message update time
   * @format date-time
   */
  updated_at: string;
}

export interface MessageCreate {
  /** Message course */
  course: number;
  /** Message student */
  student: number;
  /** Message recipient */
  recipient: number;
  /** Message text */
  text: string;
}

export interface MessageUpdate {
  /** Message text */
  text: string;
}

export interface Module {
  /**
   * Module unique id
   * @min 1
   */
  id: number;
  /** Module course id */
  course: number;
  /** Module name */
  name: string;
  /** Module description */
  description: string;
  /**
   * Module position in course
   * @min 1
   */
  position: number;
}

export interface ModuleCreateUpdate {
  /** Module course id */
  course: number;
  /** Module name */
  name: string;
  /** Module description */
  description?: string;
  /**
   * Module position in course
   * @min 1
   */
  position: number;
}

export interface ModuleNested {
  /**
   * Module unique id
   * @min 1
   */
  id: number;
  /** Module course id */
  course: number;
  /** Module name */
  name: string;
  /** Module description */
  description: string;
  /**
   * Module position in course
   * @min 1
   */
  position: number;
  /** List of module lessons */
  lessons: Lesson[];
}

export interface PaginatedAttachmentList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=400&limit=100
   */
  next?: string | null;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=200&limit=100
   */
  previous?: string | null;
  results?: Attachment[];
}

export interface PaginatedChatList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=400&limit=100
   */
  next?: string | null;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=200&limit=100
   */
  previous?: string | null;
  results?: Chat[];
}

export interface PaginatedCourseList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=400&limit=100
   */
  next?: string | null;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=200&limit=100
   */
  previous?: string | null;
  results?: Course[];
}

export interface PaginatedLessonList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=400&limit=100
   */
  next?: string | null;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=200&limit=100
   */
  previous?: string | null;
  results?: Lesson[];
}

export interface PaginatedMessageList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=400&limit=100
   */
  next?: string | null;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=200&limit=100
   */
  previous?: string | null;
  results?: Message[];
}

export interface PaginatedModuleList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=400&limit=100
   */
  next?: string | null;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=200&limit=100
   */
  previous?: string | null;
  results?: Module[];
}

export interface PaginatedTagList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=400&limit=100
   */
  next?: string | null;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=200&limit=100
   */
  previous?: string | null;
  results?: Tag[];
}

export interface PaginatedTaskList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=400&limit=100
   */
  next?: string | null;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=200&limit=100
   */
  previous?: string | null;
  results?: Task[];
}

export interface PaginatedTaskResultContentList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=400&limit=100
   */
  next?: string | null;
  /**
   * @format uri
   * @example http://api.example.org/accounts/?offset=200&limit=100
   */
  previous?: string | null;
  results?: TaskResultContent[];
}

export interface PatchedLessonAttachmentCreateUpdate {
  /** Attachment file name */
  filename?: string;
  /** Attachment content type */
  content_type?: string;
}

export interface PatchedLessonCreateUpdate {
  /** Lesson parent module */
  module?: number;
  /** Lesson name */
  name?: string;
  /** Lesson description */
  description?: string;
  /**
   * Lesson position in module
   * @min 1
   */
  position?: number;
  /** Lesson ahead */
  ahead?: string | null;
  /** Lesson content */
  content?: string;
}

export interface Tag {
  /** Tag key */
  key: string;
  /** Tag name */
  name: string;
}

export interface Task {
  /**
   * Task unique id
   * @min 1
   */
  id: number;
  /** Task type */
  type: string;
  /** Course that contains this task */
  course: Course;
  /** Module that contains this task */
  module: Module;
  /** Lesson that contains this task */
  lesson: Lesson;
}

export interface TaskContent {
  /**
   * Task unique id
   * @min 1
   */
  id: number;
  /** Task type */
  type: string;
  /** Course that contains this task */
  course: Course;
  /** Module that contains this task */
  module: Module;
  /** Lesson that contains this task */
  lesson: Lesson;
  /** Task content */
  content: string;
}

export interface TaskResult {
  /**
   * Task result unique id
   * @min 1
   */
  id: number;
  /** Task */
  task: Task;
  /** Student who solve task */
  student: User;
  /** List of task result attachments */
  attachments: Attachment[];
  /** Acception for task result */
  accepted: boolean;
  /**
   * When task solved
   * @format date-time
   */
  created_at: string;
}

export interface TaskResultContent {
  /**
   * Task result unique id
   * @min 1
   */
  id: number;
  /** Task */
  task: Task;
  /** Student who solve task */
  student: User;
  /** List of task result attachments */
  attachments: Attachment[];
  /** Acception for task result */
  accepted: boolean;
  /**
   * When task solved
   * @format date-time
   */
  created_at: string;
  /** Task result content */
  content: string;
}

export interface TaskResultCreate {
  /** Task id */
  task: number;
  /** Task result content */
  content: string;
}

export interface TokenObtainPair {
  email: string;
  password: string;
  access: string;
  refresh: string;
}

export interface TokenPair {
  /** Access token */
  access?: string;
  /** Refresh token */
  refresh?: string;
}

export interface TokenVerify {
  token: string;
}

export interface User {
  /**
   * User unique id
   * @min 1
   */
  id: number;
  /** User first name */
  first_name: string;
  /** User last name */
  last_name: string;
  /** List of user groups */
  groups: string[];
}

export interface UserChangePassword {
  /** Actual user password */
  current_password: string;
  /** New user password */
  new_password: string;
}

export interface UserFull {
  /**
   * User unique id
   * @min 1
   */
  id: number;
  /** User first name */
  first_name: string;
  /** User last name */
  last_name: string;
  /** List of user groups */
  groups: string[];
  /**
   * User email
   * @format email
   */
  email: string;
  /** User personal phone */
  phone: string;
  /** User current city */
  city: string;
  /** User active course */
  active_course: ActiveStudentCourse | null;
}

export interface UserFullUpdate {
  /**
   * User email
   * @format email
   */
  email: string | null;
  /** User first name */
  first_name: string | null;
  /** User last name */
  last_name: string | null;
  /** User personal phone */
  phone: string | null;
  /** User current city */
  city: string | null;
}

import { auth } from './Auth';

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = process.env.REACT_APP_API_URL ?? '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'include',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`
    )}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      key => 'undefined' !== typeof query[key]
    );
    return keys
      .map(key =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
          ...(requestParams.headers || {}),
        },
        signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async response => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then(data => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch(e => {
              r.error = e;
              return r;
            });

      if (response.status === 401) {
        auth.logout();
      }

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Edu Platform API
 * @version 0.0.0
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  chat = {
    /**
     * No description
     *
     * @tags chat
     * @name ChatList
     * @request GET:/chat/
     * @secure
     */
    chatList: (
      query?: {
        'Last by'?: string[];
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
        /** lesson */
        lesson?: string;
        lesson__module__course_id?: number;
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A search term. */
        search?: string;
        student_id?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedChatList, any>({
        path: `/chat/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags chat
     * @name ChatRetrieve
     * @request GET:/chat/{chat_id}
     * @secure
     */
    chatRetrieve: (
      chatId: number,
      query?: {
        /** @format date-time */
        before?: string;
        format?: 'json' | 'multipart';
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<Chat[], any>({
        path: `/chat/${chatId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  course = {
    /**
     * No description
     *
     * @tags course
     * @name CourseList
     * @request GET:/course/
     * @secure
     */
    courseList: (
      query?: {
        'Last by'?: string[];
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedCourseList, any>({
        path: `/course/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course
     * @name CourseCreate
     * @request POST:/course/
     * @secure
     */
    courseCreate: (
      data: CourseCreateUpdate,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Course, any>({
        path: `/course/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course
     * @name CourseRetrieve
     * @request GET:/course/{id}/
     * @secure
     */
    courseRetrieve: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
      },
      params: RequestParams = {}
    ) =>
      this.request<CourseNested, any>({
        path: `/course/${id}/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course
     * @name CourseUpdate
     * @request PUT:/course/{id}/
     * @secure
     */
    courseUpdate: (
      id: number,
      data: CourseCreateUpdate,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Course, any>({
        path: `/course/${id}/`,
        method: 'PUT',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course
     * @name CourseDestroy
     * @request DELETE:/course/{id}/
     * @secure
     */
    courseDestroy: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/course/${id}/`,
        method: 'DELETE',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags course
     * @name CourseProgressRetrieve
     * @request GET:/course/{id}/progress/
     * @secure
     */
    courseProgressRetrieve: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<ActiveStudentCourse, any>({
        path: `/course/${id}/progress/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  health = {
    /**
     * No description
     *
     * @tags health
     * @name HealthRetrieve
     * @request GET:/health
     * @secure
     */
    healthRetrieve: (
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<string, any>({
        path: `/health`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  lesson = {
    /**
     * No description
     *
     * @tags lesson
     * @name LessonList
     * @request GET:/lesson/
     * @secure
     */
    lessonList: (
      query?: {
        'Last by'?: string[];
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedLessonList, any>({
        path: `/lesson/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonCreate
     * @request POST:/lesson/
     * @secure
     */
    lessonCreate: (
      data: LessonCreateUpdate,
      query?: {
        format?: 'json' | 'multipart';
        with_answers?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<LessonFull, any>({
        path: `/lesson/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonAttachmentList
     * @request GET:/lesson/{lesson_pk}/attachment/
     * @secure
     */
    lessonAttachmentList: (
      lessonPk: string,
      query?: {
        'Last by'?: string[];
        format?: 'json' | 'multipart';
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedAttachmentList, any>({
        path: `/lesson/${lessonPk}/attachment/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonAttachmentCreate
     * @request POST:/lesson/{lesson_pk}/attachment/
     * @secure
     */
    lessonAttachmentCreate: (
      lessonPk: string,
      data: LessonAttachmentCreateUpdate,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Attachment, any>({
        path: `/lesson/${lessonPk}/attachment/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonAttachmentRetrieve
     * @request GET:/lesson/{lesson_pk}/attachment/{id}/
     * @secure
     */
    lessonAttachmentRetrieve: (
      id: string,
      lessonPk: string,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Attachment, any>({
        path: `/lesson/${lessonPk}/attachment/${id}/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonAttachmentUpdate
     * @request PUT:/lesson/{lesson_pk}/attachment/{id}/
     * @secure
     */
    lessonAttachmentUpdate: (
      id: string,
      lessonPk: string,
      data: LessonAttachmentCreateUpdate,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Attachment, any>({
        path: `/lesson/${lessonPk}/attachment/${id}/`,
        method: 'PUT',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonAttachmentPartialUpdate
     * @request PATCH:/lesson/{lesson_pk}/attachment/{id}/
     * @secure
     */
    lessonAttachmentPartialUpdate: (
      id: string,
      lessonPk: string,
      data: PatchedLessonAttachmentCreateUpdate,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Attachment, any>({
        path: `/lesson/${lessonPk}/attachment/${id}/`,
        method: 'PATCH',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonAttachmentDestroy
     * @request DELETE:/lesson/{lesson_pk}/attachment/{id}/
     * @secure
     */
    lessonAttachmentDestroy: (
      id: string,
      lessonPk: string,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/lesson/${lessonPk}/attachment/${id}/`,
        method: 'DELETE',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonAttachmentDataRetrieve
     * @request GET:/lesson/{lesson_pk}/attachment/{id}/data/
     * @secure
     */
    lessonAttachmentDataRetrieve: (
      id: string,
      lessonPk: string,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<any, any>({
        path: `/lesson/${lessonPk}/attachment/${id}/data/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonAttachmentDataCreate
     * @request POST:/lesson/{lesson_pk}/attachment/{id}/data/
     * @secure
     */
    lessonAttachmentDataCreate: (
      id: string,
      lessonPk: string,
      data: File[],
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Attachment, any>({
        path: `/lesson/${lessonPk}/attachment/${id}/data/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonRetrieve
     * @request GET:/lesson/{id}/
     * @secure
     */
    lessonRetrieve: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
        with_answers?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<LessonFull, any>({
        path: `/lesson/${id}/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonUpdate
     * @request PUT:/lesson/{id}/
     * @secure
     */
    lessonUpdate: (
      id: number,
      data: LessonCreateUpdate,
      query?: {
        format?: 'json' | 'multipart';
        with_answers?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<LessonFull, any>({
        path: `/lesson/${id}/`,
        method: 'PUT',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonPartialUpdate
     * @request PATCH:/lesson/{id}/
     * @secure
     */
    lessonPartialUpdate: (
      id: number,
      data: PatchedLessonCreateUpdate,
      query?: {
        format?: 'json' | 'multipart';
        with_answers?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<LessonFull, any>({
        path: `/lesson/${id}/`,
        method: 'PATCH',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonDestroy
     * @request DELETE:/lesson/{id}/
     * @secure
     */
    lessonDestroy: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/lesson/${id}/`,
        method: 'DELETE',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonBookmarkCreate
     * @request POST:/lesson/{id}/bookmark/
     * @secure
     */
    lessonBookmarkCreate: (
      id: number,
      data: LessonSetBookmark,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<LessonSetBookmark, any>({
        path: `/lesson/${id}/bookmark/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson
     * @name LessonSchemaRetrieve
     * @request GET:/lesson/schema/
     */
    lessonSchemaRetrieve: (
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Lesson, any>({
        path: `/lesson/schema/`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  me = {
    /**
     * No description
     *
     * @tags me
     * @name MeRetrieve
     * @request GET:/me/
     * @secure
     */
    meRetrieve: (
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<UserFull, any>({
        path: `/me/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags me
     * @name MeUpdate
     * @request PUT:/me/
     * @secure
     */
    meUpdate: (
      data: UserFullUpdate,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<UserFull, any>({
        path: `/me/`,
        method: 'PUT',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags me
     * @name MeAvatarRetrieve
     * @request GET:/me/avatar
     * @secure
     */
    meAvatarRetrieve: (
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<any, any>({
        path: `/me/avatar`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags me
     * @name MeAvatarCreate
     * @request POST:/me/avatar
     * @secure
     */
    meAvatarCreate: (
      data: File,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Attachment, any>({
        path: `/me/avatar`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags me
     * @name MeAvatarDestroy
     * @request DELETE:/me/avatar
     * @secure
     */
    meAvatarDestroy: (
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/me/avatar`,
        method: 'DELETE',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags me
     * @name MeChangePasswordCreate
     * @request POST:/me/change-password
     * @secure
     */
    meChangePasswordCreate: (
      data: UserChangePassword,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/me/change-password`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  message = {
    /**
     * No description
     *
     * @tags message
     * @name MessageList
     * @request GET:/message/
     * @secure
     */
    messageList: (
      query?: {
        'Last by'?: string[];
        /** course */
        course?: string;
        /** @format int64 */
        course__lesson__module__course?: number;
        /** created_at__gt */
        created_at__gt?: string;
        /** created_at__lt */
        created_at__lt?: string;
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** @format int64 */
        recipient?: number;
        /** A search term. */
        search?: string;
        /** @format int64 */
        sender?: number;
        was_read?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedMessageList, any>({
        path: `/message/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags message
     * @name MessageCreate
     * @request POST:/message/
     * @secure
     */
    messageCreate: (
      data: MessageCreate,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Message, any>({
        path: `/message/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags message
     * @name MessageAttachmentList
     * @request GET:/message/{message_pk}/attachment/
     * @secure
     */
    messageAttachmentList: (
      messagePk: string,
      query?: {
        'Last by'?: string[];
        format?: 'json' | 'multipart';
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedAttachmentList, any>({
        path: `/message/${messagePk}/attachment/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags message
     * @name MessageAttachmentRetrieve
     * @request GET:/message/{message_pk}/attachment/{id}/
     * @secure
     */
    messageAttachmentRetrieve: (
      id: string,
      messagePk: string,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Attachment, any>({
        path: `/message/${messagePk}/attachment/${id}/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags message
     * @name MessageAttachmentDataRetrieve
     * @request GET:/message/{message_pk}/attachment/{id}/data/
     * @secure
     */
    messageAttachmentDataRetrieve: (
      id: string,
      messagePk: string,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<any, any>({
        path: `/message/${messagePk}/attachment/${id}/data/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags message
     * @name MessageAttachmentCreateAllCreate
     * @request POST:/message/{message_pk}/attachment/create-all/
     * @secure
     */
    messageAttachmentCreateAllCreate: (
      messagePk: string,
      data: File[],
      query?: {
        'Last by'?: string[];
        format?: 'json' | 'multipart';
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedAttachmentList, any>({
        path: `/message/${messagePk}/attachment/create-all/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags message
     * @name MessageRetrieve
     * @request GET:/message/{id}/
     * @secure
     */
    messageRetrieve: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Message, any>({
        path: `/message/${id}/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags message
     * @name MessageUpdate
     * @request PUT:/message/{id}/
     * @secure
     */
    messageUpdate: (
      id: number,
      data: MessageUpdate,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Message, any>({
        path: `/message/${id}/`,
        method: 'PUT',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags message
     * @name MessageMarkAsReadCreate
     * @request POST:/message/{id}/mark-as-read/
     * @secure
     */
    messageMarkAsReadCreate: (
      id: number,
      data: Message,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Message, any>({
        path: `/message/${id}/mark-as-read/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  module = {
    /**
     * No description
     *
     * @tags module
     * @name ModuleList
     * @request GET:/module/
     * @secure
     */
    moduleList: (
      query?: {
        'Last by'?: string[];
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedModuleList, any>({
        path: `/module/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags module
     * @name ModuleCreate
     * @request POST:/module/
     * @secure
     */
    moduleCreate: (
      data: ModuleCreateUpdate,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Module, any>({
        path: `/module/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags module
     * @name ModuleRetrieve
     * @request GET:/module/{id}/
     * @secure
     */
    moduleRetrieve: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
      },
      params: RequestParams = {}
    ) =>
      this.request<ModuleNested, any>({
        path: `/module/${id}/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags module
     * @name ModuleUpdate
     * @request PUT:/module/{id}/
     * @secure
     */
    moduleUpdate: (
      id: number,
      data: ModuleCreateUpdate,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Module, any>({
        path: `/module/${id}/`,
        method: 'PUT',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags module
     * @name ModuleDestroy
     * @request DELETE:/module/{id}/
     * @secure
     */
    moduleDestroy: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/module/${id}/`,
        method: 'DELETE',
        query: query,
        secure: true,
        ...params,
      }),
  };
  schema = {
    /**
     * @description OpenApi3 schema for this API. Format can be selected via content negotiation. - YAML: application/vnd.oai.openapi - JSON: application/vnd.oai.openapi+json
     *
     * @tags schema
     * @name SchemaRetrieve
     * @request GET:/schema/
     * @secure
     */
    schemaRetrieve: (
      query?: {
        format?: 'json' | 'yaml';
        lang?:
          | 'af'
          | 'ar'
          | 'ar-dz'
          | 'ast'
          | 'az'
          | 'be'
          | 'bg'
          | 'bn'
          | 'br'
          | 'bs'
          | 'ca'
          | 'cs'
          | 'cy'
          | 'da'
          | 'de'
          | 'dsb'
          | 'el'
          | 'en'
          | 'en-au'
          | 'en-gb'
          | 'eo'
          | 'es'
          | 'es-ar'
          | 'es-co'
          | 'es-mx'
          | 'es-ni'
          | 'es-ve'
          | 'et'
          | 'eu'
          | 'fa'
          | 'fi'
          | 'fr'
          | 'fy'
          | 'ga'
          | 'gd'
          | 'gl'
          | 'he'
          | 'hi'
          | 'hr'
          | 'hsb'
          | 'hu'
          | 'hy'
          | 'ia'
          | 'id'
          | 'ig'
          | 'io'
          | 'is'
          | 'it'
          | 'ja'
          | 'ka'
          | 'kab'
          | 'kk'
          | 'km'
          | 'kn'
          | 'ko'
          | 'ky'
          | 'lb'
          | 'lt'
          | 'lv'
          | 'mk'
          | 'ml'
          | 'mn'
          | 'mr'
          | 'ms'
          | 'my'
          | 'nb'
          | 'ne'
          | 'nl'
          | 'nn'
          | 'os'
          | 'pa'
          | 'pl'
          | 'pt'
          | 'pt-br'
          | 'ro'
          | 'ru'
          | 'sk'
          | 'sl'
          | 'sq'
          | 'sr'
          | 'sr-latn'
          | 'sv'
          | 'sw'
          | 'ta'
          | 'te'
          | 'tg'
          | 'th'
          | 'tk'
          | 'tr'
          | 'tt'
          | 'udm'
          | 'uk'
          | 'ur'
          | 'uz'
          | 'vi'
          | 'zh-hans'
          | 'zh-hant';
      },
      params: RequestParams = {}
    ) =>
      this.request<Record<string, any>, any>({
        path: `/schema/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description OpenApi3 schema for this API. Format can be selected via content negotiation. - YAML: application/vnd.oai.openapi - JSON: application/vnd.oai.openapi+json
     *
     * @tags schema
     * @name SchemaJsonRetrieve
     * @request GET:/schema/json/
     * @secure
     */
    schemaJsonRetrieve: (
      query?: {
        lang?:
          | 'af'
          | 'ar'
          | 'ar-dz'
          | 'ast'
          | 'az'
          | 'be'
          | 'bg'
          | 'bn'
          | 'br'
          | 'bs'
          | 'ca'
          | 'cs'
          | 'cy'
          | 'da'
          | 'de'
          | 'dsb'
          | 'el'
          | 'en'
          | 'en-au'
          | 'en-gb'
          | 'eo'
          | 'es'
          | 'es-ar'
          | 'es-co'
          | 'es-mx'
          | 'es-ni'
          | 'es-ve'
          | 'et'
          | 'eu'
          | 'fa'
          | 'fi'
          | 'fr'
          | 'fy'
          | 'ga'
          | 'gd'
          | 'gl'
          | 'he'
          | 'hi'
          | 'hr'
          | 'hsb'
          | 'hu'
          | 'hy'
          | 'ia'
          | 'id'
          | 'ig'
          | 'io'
          | 'is'
          | 'it'
          | 'ja'
          | 'ka'
          | 'kab'
          | 'kk'
          | 'km'
          | 'kn'
          | 'ko'
          | 'ky'
          | 'lb'
          | 'lt'
          | 'lv'
          | 'mk'
          | 'ml'
          | 'mn'
          | 'mr'
          | 'ms'
          | 'my'
          | 'nb'
          | 'ne'
          | 'nl'
          | 'nn'
          | 'os'
          | 'pa'
          | 'pl'
          | 'pt'
          | 'pt-br'
          | 'ro'
          | 'ru'
          | 'sk'
          | 'sl'
          | 'sq'
          | 'sr'
          | 'sr-latn'
          | 'sv'
          | 'sw'
          | 'ta'
          | 'te'
          | 'tg'
          | 'th'
          | 'tk'
          | 'tr'
          | 'tt'
          | 'udm'
          | 'uk'
          | 'ur'
          | 'uz'
          | 'vi'
          | 'zh-hans'
          | 'zh-hant';
      },
      params: RequestParams = {}
    ) =>
      this.request<Record<string, any>, any>({
        path: `/schema/json/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description OpenApi3 schema for this API. Format can be selected via content negotiation. - YAML: application/vnd.oai.openapi - JSON: application/vnd.oai.openapi+json
     *
     * @tags schema
     * @name SchemaYamlRetrieve
     * @request GET:/schema/yaml/
     * @secure
     */
    schemaYamlRetrieve: (
      query?: {
        lang?:
          | 'af'
          | 'ar'
          | 'ar-dz'
          | 'ast'
          | 'az'
          | 'be'
          | 'bg'
          | 'bn'
          | 'br'
          | 'bs'
          | 'ca'
          | 'cs'
          | 'cy'
          | 'da'
          | 'de'
          | 'dsb'
          | 'el'
          | 'en'
          | 'en-au'
          | 'en-gb'
          | 'eo'
          | 'es'
          | 'es-ar'
          | 'es-co'
          | 'es-mx'
          | 'es-ni'
          | 'es-ve'
          | 'et'
          | 'eu'
          | 'fa'
          | 'fi'
          | 'fr'
          | 'fy'
          | 'ga'
          | 'gd'
          | 'gl'
          | 'he'
          | 'hi'
          | 'hr'
          | 'hsb'
          | 'hu'
          | 'hy'
          | 'ia'
          | 'id'
          | 'ig'
          | 'io'
          | 'is'
          | 'it'
          | 'ja'
          | 'ka'
          | 'kab'
          | 'kk'
          | 'km'
          | 'kn'
          | 'ko'
          | 'ky'
          | 'lb'
          | 'lt'
          | 'lv'
          | 'mk'
          | 'ml'
          | 'mn'
          | 'mr'
          | 'ms'
          | 'my'
          | 'nb'
          | 'ne'
          | 'nl'
          | 'nn'
          | 'os'
          | 'pa'
          | 'pl'
          | 'pt'
          | 'pt-br'
          | 'ro'
          | 'ru'
          | 'sk'
          | 'sl'
          | 'sq'
          | 'sr'
          | 'sr-latn'
          | 'sv'
          | 'sw'
          | 'ta'
          | 'te'
          | 'tg'
          | 'th'
          | 'tk'
          | 'tr'
          | 'tt'
          | 'udm'
          | 'uk'
          | 'ur'
          | 'uz'
          | 'vi'
          | 'zh-hans'
          | 'zh-hant';
      },
      params: RequestParams = {}
    ) =>
      this.request<Record<string, any>, any>({
        path: `/schema/yaml/`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),
  };
  tag = {
    /**
     * No description
     *
     * @tags tag
     * @name TagList
     * @request GET:/tag/
     * @secure
     */
    tagList: (
      query?: {
        'Last by'?: string[];
        format?: 'json' | 'multipart';
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedTagList, any>({
        path: `/tag/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags tag
     * @name TagRetrieve
     * @request GET:/tag/{id}/
     * @secure
     */
    tagRetrieve: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Tag, any>({
        path: `/tag/${id}/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  task = {
    /**
     * No description
     *
     * @tags task
     * @name TaskList
     * @request GET:/task/
     * @secure
     */
    taskList: (
      query?: {
        'Last by'?: string[];
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
        /** lesson */
        lesson?: string;
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A search term. */
        search?: string;
        /** type */
        type?:
          | 'test_task'
          | 'detailed_answer_task'
          | 'matching_task'
          | 'project_task';
        with_answers?: boolean;
        with_content?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedTaskList, any>({
        path: `/task/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags task
     * @name TaskRetrieve
     * @request GET:/task/{id}/
     * @secure
     */
    taskRetrieve: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
        with_answers?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<TaskContent, any>({
        path: `/task/${id}/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  taskResult = {
    /**
     * No description
     *
     * @tags task-result
     * @name TaskResultList
     * @request GET:/task-result/
     * @secure
     */
    taskResultList: (
      query?: {
        'Last by'?: string[];
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A search term. */
        search?: string;
        /** task */
        task?: string;
        with_content?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedTaskResultContentList, any>({
        path: `/task-result/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags task-result
     * @name TaskResultCreate
     * @request POST:/task-result/
     * @secure
     */
    taskResultCreate: (
      data: TaskResultCreate,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<TaskResultContent, any>({
        path: `/task-result/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags task-result
     * @name TaskResultRetrieve
     * @request GET:/task-result/{id}/
     * @secure
     */
    taskResultRetrieve: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
      },
      params: RequestParams = {}
    ) =>
      this.request<TaskResultContent, any>({
        path: `/task-result/${id}/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags task-result
     * @name TaskResultAcceptCreate
     * @request POST:/task-result/{id}/accept/
     * @secure
     */
    taskResultAcceptCreate: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<TaskResultContent, any>({
        path: `/task-result/${id}/accept/`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags task-result
     * @name TaskResultDeclineCreate
     * @request POST:/task-result/{id}/decline/
     * @secure
     */
    taskResultDeclineCreate: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<TaskResultContent, any>({
        path: `/task-result/${id}/decline/`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags task-result
     * @name TaskResultAttachmentList
     * @request GET:/task-result/{task_result_pk}/attachment/
     * @secure
     */
    taskResultAttachmentList: (
      taskResultPk: string,
      query?: {
        'Last by'?: string[];
        format?: 'json' | 'multipart';
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedAttachmentList, any>({
        path: `/task-result/${taskResultPk}/attachment/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags task-result
     * @name TaskResultAttachmentRetrieve
     * @request GET:/task-result/{task_result_pk}/attachment/{id}/
     * @secure
     */
    taskResultAttachmentRetrieve: (
      id: string,
      taskResultPk: string,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<Attachment, any>({
        path: `/task-result/${taskResultPk}/attachment/${id}/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags task-result
     * @name TaskResultAttachmentDataRetrieve
     * @request GET:/task-result/{task_result_pk}/attachment/{id}/data/
     * @secure
     */
    taskResultAttachmentDataRetrieve: (
      id: string,
      taskResultPk: string,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<any, any>({
        path: `/task-result/${taskResultPk}/attachment/${id}/data/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags task-result
     * @name TaskResultAttachmentCreateAllCreate
     * @request POST:/task-result/{task_result_pk}/attachment/create-all/
     * @secure
     */
    taskResultAttachmentCreateAllCreate: (
      taskResultPk: string,
      data: File[],
      query?: {
        'Last by'?: string[];
        format?: 'json' | 'multipart';
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedAttachmentList, any>({
        path: `/task-result/${taskResultPk}/attachment/create-all/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags task-result
     * @name TaskResultSchemaRetrieve
     * @request GET:/task-result/schema/
     * @secure
     */
    taskResultSchemaRetrieve: (
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<TaskResult, any>({
        path: `/task-result/schema/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  token = {
    /**
     * No description
     *
     * @tags token
     * @name TokenIsAuthenticatedRetrieve
     * @request GET:/token/is-authenticated/
     * @secure
     */
    tokenIsAuthenticatedRetrieve: (
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<TokenObtainPair, any>({
        path: `/token/is-authenticated/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags token
     * @name TokenLogoutRetrieve
     * @request GET:/token/logout/
     * @secure
     */
    tokenLogoutRetrieve: (
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<TokenObtainPair, any>({
        path: `/token/logout/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags token
     * @name TokenObtainCreate
     * @request POST:/token/obtain/
     * @secure
     */
    tokenObtainCreate: (
      data: Credentials,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<TokenPair, any>({
        path: `/token/obtain/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags token
     * @name TokenRefreshCreate
     * @request POST:/token/refresh/
     * @secure
     */
    tokenRefreshCreate: (
      data: TokenPair,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<TokenPair, any>({
        path: `/token/refresh/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags token
     * @name TokenVerifyCreate
     * @request POST:/token/verify/
     * @secure
     */
    tokenVerifyCreate: (
      data: TokenVerify,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<TokenVerify, any>({
        path: `/token/verify/`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserRetrieve
     * @request GET:/user/{id}/
     * @secure
     */
    userRetrieve: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
        group?: 'manager' | 'mentor' | 'student';
      },
      params: RequestParams = {}
    ) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserAvatarRetrieve
     * @request GET:/user/{id}/avatar/
     * @secure
     */
    userAvatarRetrieve: (
      id: number,
      query?: {
        format?: 'json' | 'multipart';
      },
      params: RequestParams = {}
    ) =>
      this.request<any, any>({
        path: `/user/${id}/avatar/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}

export const api = new Api();
