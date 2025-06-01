import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
    isModal: boolean;
}

const initialState: ModalState = {
    isModal: false
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModal = true;
        },
        closeModal: (state) => {
            state.isModal = false;
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions;

const modalReducer = modalSlice.reducer;

export default modalReducer;