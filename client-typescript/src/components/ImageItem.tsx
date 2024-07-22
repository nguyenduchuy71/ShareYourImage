interface IImgaeItem {
  imageSrc: string;
  imageAlt: string;
}

export const ImageItem = ({ imageSrc, imageAlt }: IImgaeItem) => {
  return (
    <div className="p-2">
      <img
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        className={`w-48 h-48 rounded-lg object-cover`}
      />
    </div>
  );
};
