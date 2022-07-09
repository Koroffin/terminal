import adjectives from './data/adjectives.json';
import noun from './data/noun.json';
import extensions from './data/extensions.json';

const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

interface IProps {
  isDir?: boolean;
}
export const generateCoolName = ({ isDir = false }: IProps = {}) => {
  const ext = isDir ? '' : `.${rand(extensions.data)}`;
  const str = `${rand(adjectives.data)} ${rand(noun.data)}${ext}`;
  return isDir ? str : str.toLowerCase().replace(/\s/gi, '_');
};
