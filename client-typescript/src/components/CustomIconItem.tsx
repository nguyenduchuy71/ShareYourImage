import { Link } from "react-router-dom";

interface ICustomIcon {
  CustomIconImage: any;
  path: string;
  name: string;
}

export const CustomIconItem = ({
  CustomIconImage,
  path,
  name,
}: ICustomIcon) => {
  return (
    <Link to={path} className="flex items-center hover:opacity-80">
      <CustomIconImage className="h-5 w-5 mr-1.5" />
      <span className="ml-1">{name}</span>
    </Link>
  );
};
