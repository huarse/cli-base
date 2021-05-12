// 常用的一些数据类型
// @author CAIHUAZHI <moyan@come-future.com>
// @create 2021/05/12 22:00

/** 基本类型，不算 object、null、undefined */
export type BaseType = string | number | boolean | symbol;

/** 单字母（小写） */
export type SingleChar = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

/** 单字母（大写） */
export type SingleCharUpper = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

/** 0~9 */
export type SingleNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
