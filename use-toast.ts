import {
  type ToastActionElement,
  type ToastProps,
} from "components/ui/toast";

import { useToast as useSonnerToast } from "sonner";

export function useToast() {
  const { toast } = useSonnerToast();
  return {
    toast,
  };
}

export type { ToastProps, ToastActionElement };
