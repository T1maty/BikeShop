import {OutcomeAct} from "./OutcomeAct";
import {OutcomeActProduct} from "./OutcomeActProduct";

export interface OutcomeActWithProducts {
    outcomeAct: OutcomeAct;
    products: OutcomeActProduct[]
}