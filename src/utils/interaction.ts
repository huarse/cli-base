// interaction utils -- 控制台交互方法
// @author MOYAN <moyan@come-future.com>
// @create 2020/08/17 20:42

import inquirer from 'inquirer';
import chalk from 'chalk';

/**
 * node 控制台二次确认
 * @param message 提示信息
 * @param defaultValue 默认值
 * @example
 * const isUpdate = await confirm('请确认是否要升级？');
 */
export async function confirm(message: string, defaultValue = false): Promise<boolean> {
  const result = await inquirer.prompt([{
    type: 'confirm',
    name: 'value',
    message,
    default: defaultValue || false,
  }]);

  return result.value;
}

/**
 * node 控制台用户输入
 * @alias input
 * @param message 提示信息
 * @param defaultValue 默认值
 * @param required 是否必填，默认 false
 * @example
 * const username = await prompt('请输入用户名：');
 */
export async function prompt(message: string, defaultValue?: string, required = false): Promise<string> {
  const result = await inquirer.prompt([{
    type: 'input',
    name: 'value',
    message,
    default: defaultValue,
  }]);

  if (!result.value && required) {
    return await prompt(chalk.red(message), defaultValue, true);
  }

  return result.value;
}

export const input = prompt;

/**
 * node 控制台用户输入
 * @param message 提示信息
 * @param defaultValue 默认值
 * @param required 是否必填，默认 false
 * @example
 * const username = await password('请输入密码：');
 */
export async function password(message: string, defaultValue?: string, required = false): Promise<string> {
  const result = await inquirer.prompt([{
    type: 'password',
    name: 'value',
    message,
    default: defaultValue,
  }]);

  if (!result.value && required) {
    return await prompt(chalk.red(message), defaultValue, true);
  }

  return result.value;
}

interface SelectOptions {
  name: string;
  value: string;
}

/**
 * node 控制台用户选择
 * @alias check
 * @param message 提示信息
 * @param options 选项
 * @param defaultValue 默认值或默认的选项 index
 * @example
 * const value = await select('请选择性别: ', ['男', '女']);
 */
export async function select(
  message: string,
  options: SelectOptions[] | string[],
  defaultValue: string | number
): Promise<string> {
  const result = await inquirer.prompt([{
    type: 'list',
    name: 'value',
    message,
    choices: options,
    default: defaultValue,
  }]);

  return result.value;
}

export const check = select;

/**
 * 进入等待状态，输入回车继续
 * @alias waiting
 * @param tips 提示信息
 */
export async function holding(tips = '按回车继续...'): Promise<boolean> {
  await inquirer.prompt([{
    type: 'input',
    name: 'value',
    message: tips,
    prefix: '',
  }]);

  return true;
}

/**
 * 进入等待状态，输入回车继续
 * @param tips 提示信息
 */
export const waiting = holding;
