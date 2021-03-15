import React, { PropsWithChildren, useEffect } from 'react';
import { DragElement, DraggableWrapperProps } from './types';
import './DraggableWrapper.scss';

const DraggableWrapper: React.FC<PropsWithChildren<DraggableWrapperProps>> = (
  props: PropsWithChildren<DraggableWrapperProps>,
) => {
  const { top, left, right } = props;

  let style = null;
  if (top || left || right) {
    style = {
      top,
      left,
      right,
    };
  }

  const dragObject: DragElement = {} as DragElement;

  const dragStartListener = (event: DragEvent) => {
    if (event.button !== 0) {
      return;
    }

    if (!(event.target instanceof HTMLElement)) return;

    const elem: HTMLElement | null = event.target?.closest('.draggable');

    if (!elem) return;

    const dt = event.dataTransfer;
    if (dt) {
      dt.effectAllowed = 'move';
    }

    dragObject.elem = elem as HTMLElement;

    dragObject.downX = event.pageX;
    dragObject.downY = event.pageY;
    dragObject.mouseOffsetLeft = event.pageX - elem.offsetLeft;
    dragObject.mouseOffsetTop = event.pageY - elem.offsetTop;
  };

  const dropListener = (event: DragEvent) => {
    event.preventDefault();

    const newX = event.pageX;
    const newY = event.pageY;

    if (!dragObject) return;

    dragObject.elem.style.left = `${newX - dragObject.mouseOffsetLeft}px`;
    dragObject.elem.style.top = `${newY - dragObject.mouseOffsetTop}px`;
  };

  useEffect(() => {
    document.addEventListener('dragstart', dragStartListener);
    document.addEventListener('dragenter', (event) => event.preventDefault());
    document.addEventListener('dragover', (event) => event.preventDefault());
    document.addEventListener('drop', dropListener);

    return () => {
      document.removeEventListener('dragstart', dragStartListener);
      document.removeEventListener('dragenter', (event) => event.preventDefault());
      document.removeEventListener('dragover', (event) => event.preventDefault());
      document.removeEventListener('drop', dropListener);
    };
  }, []);

  return (
    <div className="draggable" draggable style={style || undefined}>
      {props.children}
    </div>
  );
};

export default DraggableWrapper;
