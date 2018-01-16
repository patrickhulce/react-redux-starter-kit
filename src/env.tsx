/* tslint:disable */
export const IS_DEV: boolean = !!(window as any).__DEV__
export const IS_PROD: boolean = !!(window as any).__PROD__
export const INITIAL_STATE: Object|undefined = (window as any).__INITIAL_STATE__
