'use client';

import { useState } from 'react';
import {
  useFloating,
  useHover,
  useInteractions,
  useRole,
  useDismiss,
  FloatingPortal,
  offset,
  shift,
  flip,
  autoUpdate,
} from '@floating-ui/react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

export function Tooltip({ children, content, className = '' }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
    placement: 'top',
  });

  const hover = useHover(context, {
    move: true,
    delay: { open: 50, close: 0 },
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
      >
        {children}
      </div>
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg border border-gray-700 backdrop-blur-sm transition-opacity duration-200 pointer-events-none"
          >
            {content}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
