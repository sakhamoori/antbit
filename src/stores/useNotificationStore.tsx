/* eslint-disable import/no-extraneous-dependencies */
import create from 'zustand';

interface NotificationStore {
  notifications: Array<{
    type: string;
    message: string;
    description?: string;
    txid?: string;
  }>;
  set: (x: any) => void;
}

const useNotificationStore = create<NotificationStore>((_set, _get) => ({
  notifications: [],
  set: (fn) => _set(fn),
}));

export default useNotificationStore;
