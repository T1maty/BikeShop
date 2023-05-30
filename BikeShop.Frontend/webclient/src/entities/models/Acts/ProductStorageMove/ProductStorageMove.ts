export interface ProductStorageMove {
    id: number;
    createdAt: string;
    updatedAt: string;
    enabled: boolean;
    movingFromSkladId: number;
    movingToSkladId: number;
    description: string;
    status: string;
    userCreated: string;
    userUpdated: string;
}