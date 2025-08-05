import * as React from "react";

export type ToastActionElement = React.ReactElement;

export interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
}
