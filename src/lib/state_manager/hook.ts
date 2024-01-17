import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./store";

type DispatchFunction = () => AppDispatch;

export const usePlaceDispatch: DispatchFunction = useDispatch;
export const usePlaceSelector: TypedUseSelectorHook<RootState> = useSelector;
