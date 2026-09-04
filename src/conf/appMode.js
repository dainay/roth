export const APP_MODE =
    import.meta.env.VITE_APP_MODE === 'expo'
        ? 'expo'
        : 'site'
 
export const IS_SITE_MODE =
    APP_MODE === 'site'

export const IS_EXPO_MODE =
    APP_MODE === 'expo'

export const FEATURES = Object.freeze({
    buttonEVipanel: IS_SITE_MODE,
    styleTextEVipanel: IS_SITE_MODE,
    logoLink: IS_EXPO_MODE,
    modalWindow: IS_EXPO_MODE,
    reloadAfterMail: IS_EXPO_MODE,
    dialogHiger: IS_EXPO_MODE,
    
})