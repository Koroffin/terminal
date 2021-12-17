export const sortByField = <T>(arr: T[], key: keyof T) => {
  return [...arr].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    return typeof aValue === 'string' && typeof bValue === 'string'
      ? aValue.localeCompare(bValue)
      : (aValue as unknown as number) - (bValue as unknown as number);
  });
};
