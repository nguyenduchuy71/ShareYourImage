import { Link } from 'react-router-dom';

interface ICustomIcon {
  CustomIconImage: any;
  path: string;
  name: string;
}

export const CustomIconItem = ({ CustomIconImage, path, name }: ICustomIcon) => {
  return (
    <Link to={path} className="p-4 flex justify-start hover:opacity-80">
      <CustomIconImage className="h-5 w-5 lg:mr-2 md:mr-2 sm:mr-0 xs:mr-0" />
      <span className="flex-1 hidden lg:block md:block">{name}</span>
    </Link>
  );
};
