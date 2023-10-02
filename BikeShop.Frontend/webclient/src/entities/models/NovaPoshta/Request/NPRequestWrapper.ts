export interface NPRequestWrapper<T> {
    apiKey: string;
    modelName: string;
    calledMethod: string;
    methodProperties: T;
}