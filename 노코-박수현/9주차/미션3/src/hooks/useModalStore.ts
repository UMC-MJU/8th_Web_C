import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

interface ModalActions {
    openModal: () => void;
    closeModal: () => void;
}

interface ModalState {
    isModal: boolean;

    actions: ModalActions;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useModalStore = create<ModalState>()(immer((set, _) => ({
    isModal: false,
    actions: {
        openModal: (): void => {
            set((state) => {
                state.isModal = true;
            })
        },
        closeModal: (): void => {
            set((state) => {
                state.isModal = false;
            })
        },
    }
})));

export const useModalInfo = () => useModalStore(useShallow((state) => ({
    isModal: state.isModal,
})));

export const useModalActions = () => useModalStore((state) => state.actions);