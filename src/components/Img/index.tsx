import { useState, useEffect, ComponentProps } from 'react';
import DefaultImg from '@assets/default.svg';
import cx from 'clsx';

//Progressive image (Next has default support for this)
interface PImg extends ComponentProps<'img'> {
  placeHolderSrc?: string;
  src: string;
}
const Img: React.FC<PImg> = ({ placeHolderSrc = DefaultImg, src, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeHolderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return <img className={cx('pointer-events-none select-none', className)} src={imgSrc} {...props} draggable={false} />;
};

export default Img;
