import defaultImg from '@/assets/img/default.png'
interface IImgaeItem {
  imageSrc: string;
  imageAlt: string;
  customStyle?: string,
}

export const ImageItem = ({ imageSrc, imageAlt, customStyle = null }: IImgaeItem) => {
  return (
    <div className="p-2">
      <img
        src={imageSrc ? imageSrc : defaultImg}
        alt={imageAlt}
        loading="lazy"
        className={`${customStyle ? customStyle : 'w-40 h-40 rounded-lg object-cover'}`}
      />
    </div>
  );
};
