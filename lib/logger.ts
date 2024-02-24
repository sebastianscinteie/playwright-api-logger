import { APIRequestContext, APIResponse, Request } from "@playwright/test";
import { ReadStream } from "fs";

type Options =
  | {
      data?: any;
      failOnStatusCode?: boolean | undefined;
      form?: { [key: string]: string | number | boolean } | undefined;
      headers?: { [key: string]: string } | undefined;
      ignoreHTTPSErrors?: boolean | undefined;
      maxRedirects?: number | undefined;
      multipart?:
        | {
            [key: string]:
              | string
              | number
              | boolean
              | ReadStream
              | { name: string; mimeType: string; buffer: Buffer };
          }
        | undefined;
      params?: { [key: string]: string | number | boolean } | undefined;
      timeout?: number | undefined;
      method?: string;
    }
  | undefined;

export class APIRequestLogger implements APIRequestContext {
  private _baseURL: string | undefined;
  request: APIRequestContext;

  constructor(request: APIRequestContext, baseUrl: string | undefined) {
    this.request = request;
    this._baseURL = baseUrl;
  }

  private async _printReqRes(url: string, options: Options, method) {
    //implement logging/reporting here
    const stringify = (x) => JSON.stringify(x, null, 2);

    let urlObj: URL;
    if (URL.canParse(url)) {
      urlObj = new URL(url);
    } else {
      urlObj = new URL(url, this._baseURL);
    }

    method = method === "fetch" ? options?.method : method;

    console.log(`REQ: ${method.toUpperCase()} ${urlObj.toString()}`);
    console.log(`REQ ENDPOINT: ${urlObj.pathname}${urlObj.search}`);
    options?.headers && console.log(`HEADERS:\n${stringify(options?.headers)}`);
    options?.data && console.log(`REQ BODY:\n${stringify(options?.data)}`);

    const res = await this.request[method?.toLowerCase()](url, options);
    console.log(`RES: ${res.status()}`);
    console.log(`RES HEADERS:\n${stringify(res.headers())}`);
    console.log(`RES BODY:\n${await res.text()}`);

    return res;
  }

  async delete(url: string, options?: Options): Promise<APIResponse> {
    return await this._printReqRes(url, options, "delete");
  }
  dispose(): Promise<void> {
    return this.request.dispose();
  }
  async fetch(
    urlOrRequest: string | Request,
    options?: Options & { method: string }
  ): Promise<APIResponse> {
    let url: string;
    if (typeof urlOrRequest === "string") {
      url = urlOrRequest;
    } else {
      url = urlOrRequest.url();
    }
    return this._printReqRes(url, options, "fetch");
  }
  get(url: string, options?: Options): Promise<APIResponse> {
    return this._printReqRes(url, options, "get");
  }
  head(url: string, options?: Options): Promise<APIResponse> {
    return this._printReqRes(url, options, "head");
  }
  patch(url: string, options?: Options): Promise<APIResponse> {
    return this._printReqRes(url, options, "patch");
  }
  post(url: string, options?: Options): Promise<APIResponse> {
    return this._printReqRes(url, options, "post");
  }
  put(url: string, options?: Options): Promise<APIResponse> {
    return this._printReqRes(url, options, "put");
  }
  storageState(options?: { path?: string | undefined } | undefined): Promise<{
    cookies: {
      name: string;
      value: string;
      domain: string;
      path: string;
      expires: number;
      httpOnly: boolean;
      secure: boolean;
      sameSite: "Strict" | "Lax" | "None";
    }[];
    origins: {
      origin: string;
      localStorage: { name: string; value: string }[];
    }[];
  }> {
    return this.request.storageState(options);
  }
  [Symbol.asyncDispose](): Promise<void> {
    return this.dispose();
  }
}
