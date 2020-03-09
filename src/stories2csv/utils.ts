export type Predicate<T> = (e: T) => boolean;

export type ArrayReducer<Element, Reduced> = (a: Reduced, e: Element) => Reduced;

export type Splitter<T> = (predicate: Predicate<T>) => ArrayReducer<T, T[][]>;

const split = <T>(isSkippingSeparators: boolean): Splitter<T> =>
  (predicate) =>
    (acc, elem) => {
      const isSeparator = predicate(elem);
      const fromEnd = isSeparator ? 0 : 1;
      const rest = acc.slice(0, acc.length - fromEnd);
      const lastHead = acc[acc.length - 1] ?? [];
      const newHead = isSkippingSeparators ? [] : [elem];
      const head = isSeparator ? newHead : [...lastHead, elem];
      return [...rest, head];
    };

export const splitOn = <T>(predicate: Predicate<T>): ArrayReducer<T, T[][]> =>
  split<T>(true)(predicate);

export const splitBefore = <T>(predicate: Predicate<T>): ArrayReducer<T, T[][]> =>
  split<T>(false)(predicate);
