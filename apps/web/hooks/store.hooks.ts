import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore, RootState } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;
