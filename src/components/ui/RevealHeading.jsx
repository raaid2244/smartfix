import React, { useMemo } from 'react';

// Recursively parse children and wrap words
function wrapWords(nodes) {
  return React.Children.map(nodes, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      const text = String(child);
      return text.split(/(\s+)/).map((part, i) => {
        if (part.trim() === '') {
          return part; // keep spaces as is
        }
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
            <span className="heading-word inline-block">{part}</span>
          </span>
        );
      });
    }
    if (React.isValidElement(child)) {
      if (child.type === 'br') {
        return child; // Keep br as is
      }
      
      const className = child.props.className || '';
      
      // If it's a gradient, don't split its inner text.
      // Wrap the whole element so CSS background-clip doesn't break on nested inline-blocks.
      // Also do this for explicitly block-level spans to animate them as a single line.
      if (typeof className === 'string' && (className.includes('logo-text-gradient') || className.includes('block'))) {
        const isBlock = className.includes('block');
        return (
          <span className={`inline-block overflow-hidden align-bottom pb-1 -mb-1 ${isBlock ? 'w-full' : ''}`}>
            <span className={`heading-word inline-block ${isBlock ? 'w-full' : ''}`}>{child}</span>
          </span>
        );
      }

      return React.cloneElement(child, {
        children: wrapWords(child.props.children)
      });
    }
    return child;
  });
}

export function RevealHeading({ children, className = "" }) {
  // Memoize wrapped children so we don't re-parse on every render unnecessarily
  const wrappedChildren = useMemo(() => wrapWords(children), [children]);

  // We wrap in a block level element or the provided className
  // If className implies block or flex, it works. Otherwise default block.
  return (
    <div className={`section-heading ${className || "block"}`}>
      {wrappedChildren}
    </div>
  );
}
