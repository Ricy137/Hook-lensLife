import { ComponentProps, MouseEvent, useCallback, useRef, useEffect, useState, useLayoutEffect } from 'react';
import cx from 'clsx';
import { CommentEllipseIcon } from '@components/Icons';
import { periodToPersent, PersentToPeriod } from '@utils/rateUtils';

const Progress: React.FC<
  ComponentProps<'div'> & {
    width?: number;
    disable?: boolean;
    initialValue?: number;
    totalValue: number;
    handleProgressChange?: (value: number) => void;
  }
> = ({ width, disable = false, initialValue, totalValue, handleProgressChange, ...props }) => {
  const [origionX, setOrigionX] = useState<{ left: number; right: number }>({
    left: 0,
    right: 0,
  });
  const [x, setX] = useState(width ?? 0 / 2);
  let containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      let leftX = Math.floor(e.clientX - origionX.left);
      let newPercent = periodToPersent(leftX, origionX.right - origionX.left, 100);
      if (leftX >= 0 && newPercent <= 100) {
        setX(leftX);
        handleProgressChange?.(newPercent);
      }
    },
    [origionX, handleProgressChange],
  );

  const getClientX = useCallback(() => {
    const element = containerRef.current;

    if (element) {
      const rect = element.getBoundingClientRect();
      const leftX = rect.left;
      const rightX = rect.right;
      setOrigionX({ left: leftX, right: rightX });
    }
  }, [containerRef]);

  useEffect(() => {
    const clientXTimer = setTimeout(() => getClientX(), 200);
    return () => clearTimeout(clientXTimer);
  }, [containerRef]);

  const handleResize = useCallback(() => {
    getClientX();
    if (containerRef.current) {
      const testedWidth = containerRef.current.offsetWidth;
      setX(PersentToPeriod(initialValue!, testedWidth, totalValue) + 1);
    }
  }, [containerRef]);

  useEffect(() => {
    const newX = PersentToPeriod(initialValue!, origionX.right - origionX.left, totalValue);
    setX(newX);
  }, [containerRef, initialValue, origionX]);

  useLayoutEffect(() => {
    if (!initialValue) return;
    if (width) {
      setX(PersentToPeriod(initialValue, width, 100));
      return;
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerRef]);

  return (
    <div
      {...props}
      ref={containerRef}
      className="relative w-full h-8px bg-#DCDEE0 rounded-41px cursor-pointer"
      onClick={handleClick}
      aria-disabled
    >
      <div className={cx('h-full rounded-41px bg-#FFA14A')} style={{ width: `${x + 1}px` }} />
      <CommentEllipseIcon className={cx('absolute top-50% -translate-y-50% z-20')} style={{ left: `${x - 14}px` }} />
    </div>
  );
};

export default Progress;
