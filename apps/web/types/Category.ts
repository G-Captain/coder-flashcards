export type Category = 'react' | 'javascript' | 'typescript' | 'nodejs';

export type CategoryOption = {
  value: Category;
  label: string;
  imageSrc: string;
};

export const categoryOptions: CategoryOption[] = [
  {
    label: 'JavaScript',
    value: 'javascript',
    imageSrc: `/images/category/javascript.svg`,
  },
  {
    label: 'TypeScript',
    value: 'typescript',
    imageSrc: `/images/category/typescript.svg`,
  },
  {
    label: 'Node.js',
    value: 'nodejs',
    imageSrc: `/images/category/nodejs.svg`,
  },
  {
    label: 'React',
    value: 'react',
    imageSrc: `/images/category/react.svg`,
  },
];

export const getCategoryOption = (category: Category) =>
  categoryOptions.find((cat) => cat.value === category);
