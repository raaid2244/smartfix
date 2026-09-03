import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total, centered = true) => {
  if (centered) {
    // Symmetrically balanced depth stack
    const offsetX = (i - (total - 1) / 2) * (distX * 0.4);
    const offsetY = -i * (distY * 0.45);
    return {
      x: offsetX,
      y: offsetY,
      z: -i * 40,
      zIndex: total - i
    };
  }
  return {
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
  };
};

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 540,
  height = 380,
  cardDistance = 60,
  verticalDistance = 50,
  delay = 4500,
  pauseOnHover = true,
  onCardClick,
  onSwap,
  centered = true,
  skewAmount = 4,
  easing = 'elastic',
  children
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.7,0.85)',
          durDrop: 1.2,
          durMove: 1.2,
          durReturn: 1.2,
          promoteOverlap: 0.75,
          returnDelay: 0.08
        }
      : {
          ease: 'power2.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total, centered), skewAmount);
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front]?.current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      const dropDist = typeof height === 'number' ? height * 0.75 : 300;

      tl.to(elFront, {
        y: `+=${dropDist}`,
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx]?.current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length, centered);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.12}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length, centered);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          if (elFront) gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
        const newFront = order.current[0];
        setActiveIdx(newFront);
        onSwap?.(newFront);
      });
    };

    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, centered]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;


