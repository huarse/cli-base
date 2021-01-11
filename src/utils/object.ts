// 对象的判断方法
// @author CAIHUAZHI <moyan@come-future.com>
// @create 2021/01/11 21:01

/**
 * 判断对象是否为空 (null | undefined | obj)
 * @param obj
 */
export function isNull(obj: any) {
  return obj === null || obj === undefined || obj === '';
}
