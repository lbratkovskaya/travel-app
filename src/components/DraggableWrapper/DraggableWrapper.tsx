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

  const dragStartListener = (event: DragEvent | TouchEvent) => {
    if ((event instanceof DragEvent) && event.button !== 0) {
      return;
    }

    if (!(event.target instanceof HTMLElement)) return;

    const elem: HTMLElement | null = event.target?.closest('.draggable');

    if (!elem) return;

    const dt = (event instanceof DragEvent) && event.dataTransfer;
    if (dt) {
      dt.effectAllowed = 'move';
    }

    dragObject.elem = elem as HTMLElement;

    dragObject.downX = (event instanceof DragEvent)
      ? (event as DragEvent).pageX : (event as TouchEvent).touches[0].pageX;
    dragObject.downY = (event instanceof DragEvent)
      ? (event as DragEvent).pageY : (event as TouchEvent).touches[0].pageY;
    dragObject.mouseOffsetLeft = dragObject.downX - elem.offsetLeft;
    dragObject.mouseOffsetTop = dragObject.downY - elem.offsetTop;
  };

  const dropListener = (event: DragEvent | TouchEvent) => {
    if (event.cancelable) {
      event.preventDefault();
    }
    if (!(event.target instanceof HTMLElement)) return;

    if (!dragObject.elem.isEqualNode(event.target?.closest('.draggable') as HTMLElement)) {
      return;
    }

    const newX = (event instanceof DragEvent)
      ? (event as DragEvent).pageX : (event as TouchEvent).changedTouches[0].pageX;
    const newY = (event instanceof DragEvent)
      ? (event as DragEvent).pageY : (event as TouchEvent).changedTouches[0].pageY;

    if (!dragObject) return;

    dragObject.elem.style.left = `${newX - dragObject.mouseOffsetLeft}px`;
    dragObject.elem.style.top = `${newY - dragObject.mouseOffsetTop}px`;
  };

  useEffect(() => {
    document.addEventListener('dragstart', dragStartListener);
    document.addEventListener('touchstart', dragStartListener);
    document.addEventListener('dragenter', (event) => event.preventDefault());
    document.addEventListener('dragover', (event) => event.preventDefault());
    document.addEventListener('drop', dropListener);
    document.addEventListener('touchend', dropListener);

    return () => {
      document.removeEventListener('dragstart', dragStartListener);
      document.removeEventListener('touchstart', dragStartListener);
      document.removeEventListener('dragenter', (event) => event.preventDefault());
      document.removeEventListener('dragover', (event) => event.preventDefault());
      document.removeEventListener('drop', dropListener);
      document.removeEventListener('touchend', dropListener);
    };
  }, []);

  return (
    <div className="draggable" draggable style={style || undefined}>
      {props.children}
    </div>
  );
};

export default DraggableWrapper;
