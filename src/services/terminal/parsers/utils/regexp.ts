interface IRegexpOptions {
  canBeSingleWord?: boolean;
}

const defaultOptions: IRegexpOptions = {
  canBeSingleWord: true,
};

export const regexp = (
  s: string,
  { canBeSingleWord }: IRegexpOptions = defaultOptions
): RegExp =>
  canBeSingleWord
    ? new RegExp(`^${s}(\\s|$)`)
    : new RegExp(`^${s}\\s([\\S\\s]+)$`);
