export interface NPResponseWrapper<T> {
    success: boolean;
    data: T[];
    errors: any[];
    warnings: any[];
    info: any[];
    messageCodes: any[];
    errorCodes: any[];
    warningCodes: any[];
    infoCodes: any[];
}