interface ActionData<T> {
    [key: string]: T
}
export interface ActionPersist<T> {
    type: string,
    data?: T,
    payload?: ActionData<T>
}
