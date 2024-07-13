import { toast } from 'react-toastify';

export const triggerNotify = (message: string) => {
  toast.dismiss();
  toast(message);
};
