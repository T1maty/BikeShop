import React, {ReactElement, useEffect} from 'react';
import {useApp} from "../../../entities/globalStore/AppStore";
import {$api} from "../../../shared";
import * as signalR from '@microsoft/signalr';

const HttpProvider = (p: { children: ReactElement }) => {

    const setIsLoading = useApp(n => n.setIsLoading)
    const isLoading = useApp(n => n.isLoading)
    const AgentHubConnection = useApp(n => n.AgentHubConnection)
    const createAgentHubConnection = useApp(n => n.createAgentHubConnection)
    const AgentHubStartConnection = useApp(n => n.AgentHubStartConnection)

    useEffect(() => console.log("Loading: ", isLoading), [isLoading])
    useEffect(() => {
        if (AgentHubConnection === null || AgentHubConnection.state === undefined) {
            console.log("Creating new AgentHub connection")
            createAgentHubConnection()
            console.log("Connection created", AgentHubConnection)
        } else {
            console.log(AgentHubConnection.state)
            if (AgentHubConnection.state === signalR.HubConnectionState.Disconnected) {
                console.log("Starting connection")
                AgentHubStartConnection(() => {
                }, () => {
                })
            }
        }
    }, [AgentHubConnection])

    $api.interceptors.request.use(function (config) {
        setIsLoading(true)
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

// Add a response interceptor
    $api.interceptors.response.use(function (response) {
        setIsLoading(false)
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        setIsLoading(false);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });

    return p.children;
};

export default HttpProvider;