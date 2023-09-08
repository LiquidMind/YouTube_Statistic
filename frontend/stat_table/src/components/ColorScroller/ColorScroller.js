import React, { useEffect, useRef } from 'react';

const ColorScroller = ({ colors, speed = 2 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let position = 0;

    const scrollColors = () => {
      const childWidth = container.children[0].offsetWidth;
      position -= speed;
      if (position <= -childWidth) {
        position = 0;
        container.appendChild(container.firstChild);
      }
      container.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(scrollColors);
    };

    requestAnimationFrame(scrollColors);
  }, [speed, colors]);

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        height: '300px',
        position: 'relative',
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: 'fit-content',
          position: 'absolute',
          right: 0,
        }}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              height: '300px',
              width: '250px',
            }}
          />
        ))}
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              height: '300px',
              width: '250px',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorScroller;


///  БІБЛІОТЕКА
// import React, { useRef, useEffect } from 'react';

// const ColorScroller = ({ colors }) => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     let position = 0;
//     const speed = 2;

//     const animate = () => {
//       position -= speed;
//       if (position <= -250 * colors.length) {
//         position = 0;
//       }
//       container.style.transform = `translateX(${position}px)`;
//       requestAnimationFrame(animate);
//     };

//     requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(animate);
//   }, [colors]);

//   return (
//     <div style={{ overflow: 'hidden', width: '100%', height: '300px' }}>
//       <div ref={containerRef} style={{ display: 'flex', flexDirection: 'row', width: 'fit-content' }}>
//         {colors.map((color, index) => (
//           <div key={index} style={{ backgroundColor: color, height: '300px', width: '250px' }} />
//         ))}
//         {colors.map((color, index) => (
//           <div key={index} style={{ backgroundColor: color, height: '300px', width: '250px' }} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ColorScroller;
