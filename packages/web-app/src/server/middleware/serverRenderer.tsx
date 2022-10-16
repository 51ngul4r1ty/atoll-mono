// externals
import * as React from "react";
import * as express from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Store } from "redux";
import { Provider } from "react-redux";

// libraries
import {
    FeatureTogglesState,
    StateTree,
    buildFeatureTogglesList,
    getAssetPortOverride,
    initConfig,
    remapAssetPath
} from "@atoll/shared";

// components
import Html from "../components/HTML";

// utils
import { buildRoutesForServer } from "../../common/routeBuilder";

// consts/enums
import { FEATURE_TOGGLE_LIST } from "../api/data/featureToggles";

type Locale = "en_US" | "de_DE" | "default";

const mapAcceptLanguageToLocale = (acceptLanguage: string): Locale => {
    // something like: en-US,en;q=0.9
    let language = "";
    console.log("language: " + acceptLanguage);
    if (acceptLanguage) {
        const splitLang = acceptLanguage.split(",");
        if (splitLang.length) {
            language = splitLang[0];
        } else {
            language = acceptLanguage;
        }
    }
    switch (language) {
        case "en":
        case "en-US":
            return "en_US";
        case "de":
        case "de-DE":
            return "de_DE";
        default:
            return "default";
    }
};

const serverRenderer: any = () => (req: express.Request & { store: Store }, res: express.Response, next: express.NextFunction) => {
    const nginxSourceDomain = req.headers["x-source-domain"] as string | undefined;
    const nginxSourcePort = req.headers["x-source-port"] as string | undefined;
    let hostAndPort = req.headers.host; // e.g. "192.168.9.1:8500"
    if (nginxSourceDomain && nginxSourcePort) {
        hostAndPort = `${nginxSourceDomain}:${nginxSourcePort}`;
    } else if (nginxSourceDomain) {
        hostAndPort = nginxSourceDomain;
    } else {
        const port = getAssetPortOverride();
        const lastIdx = hostAndPort.lastIndexOf(":");
        if (port) {
            const hostWithoutPort = lastIdx < 0 ? hostAndPort : hostAndPort.substring(0, lastIdx);
            hostAndPort = `${hostWithoutPort}:${port}`;
        }
    }
    initConfig({ getDocumentLocHref: () => `http://${hostAndPort}${req.url}` });
    //    const apiBaseUrl = getApiBaseUrl();
    if (req.path.startsWith("/api/")) {
        next();
    } else {
        const content = renderToString(
            <Provider store={res.locals.store}>
                <StaticRouter location={req.url} context={{}}>
                    {buildRoutesForServer()}
                </StaticRouter>
            </Provider>
        );

        const oldState = res.locals.store.getState();
        const locale = mapAcceptLanguageToLocale(req.headers["accept-language"]); // res.locals.language;
        console.log("locale: " + locale);
        const featureToggles: FeatureTogglesState = {
            toggles: FEATURE_TOGGLE_LIST
        };
        const newApp = { ...oldState.app, locale };
        const newState: StateTree = { ...oldState, app: newApp, featureToggles };
        const state = JSON.stringify(newState);

        const sharedBundleCss = res.locals.assetPath("shared-bundle.css");
        const sharedBundleCssPath = remapAssetPath(sharedBundleCss);
        const bundleJsAssetPath = res.locals.assetPath("bundle.js");
        const bundleJsPath = remapAssetPath(bundleJsAssetPath);
        const idx = bundleJsPath.lastIndexOf("/");
        const basePath = idx < 0 ? bundleJsPath : bundleJsPath.substr(0, idx);
        const favIconPath = `${basePath}/favicon.png`;

        const bundleCssAssetPath = res.locals.assetPath("bundle.css");
        const remappedCssAssetPath = remapAssetPath(bundleCssAssetPath);
        const vendorCssAssetPath = res.locals.assetPath("vendor.css");
        const remappedVendorCssAssetPath = remapAssetPath(vendorCssAssetPath);

        const vendorJsAssetPath = res.locals.assetPath("vendor.js");
        const remappedVendorJsAssetPath = remapAssetPath(vendorJsAssetPath);

        return res.send(
            "<!doctype html>" +
                renderToString(
                    <Html
                        css={[sharedBundleCssPath, remappedCssAssetPath, remappedVendorCssAssetPath]}
                        scripts={[bundleJsPath, remappedVendorJsAssetPath]}
                        favIcon={favIconPath}
                        state={state}
                        language={locale}
                        toggles={buildFeatureTogglesList(featureToggles?.toggles)}
                    >
                        {content}
                    </Html>
                )
        );
    }
};

export default serverRenderer;
