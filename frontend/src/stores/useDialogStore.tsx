import { Draft, produce } from 'immer';
import { create } from 'zustand';

import { DialogOptions } from '@/components/dialog/BaseDialog';

type DialogStoreType = {
  awaitingPromise: {
    resolve?: () => void;
    reject?: () => void;
  };
  open: boolean;
  state: DialogOptions;
  dialog: (options: Partial<DialogOptions>) => Promise<void>;
  handleClose: () => void;
  handleSubmit: () => void;
};

const useDialogStore = create<DialogStoreType>(set => ({
  awaitingPromise: {},
  open: false,
  state: {
    title: 'Title',
    description: 'Description',
    submitText: 'Yes',
    variant: 'warning',
    catchOnCancel: false,
  },
  dialog: options => {
    set(
      produce((state: Draft<DialogStoreType>) => {
        state.open = true;
        state.state = { ...state.state, ...options };
      }),
    );
    return new Promise<void>((resolve, reject) => {
      set(
        produce((state: Draft<DialogStoreType>) => {
          state.awaitingPromise = { resolve, reject };
        }),
      );
    });
  },
  handleClose: () => {
    set(
      produce((state: Draft<DialogStoreType>) => {
        state.state.catchOnCancel && state.awaitingPromise?.reject?.();
        state.open = false;
      }),
    );
  },
  handleSubmit: () => {
    set(
      produce((state: Draft<DialogStoreType>) => {
        state.awaitingPromise?.resolve?.();
        state.open = false;
      }),
    );
  },
}));

export default useDialogStore;
