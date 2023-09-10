export interface Discount {
    id: number
    createdAt: string
    updatedAt: string
    enabled: boolean
    secretString: string;
    name: string;
    description: string;
    type: string;
    target: string;
    bindToTargetId: number;
    amount: number;
    limit: number;
    isZeroLoss: boolean;
    isPersonal: boolean;
}