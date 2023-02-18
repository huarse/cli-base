// interaction utils -- 控制台交互方法
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/08/17 20:42

import inquirer from 'inquirer';
import chalk from 'chalk';
import { print } from './print';
import { isNull } from './object';

/**
 * node 控制台二次确认
 * @param message 提示信息
 * @param defaultValue 默认值
 * @example
 * const isUpdate = await confirm('请确认是否要升级？');
 */
export async function confirm(message: string, defaultValue = false): Promise<boolean> {
  const result = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'value',
      message,
      default: defaultValue || false,
    },
  ]);

  return result.value;
}

/**
 * node 控制台用户输入
 * @param message 提示信息
 * @param defaultValue 默认值
 * @param validator 校验规则，如果是 boolean，则表示必填
 * @example
 * const username = await input('请输入用户名：');
 */
export async function input(
  message: string,
  defaultValue?: string,
  validator: boolean | ((v: string) => Promise<boolean | Error> | boolean | Error) = false,
): Promise<string> {
  const result = await inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message,
      default: defaultValue,
    },
  ]);

  if (!validator) {
    return result.value;
  }

  if (validator === true && !result.value) {
    return await input(chalk.red(message), defaultValue, validator);
  }

  if (typeof validator === 'function') {
    const flag = await validator(result.value);
    if (flag === false) {
      print('error', `${result.value} 校验失败，请重新输入！`);
      return await input(chalk.red(message), defaultValue, validator);
    }
    if (flag instanceof Error) {
      print('error', flag.message);
      return await input(chalk.red(message), defaultValue, validator);
    }
  }

  return result.value;
}

/**
 * @deprecated 请使用 input
 */
export const prompt = input;

/**
 * node 控制台用户输入
 * @param message 提示信息
 * @param defaultValue 默认值
 * @param validator 校验规则，如果是 boolean，则表示必填
 * @example
 * const username = await password('请输入密码：');
 */
export async function password(
  message: string,
  defaultValue?: string,
  validator: boolean | ((v: string) => Promise<boolean | Error> | boolean | Error) = false,
): Promise<string> {
  const result = await inquirer.prompt([
    {
      type: 'password',
      name: 'value',
      message,
      default: defaultValue,
    },
  ]);

  if (!validator) {
    return result.value;
  }

  if (validator === true && !result.value) {
    return await password(chalk.red(message), defaultValue, validator);
  }

  if (typeof validator === 'function') {
    const flag = await validator(result.value);
    if (flag === false) {
      print('error', `${result.value} 校验失败，请重新输入！`);
      return await password(chalk.red(message), defaultValue, validator);
    }
    if (flag instanceof Error) {
      print('error', flag.message);
      return await password(chalk.red(message), defaultValue, validator);
    }
  }

  return result.value;
}

export interface SelectOption<T = string> {
  name: string;
  value: T;
}

/**
 * node 控制台用户选择
 * @param message 提示信息
 * @param options 选项
 * @param defaultValue 默认值
 * @example
 * const value = await select('请选择性别: ', ['男', '女']);
 */
export async function select<T = string>(
  message: string,
  options: Array<SelectOption<T>> | T[],
  defaultValue?: T,
): Promise<T> {
  const defaultIndex = !isNull(defaultValue)
    ? options.findIndex((item: SelectOption<T> | T) => {
      if (typeof item === 'object') {
        return (item as SelectOption<T>).value === defaultValue;
      }

      return item === defaultValue;
    })
    : null;

  const result = await inquirer.prompt([
    {
      type: 'list',
      name: 'value',
      message,
      choices: options,
      default: defaultIndex,
    },
  ]);

  return result.value;
}

/**
 * @deprecated 请使用 select
 */
export const check = select;

/**
 * node 控制台多选
 * @param message 提示信息
 * @param options 选项
 * @param defaultValue 默认值（列表）
 */
export async function multi<T = string>(
  message: string,
  options: Array<SelectOption<T>>,
  defaultValue: T[] = [],
): Promise<T[]> {
  const addonOptions = options.map((item) => ({
    ...item,
    checked: defaultValue.some((value) => item.value === value),
  }));

  const result = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'value',
      message,
      choices: addonOptions,
    },
  ]);

  return result.value;
}

/**
 * @deprecated 请使用 multi
 */
export const multiSelect = multi;

/**
 * 进入等待状态，输入回车继续
 * @param tips 提示信息
 */
export async function holding(tips = '按回车继续...'): Promise<boolean> {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message: tips,
      prefix: '',
    },
  ]);

  return true;
}

/**
 * 进入等待状态，输入回车继续
 * @param tips 提示信息
 * @deprecated 请使用 holding
 */
export const waiting = holding;
