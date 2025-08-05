import {
  type ToastActionElement,
  type ToastProps,
} from "components/ui/toast";

import { toast } from "sonner";

export function useToast() {
  return {
    toast,
  };
}

export type { ToastProps, ToastActionElement };
