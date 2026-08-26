"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/logout/route";
exports.ids = ["app/api/logout/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Flogout%2Froute&page=%2Fapi%2Flogout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogout%2Froute.js&appDir=C%3A%5Claragon%5Cwww%5Clogin%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Clogin&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Flogout%2Froute&page=%2Fapi%2Flogout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogout%2Froute.js&appDir=C%3A%5Claragon%5Cwww%5Clogin%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Clogin&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_laragon_www_login_app_api_logout_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/logout/route.js */ \"(rsc)/./app/api/logout/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/logout/route\",\n        pathname: \"/api/logout\",\n        filename: \"route\",\n        bundlePath: \"app/api/logout/route\"\n    },\n    resolvedPagePath: \"C:\\\\laragon\\\\www\\\\login\\\\app\\\\api\\\\logout\\\\route.js\",\n    nextConfigOutput,\n    userland: C_laragon_www_login_app_api_logout_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/logout/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZsb2dvdXQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmxvZ291dCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmxvZ291dCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDbGFyYWdvbiU1Q3d3dyU1Q2xvZ2luJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDbGFyYWdvbiU1Q3d3dyU1Q2xvZ2luJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNHO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbG9naW4tYmlvZGF0YS1uZXh0anMvPzU3NDAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcbGFyYWdvblxcXFx3d3dcXFxcbG9naW5cXFxcYXBwXFxcXGFwaVxcXFxsb2dvdXRcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2xvZ291dC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2xvZ291dFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbG9nb3V0L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcbGFyYWdvblxcXFx3d3dcXFxcbG9naW5cXFxcYXBwXFxcXGFwaVxcXFxsb2dvdXRcXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2xvZ291dC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Flogout%2Froute&page=%2Fapi%2Flogout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogout%2Froute.js&appDir=C%3A%5Claragon%5Cwww%5Clogin%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Clogin&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/logout/route.js":
/*!*********************************!*\
  !*** ./app/api/logout/route.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/session */ \"(rsc)/./lib/session.js\");\n\n\nasync function POST(request) {\n    const response = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL(\"/\", request.url));\n    response.cookies.set(_lib_session__WEBPACK_IMPORTED_MODULE_1__.SESSION_COOKIE_NAME, \"\", {\n        maxAge: 0,\n        path: \"/\"\n    });\n    return response;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xvZ291dC9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMkM7QUFDUztBQUU3QyxlQUFlRSxLQUFLQyxPQUFPO0lBQ2hDLE1BQU1DLFdBQVdKLHFEQUFZQSxDQUFDSyxRQUFRLENBQUMsSUFBSUMsSUFBSSxLQUFLSCxRQUFRSSxHQUFHO0lBQy9ESCxTQUFTSSxPQUFPLENBQUNDLEdBQUcsQ0FBQ1IsNkRBQW1CQSxFQUFFLElBQUk7UUFBRVMsUUFBUTtRQUFHQyxNQUFNO0lBQUk7SUFDckUsT0FBT1A7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL2xvZ2luLWJpb2RhdGEtbmV4dGpzLy4vYXBwL2FwaS9sb2dvdXQvcm91dGUuanM/NzI1ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IFNFU1NJT05fQ09PS0lFX05BTUUgfSBmcm9tIFwiQC9saWIvc2Vzc2lvblwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0KSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gTmV4dFJlc3BvbnNlLnJlZGlyZWN0KG5ldyBVUkwoXCIvXCIsIHJlcXVlc3QudXJsKSk7XG4gIHJlc3BvbnNlLmNvb2tpZXMuc2V0KFNFU1NJT05fQ09PS0lFX05BTUUsIFwiXCIsIHsgbWF4QWdlOiAwLCBwYXRoOiBcIi9cIiB9KTtcbiAgcmV0dXJuIHJlc3BvbnNlO1xufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlNFU1NJT05fQ09PS0lFX05BTUUiLCJQT1NUIiwicmVxdWVzdCIsInJlc3BvbnNlIiwicmVkaXJlY3QiLCJVUkwiLCJ1cmwiLCJjb29raWVzIiwic2V0IiwibWF4QWdlIiwicGF0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/logout/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/session.js":
/*!************************!*\
  !*** ./lib/session.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SESSION_COOKIE_NAME: () => (/* binding */ SESSION_COOKIE_NAME),\n/* harmony export */   createSessionCookie: () => (/* binding */ createSessionCookie),\n/* harmony export */   getSessionUser: () => (/* binding */ getSessionUser)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nconst SECRET = process.env.JWT_SECRET || \"ganti-secret-ini\";\nconst SESSION_COOKIE_NAME = \"session\";\nfunction createSessionCookie(user) {\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({\n        id: user.id,\n        username: user.username,\n        email: user.email\n    }, SECRET, {\n        expiresIn: \"7d\"\n    });\n    return {\n        name: SESSION_COOKIE_NAME,\n        value: token,\n        options: {\n            httpOnly: true,\n            secure: \"development\" === \"production\",\n            sameSite: \"lax\",\n            path: \"/\",\n            maxAge: 60 * 60 * 24 * 7\n        }\n    };\n}\nfunction getSessionUser() {\n    const token = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)().get(SESSION_COOKIE_NAME)?.value;\n    if (!token) return null;\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, SECRET);\n    } catch  {\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc2Vzc2lvbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBK0I7QUFDUTtBQUV2QyxNQUFNRSxTQUFTQyxRQUFRQyxHQUFHLENBQUNDLFVBQVUsSUFBSTtBQUNsQyxNQUFNQyxzQkFBc0IsVUFBVTtBQUV0QyxTQUFTQyxvQkFBb0JDLElBQUk7SUFDdEMsTUFBTUMsUUFBUVQsd0RBQVEsQ0FDcEI7UUFBRVcsSUFBSUgsS0FBS0csRUFBRTtRQUFFQyxVQUFVSixLQUFLSSxRQUFRO1FBQUVDLE9BQU9MLEtBQUtLLEtBQUs7SUFBQyxHQUMxRFgsUUFDQTtRQUFFWSxXQUFXO0lBQUs7SUFHcEIsT0FBTztRQUNMQyxNQUFNVDtRQUNOVSxPQUFPUDtRQUNQUSxTQUFTO1lBQ1BDLFVBQVU7WUFDVkMsUUFBUWhCLGtCQUF5QjtZQUNqQ2lCLFVBQVU7WUFDVkMsTUFBTTtZQUNOQyxRQUFRLEtBQUssS0FBSyxLQUFLO1FBQ3pCO0lBQ0Y7QUFDRjtBQUVPLFNBQVNDO0lBQ2QsTUFBTWQsUUFBUVIscURBQU9BLEdBQUd1QixHQUFHLENBQUNsQixzQkFBc0JVO0lBQ2xELElBQUksQ0FBQ1AsT0FBTyxPQUFPO0lBRW5CLElBQUk7UUFDRixPQUFPVCwwREFBVSxDQUFDUyxPQUFPUDtJQUMzQixFQUFFLE9BQU07UUFDTixPQUFPO0lBQ1Q7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2xvZ2luLWJpb2RhdGEtbmV4dGpzLy4vbGliL3Nlc3Npb24uanM/ZmY5YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCB7IGNvb2tpZXMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5cbmNvbnN0IFNFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgXCJnYW50aS1zZWNyZXQtaW5pXCI7XG5leHBvcnQgY29uc3QgU0VTU0lPTl9DT09LSUVfTkFNRSA9IFwic2Vzc2lvblwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2Vzc2lvbkNvb2tpZSh1c2VyKSB7XG4gIGNvbnN0IHRva2VuID0gand0LnNpZ24oXG4gICAgeyBpZDogdXNlci5pZCwgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsIGVtYWlsOiB1c2VyLmVtYWlsIH0sXG4gICAgU0VDUkVULFxuICAgIHsgZXhwaXJlc0luOiBcIjdkXCIgfVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogU0VTU0lPTl9DT09LSUVfTkFNRSxcbiAgICB2YWx1ZTogdG9rZW4sXG4gICAgb3B0aW9uczoge1xuICAgICAgaHR0cE9ubHk6IHRydWUsXG4gICAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIixcbiAgICAgIHNhbWVTaXRlOiBcImxheFwiLFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgICBtYXhBZ2U6IDYwICogNjAgKiAyNCAqIDcsXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlc3Npb25Vc2VyKCkge1xuICBjb25zdCB0b2tlbiA9IGNvb2tpZXMoKS5nZXQoU0VTU0lPTl9DT09LSUVfTkFNRSk/LnZhbHVlO1xuICBpZiAoIXRva2VuKSByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIHJldHVybiBqd3QudmVyaWZ5KHRva2VuLCBTRUNSRVQpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImp3dCIsImNvb2tpZXMiLCJTRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsIlNFU1NJT05fQ09PS0lFX05BTUUiLCJjcmVhdGVTZXNzaW9uQ29va2llIiwidXNlciIsInRva2VuIiwic2lnbiIsImlkIiwidXNlcm5hbWUiLCJlbWFpbCIsImV4cGlyZXNJbiIsIm5hbWUiLCJ2YWx1ZSIsIm9wdGlvbnMiLCJodHRwT25seSIsInNlY3VyZSIsInNhbWVTaXRlIiwicGF0aCIsIm1heEFnZSIsImdldFNlc3Npb25Vc2VyIiwiZ2V0IiwidmVyaWZ5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/session.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Flogout%2Froute&page=%2Fapi%2Flogout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogout%2Froute.js&appDir=C%3A%5Claragon%5Cwww%5Clogin%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Clogin&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();