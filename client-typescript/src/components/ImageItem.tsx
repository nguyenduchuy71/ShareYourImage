interface IImgaeItem {
  imageSrc: string;
  imageAlt: string;
  isSelected: boolean;
}

export const ImageItem = ({ imageSrc, imageAlt, isSelected }: IImgaeItem) => {
  return (
    <div>
      <img
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        className={`h-60 w-60 object-cover rounded-lg ${isSelected ? 'p-0' : 'p-2'}`}
      />
    </div>
  );
};
