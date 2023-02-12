import React from 'react';
import {Grid} from "@mui/material";
import {ProductCatalogTable, TagTreeView} from "../../../widgets";

const ProductCatalog = () => {
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <TagTreeView/>
                </Grid>
                <Grid item xs={8}>
                    <ProductCatalogTable/>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductCatalog;