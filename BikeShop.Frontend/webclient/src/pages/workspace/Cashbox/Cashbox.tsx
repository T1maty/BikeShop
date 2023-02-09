import React from 'react';
import {Grid, Paper} from "@mui/material";
import {MenuAppBar} from "../../../features/AppBar/MenuAppBar";

export const Cashbox = () => {
    return (
        <div>
            <MenuAppBar/>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper
                        sx={{
                            height: '50%',
                            width: '100%',
                            // backgroundColor: (theme) =>
                            //     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    />
                    {/*<div style={{backgroundColor: 'green'}}>*/}
                    {/*    hello*/}
                    {/*</div>*/}
                    <Paper
                        sx={{
                            height: '50%',
                            width: '100%',
                            // backgroundColor: (theme) =>
                            //     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    />
                    {/*<div style={{backgroundColor: 'blue'}}>*/}
                    {/*    hello*/}
                    {/*</div>*/}
                </Grid>
                <Grid item xs={8}>
                    <div style={{backgroundColor: 'yellow'}}>
                        hello
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
