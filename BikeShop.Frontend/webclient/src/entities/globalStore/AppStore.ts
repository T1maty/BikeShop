import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import * as signalR from '@microsoft/signalr';

interface p {
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    isWarningProcessed: boolean
    setIsWarningProcessed: (v: boolean) => void
    warning: null | string

    AgentHubConnection: signalR.HubConnection | null
    agentTerminalConfirm: (data: { Id: string, Amount: number, AgentId: number }) => void
    setAgentTerminalConfirm: (v: (data: { Id: string, Amount: number, AgentId: number }) => void) => void
    agentTerminalCancel: (data: { Id: string, Amount: number, AgentId: number }) => void
    setAgentTerminalCancel: (v: (data: { Id: string, Amount: number, AgentId: number }) => void) => void
    createAgentHubConnection: () => void
}

export const useApp = create<p>()(persist(devtools(immer((set, get) => ({
    setAgentTerminalCancel: (v) => set({agentTerminalCancel: v}),
    setAgentTerminalConfirm: (v) => set({agentTerminalConfirm: v}),
    agentTerminalCancel: () => {
    },
    agentTerminalConfirm: () => {
    },
    createAgentHubConnection: () => {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5007/agenthub")
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