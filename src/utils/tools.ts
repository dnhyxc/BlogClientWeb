export type Result<T> =
  | {
      success: true;
      code: string;
      data: T;
      response: any; // 原始数据
    }
  | {
      success: false;
      err: Error;
      message: string;
      data?: any;
    };

export function normalizeResult<T = any>(res: { err: Error | null; data: any }): Result<T> {
  console.log(res, '<<<<<<<<<<<<<<<<<<');
  if (!res) {
    return {
      success: false,
      data: null,
      message: '',
      err: new Error(''),
    };
  }

  if (res.err) {
    console.log(res.err, 'res.errres.errres.err');
    return {
      success: false,
      err: res.err,
      message: res.err.message,
    };
  }
  // 第一层 data 是服务端返回的原始 response
  let { data } = res;

  if (!data) {
    console.log(data, 'res.data.data.data');
    return {
      success: false,
      err: new Error(''),
      message: '',
    };
  }

  /**
   * data 是数组的情况
   * （还没有发现什么接口什么情况下服务端会直接返回数组，虽然双春说有）
   */
  if (Array.isArray(data)) {
    return {
      success: true,
      data: data as any,
      response: res.data,
      code: res.data.code,
    };
  }

  /**
   * 返回错误
   */
  if (data.success !== true) {
    console.log(data, 'datadatadata??????');
    return {
      success: false,
      err: new Error(data.message),
      message: data.message,
      data,
    };
  }

  // 第二层 data 为 response 的 data 属性
  ({ data } = data);

  // 如果 data 下面有且只有一层 data，则进入下一层
  while (
    data &&
    Object.prototype.hasOwnProperty.call(data, 'data') &&
    Object.keys(data).length === 1
  ) {
    ({ data } = data);
  }

  console.log(data, 'datadatadata??????');

  return {
    success: true,
    data,
    response: res.data,
    code: res.data.code,
  };
}