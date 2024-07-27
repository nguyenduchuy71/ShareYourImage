import { Link } from 'react-router-dom';

interface ICustomIcon {
  CustomIconImage: any;
  path: string;
  name: string;
}

export const CustomIconItem = ({ CustomIconImage, path, name }: ICustomIcon) => {
  return (
    <Link to={path} className="p-4 w-full flex justify-items-start items-center hover:opacity-80">
      <CustomIconImage className="h-5 w-5 lg:mr-2 md:mr-2 sm:mr-0 xs:mr-0" />
      <span className="hidden lg:relative md:relative">{name}</span>
    </Link>
  );
};
