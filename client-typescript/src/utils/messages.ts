import { toast } from 'react-toastify';

export const triggerNotify = (message: string) => {
  toast.dismiss();
  setTimeout(async () => await toast(message), 100);
};
