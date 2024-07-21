interface IImgaeItem {
  imageSrc: string;
  imageAlt: string;
  isSelected: boolean;
}

export const ImageItem = ({ imageSrc, imageAlt, isSelected }: IImgaeItem) => {
  return (
    <div className="p-2">
      <img
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        className={`w-56 h-56 rounded-lg object-cover ${isSelected ? 'p-0' : 'p-2'}`}
      />
    </div>
  );
};
