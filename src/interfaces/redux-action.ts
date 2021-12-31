export interface ReduxAction<T, U = any> {
    type: T,
    payload?: U
}