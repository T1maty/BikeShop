// import React, {FC, Suspense} from "react";
// import {createTheme, ThemeProvider} from "@mui/material/styles";
// // import CssBaseline from "@mui/material/CssBaseline";
// import { Navigate, Route, Routes } from 'react-router-dom'
// import './styles/index.scss'
// import {SnackbarProvider} from "notistack";
// import Buttons from "../widgets/workspace/AdminMenu/ui/Buttons";
// import {PublicHeaderProvider} from './providers/HeaderProviders/PublicHeaderProvider';
// import {
//     Cashbox,
//     Catalog,
//     Home,
//     LoginPage,
//     MainPage, Order,
//     ProductCatalog, Profile,
//     RegistrationPage,
//     Service, ShopMain, ShopProductItem,
//     ShopWrapper
// } from '../pages';
// import {BikeShopPaths} from './routes/paths';
// import {OnlyWithoutAuthRoute} from './providers/RouteProviders/OnlyWithoutAuthRoute';
// import {WorkspaceHeaderProvider} from './providers/HeaderProviders/WorkspaceHeaderProvider';
// import {CheckAuthRouteProvider} from './providers/RouteProviders/CheckAuthRouteProvider';
// import {BarcodeScanerListenerProvider} from './providers/BarcodeScanerListenerProvider/BarcodeScanerListenerProvider';
// import {WorkCatalog} from '../pages/workspace/WorkCatalog';
//
// const darkTheme = createTheme({
//     palette: {
//         mode: "dark"
//     }
// });
//
// const _App: FC = () => {
//
//     return (
//         <div className={`app`}>
//             <ThemeProvider theme={darkTheme}>
//                 <SnackbarProvider maxSnack={3}>
//                     {/*<CssBaseline/>*/}
//                     <Suspense>
//                         {/*<RouterProvider router={_routes}/>*/}
//                         <Routes>
//                             <Route element={<PublicHeaderProvider />}>
//                                 <Route path={'/'} element={<Home />} />
//                                 <Route path={BikeShopPaths.WORKSPACE.HOME} element={<Home />} />
//                             </Route>
//                             <Route element={<OnlyWithoutAuthRoute />}>
//                                 <Route path={BikeShopPaths.WORKSPACE.REGISTRATION} element={<RegistrationPage />} />
//                                 <Route path={BikeShopPaths.WORKSPACE.LOGIN} element={<LoginPage />} />
//                             </Route>
//                             <Route element={<WorkspaceHeaderProvider/>}>
//                                 <Route path={BikeShopPaths.WORKSPACE.CASHBOX} element={<Cashbox />} />
//                                 <Route path={BikeShopPaths.WORKSPACE.SERVICE} element={<Service />} />
//                             </Route>
//                             <Route element={<CheckAuthRouteProvider />}>
//                                 <Route element={<BarcodeScanerListenerProvider />}>
//                                     <Route element={<BarcodeScanerListenerProvider />}>
//                                         <Route path={BikeShopPaths.WORKSPACE.MAIN_PAGE} element={<MainPage />} />
//                                         <Route path={BikeShopPaths.WORKSPACE.PRODUCT_CATALOG} element={<ProductCatalog />} />
//                                         <Route path={BikeShopPaths.WORKSPACE.WORK_CATALOG} element={<WorkCatalog />} />
//                                     </Route>
//                                 </Route>
//                             </Route>
//                             <Route path={BikeShopPaths.SHOP.HOME} element={<ShopMain />} />
//                             <Route element={<ShopWrapper />}>
//                                 <Route path={BikeShopPaths.SHOP.CATALOG} element={<Catalog />} />
//                                 <Route path={BikeShopPaths.SHOP.PRODUCT} element={<ShopProductItem />} />
//                                 <Route path={BikeShopPaths.SHOP.PROFILE} element={<Profile />} />
//                                 <Route path={BikeShopPaths.SHOP.ORDER} element={<Order />} />
//                             </Route>
//                         </Routes>
//                     </Suspense>
//                 </SnackbarProvider>
//             </ThemeProvider>
//             <Buttons off={false}/>
//         </div>
//     );
// };
//
// export default _App;

export default () => {}