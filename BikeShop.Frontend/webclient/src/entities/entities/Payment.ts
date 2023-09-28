export interface Payment {
    id: number;
    createdAt: string;
    updatedAt: string;
    enabled: boolean;
    target: string;
    targetId: number;
    cash: number;
    bankCount: number;
    card: number;
    personalBalance: number;
    total: number;
    currencyId: number;
    userId: string;
    clientId: string;
    shopId: number;
}