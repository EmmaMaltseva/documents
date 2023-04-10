import React from "react";
    import { BrowserRouter, Route, Routes } from "react-router-dom";
    import { IndividualsView } from "../views/individuals-view/IndividualsView";
    import { KontragentsView } from "../views/kontragents-view/KontragentsView";
    import { OrganizationsView } from "../views/organizations-view/OrganizationsView";
    import { ProductsView } from "../views/products-view/ProductsView";
    import { EdizmsView } from "../views/edizms-view/EdizmsView";
    import { ProxyListView } from "../views/proxy-view/proxy-list-view/ProxyListView";
    import { ProxyListNakView } from "../views/proxy-nak-view/proxi-nak-list-view/ProxyNakListView";
    import { ProxyView } from "../views/proxy-view/proxy-view/ProxyView";
    import { ProxyNakView } from "../views/proxy-nak-view/proxy-nak-view/ProxyNakView.jsx";
    import { ROUTE_PATHS } from "./paths";
    import { Navigation } from "../components/navigation/Navigation";

    export const RouterIndex = (props) => {
        return (
            <BrowserRouter>
                <Navigation>
                <Routes>
                    <Route
                        path={'/'}
                        element={<ProxyListView />}
                    />
                    <Route
                        path={ROUTE_PATHS.products}
                        element={<ProductsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.edizms}
                        element={<EdizmsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.individuals}
                        element={<IndividualsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.kontragents}
                        element={<KontragentsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.organizations}
                        element={<OrganizationsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.proxy.list}
                        element={<ProxyListView />}
                    />
                    <Route
                        path={ROUTE_PATHS.proxy.listNak}
                        element={<ProxyListNakView />}
                    />
                    <Route
                        path={ROUTE_PATHS.proxy.proxy}
                        element={<ProxyView />}
                    />

                    <Route
                        path={ROUTE_PATHS.proxy.proxyNak}
                        element={<ProxyNakView />}
                    />
                </Routes>
                </Navigation>
            </BrowserRouter>
        )
    }
