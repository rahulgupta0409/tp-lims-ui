interface RequestParams {
    url: string;
    headers?: Record<string, string>;
    onSuccess: (data: any) => void;
    body?: string | FormData | Blob | ArrayBufferView;
    onError?: (error: any) => void;
  }
  
  interface ResponseData {
    data?: any;
  }
  
  function parseJSON(res: Response): Promise<ResponseData> {
    return res.json();
  }
  
  async function executeRequest(requestParams: RequestParams, method: string): Promise<any> {
    const { url, headers, onSuccess, body, onError } = requestParams;
  
    try {
      const response = await fetch(url, { method, headers, body });
      const json = await parseJSON(response);
  
      onSuccess(json.data || json);
      return json.data || json;
    } catch (error) {
      return onError ? onError(error) : error;
    }
  }
  
  const getRequest = (requestParams: RequestParams) => executeRequest(requestParams, "GET");
  const putRequest = (requestParams: RequestParams) => executeRequest(requestParams, "PUT");
  const postRequest = (requestParams: RequestParams) => executeRequest(requestParams, "POST");
  const deleteRequest = (requestParams: RequestParams) => executeRequest(requestParams, "DELETE");
  
  export const requestHelper = { getRequest, putRequest, postRequest, deleteRequest };
  