export type DragElement = {
  elem: HTMLElement,
  downX: number,
  downY: number,
  mouseOffsetLeft: number,
  mouseOffsetTop: number,
};

export interface DraggableWrapperProps {
  top?: number,
  left?: number,
  right?: number,
}
