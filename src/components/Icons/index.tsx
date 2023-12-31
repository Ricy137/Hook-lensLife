import { ComponentProps } from 'react';
import cx from 'clsx';

export interface IconProps extends ComponentProps<'svg'> {
  iconClassName?: string;
}

export const DopeIcon: React.FC<IconProps & { activeId?: number }> = ({ activeId, ...props }) => (
  <svg width="270" height="228" viewBox="0 0 270 228" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M90.36 191.606C90.36 211.324 69.9313 227.5 44.4634 227.5C19.024 227.5 0.5 211.429 0.5 191.689C0.5 188.128 1.87129 183.176 4.34282 177.521C6.80855 171.879 10.3485 165.583 14.6375 159.346C23.1624 146.949 34.6037 134.849 46.3781 128.575C57.2791 135.317 68.2452 147.749 76.5142 160.186C80.6755 166.446 84.1432 172.69 86.5685 178.187C89.0013 183.7 90.36 188.406 90.36 191.606Z"
      fill={activeId === 2 ? '' : 'black'}
      stroke="black"
    />
    <path
      d="M269.36 191.606C269.36 211.324 248.931 227.5 223.463 227.5C198.024 227.5 179.5 211.429 179.5 191.689C179.5 188.128 180.871 183.176 183.343 177.521C185.809 171.879 189.348 165.583 193.637 159.346C202.162 146.949 213.604 134.849 225.378 128.575C236.279 135.317 247.245 147.749 255.514 160.186C259.676 166.446 263.143 172.69 265.568 178.187C268.001 183.7 269.36 188.406 269.36 191.606Z"
      fill={activeId === 1 ? '' : 'black'}
      stroke="black"
    />
    <path
      d="M178.36 63.6064C178.36 83.3236 157.931 99.5 132.463 99.5C107.024 99.5 88.5 83.429 88.5 63.6888C88.5 60.1276 89.8713 55.1765 92.3428 49.5211C94.8086 43.879 98.3485 37.5827 102.637 31.3459C111.162 18.9493 122.604 6.84941 134.378 0.575496C145.279 7.31685 156.245 19.7492 164.514 32.1865C168.676 38.4456 172.143 44.69 174.568 50.1867C177.001 55.7004 178.36 60.4059 178.36 63.6064Z"
      fill={activeId === 0 ? '' : 'black'}
      stroke="black"
    />
  </svg>
);

export const CheckedIcon: React.FC<IconProps> = ({ className, iconClassName }) => {
  return (
    <svg width="14" height="15" viewBox="0 0 14 15" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 7.7065L6 10.207L10.5 5.7075L9.7925 5L6 8.793L4.2065 7L3.5 7.7065Z" fill="#1E8E3E" />
      <path
        d="M3.11101 1.67971C4.26216 0.910543 5.61553 0.5 7 0.5C8.85652 0.5 10.637 1.2375 11.9497 2.55025C13.2625 3.86301 14 5.64348 14 7.5C14 8.88447 13.5895 10.2378 12.8203 11.389C12.0511 12.5401 10.9579 13.4373 9.67879 13.9672C8.3997 14.497 6.99224 14.6356 5.63437 14.3655C4.2765 14.0954 3.02922 13.4287 2.05026 12.4497C1.07129 11.4708 0.404603 10.2235 0.134506 8.86563C-0.13559 7.50776 0.00303298 6.1003 0.532846 4.82122C1.06266 3.54213 1.95987 2.44888 3.11101 1.67971ZM3.66658 12.4888C4.65328 13.1481 5.81332 13.5 7 13.5C8.5913 13.5 10.1174 12.8679 11.2426 11.7426C12.3679 10.6174 13 9.0913 13 7.5C13 6.31331 12.6481 5.15327 11.9888 4.16658C11.3295 3.17988 10.3925 2.41085 9.2961 1.95672C8.19975 1.5026 6.99335 1.38378 5.82946 1.61529C4.66558 1.8468 3.59648 2.41824 2.75736 3.25736C1.91825 4.09647 1.3468 5.16557 1.11529 6.32946C0.88378 7.49334 1.0026 8.69974 1.45673 9.7961C1.91085 10.8925 2.67989 11.8295 3.66658 12.4888Z"
        className={cx('fill-[#1E8E3E]', iconClassName)}
      />
    </svg>
  );
};

export const FailedIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 7C14 3.13401 10.866 1.18292e-06 7 0C3.13401 -2.14186e-06 1.18292e-06 3.134 0 7C-2.14186e-06 10.866 3.134 14 7 14C10.866 14 14 10.866 14 7ZM4.67091 3.94754L7.00001 6.29075L9.32912 3.94754L10.0384 4.65251L7.70499 7L10.0383 9.34749L9.32911 10.0525L7.00001 7.70925L4.67092 10.0525L3.96168 9.34749L6.29503 7L3.96167 4.65251L4.67091 3.94754Z"
        fill="#D93026"
      />
    </svg>
  );
};

export const CommentEllipseIcon: React.FC<IconProps> = ({ className, iconClassName, ...props }) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="14" cy="14" r="12" strokeWidth="4" className={cx('stroke-#FFA14A fill-white', iconClassName)} />
    </svg>
  );
};

export const CommentEllipseFocusIcon: React.FC<IconProps> = ({ className, iconClassName, ...props }) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle
        opacity="0.22"
        cx="20"
        cy="20"
        r="16"
        strokeWidth="8"
        className={cx('stroke-#F48A28 fill-white', iconClassName)}
      />
    </svg>
  );
};
