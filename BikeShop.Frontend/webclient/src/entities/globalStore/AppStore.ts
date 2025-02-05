import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import * as signalR from '@microsoft/signalr';
import {LocalStorage} from "./LocalStorage";

interface p {
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    isWarningProcessed: boolean
    setIsWarningProcessed: (v: boolean) => void
    warning: null | string

    AgentHubConnection: signalR.HubConnection | null
    AgentHubStartConnection: (s: () => void, f: () => void) => void
    agentTerminalConfirm: (data: { Id: string, Amount: number, AgentId: number }) => void
    setAgentTerminalConfirm: (v: (data: { Id: string, Amount: number, AgentId: number }) => void) => void
    agentTerminalCancel: (data: { Id: string, Amount: number, AgentId: number }) => void
    setAgentTerminalCancel: (v: (data: { Id: string, Amount: number, AgentId: number }) => void) => void
    createAgentHubConnection: () => void
    AgentPrintBill: (DataId: number, Copies: number) => void
    AgentPrintProductSticker: (DataId: number, Copies: number) => void
    AgentPrintEncashment: (DataId: number, Copies: number) => void
    AgentPrintServiceSticker: (DataId: number, Copies: number) => void
    AgentPrintServiceIncomeAct: (DataId: number, Copies: number) => void
    AgentPrintServiceOutcomeSmallAct: (DataId: number, Copies: number) => void
    AgentPrintServiceOutcomeFullAct: (DataId: number, Copies: number) => void

}

export const useApp = create<p>()(persist(devtools(immer((set, get) => ({
    AgentHubStartConnection: (s, f) => {
        get().AgentHubConnection?.start().then(() => s()).catch(() => f());
    },

    //AgentPrint
    AgentPrintBill: (id, copies) => {
        get().AgentHubConnection?.send("PrintBill", {
            AgentId: 1,
            DataId: id,
            Copies: copies,
            CurrencyId: LocalStorage.currency.id()
        });
    },
    AgentPrintProductSticker: (id, copies) => {
        get().AgentHubConnection?.send("PrintProductSticker", {
            AgentId: 1,
            DataId: id,
            Copies: copies,
            CurrencyId: LocalStorage.currency.id()
        });
    },
    AgentPrintServiceIncomeAct: (id, copies) => {
        get().AgentHubConnection?.send("PrintServiceIncomeAct", {
            AgentId: 1,
            DataId: id,
            Copies: copies,
            CurrencyId: LocalStorage.currency.id()
        });
    },
    AgentPrintServiceOutcomeSmallAct: (id, copies) => {
        get().AgentHubConnection?.send("PrintServiceOutcomeShort", {
            AgentId: 1,
            DataId: id,
            Copies: copies,
            CurrencyId: LocalStorage.currency.id()
        });
    },
    AgentPrintServiceOutcomeFullAct: (id, copies) => {
        get().AgentHubConnection?.send("PrintServiceOutcomeFull", {
            AgentId: 1,
            DataId: id,
            Copies: copies,
            CurrencyId: LocalStorage.currency.id()
        });
    },
    AgentPrintServiceSticker: (id, copies) => {
        get().AgentHubConnection?.send("PrintServiceSticker", {
            AgentId: 1,
            DataId: id,
            Copies: copies,
            CurrencyId: LocalStorage.currency.id()
        });
    },
    AgentPrintEncashment: (id, copies) => {
        get().AgentHubConnection?.send("PrintEncashment", {
            AgentId: 1,
            DataId: id,
            Copies: copies,
            CurrencyId: LocalStorage.currency.id()
        });
    },
    //

    setAgentTerminalCancel: (v) => set({agentTerminalCancel: v}),
    setAgentTerminalConfirm: (v) => set({agentTerminalConfirm: v}),
    agentTerminalCancel: () => {
    },
    agentTerminalConfirm: () => {
    },
    createAgentHubConnection: () => {
        const environment = process.env.NODE_ENV;

        const API_URL_DEVELOPMENT = "https://bikeshop.1gb.ua/";
        const API_URL_PRODUCTION = "https://api.bikelove.com.ua/";
        let connection = new signalR.HubConnectionBuilder()
            .withUrl((environment === "production" ? API_URL_PRODUCTION : API_URL_DEVELOPMENT) + "agenthub")
            .build();

        connection.on('ConfirmPay', (data: { Id: string, Amount: number, AgentId: number }) => {
            get().agentTerminalConfirm(data)
        })
        connection.on('CancelPay', (data: { Id: string, Amount: number, AgentId: number }) => {
            get().agentTerminalCancel(data)
        })
        set({AgentHubConnection: connection})
    },
    AgentHubConnection: null,
    warning: null,
    isWarningProcessed: true,
    setIsWarningProcessed: (v) => set({isWarningProcessed: v}),
    isLoading: false,
    setIsLoading: (value) => set({
        isLoading: value
    }),
}))), {
    name: "appStore",
    version: 1
}));