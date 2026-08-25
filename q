[1mdiff --git a/src/App.css b/src/App.css[m
[1mindex 0b92462..6426fff 100644[m
[1m--- a/src/App.css[m
[1m+++ b/src/App.css[m
[36m@@ -37,3 +37,28 @@[m
     width: min(90%, 360px);[m
   }[m
 }[m
[32m+[m
[32m+[m[32m.app-error {[m
[32m+[m[32m  min-height: 100vh;[m
[32m+[m[32m  display: grid;[m
[32m+[m[32m  place-items: center;[m
[32m+[m[32m  padding: 24px;[m
[32m+[m[32m  background: #f4f4f4;[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.app-error__card {[m
[32m+[m[32m  max-width: 520px;[m
[32m+[m[32m  padding: 32px;[m
[32m+[m[32m  background: #fff;[m
[32m+[m[32m  box-shadow: 0 12px 40px rgb(0 0 0 / 12%);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.app-error__card button {[m
[32m+[m[32m  margin-top: 16px;[m
[32m+[m[32m  padding: 10px 20px;[m
[32m+[m[32m  border: 0;[m
[32m+[m[32m  background: #111;[m
[32m+[m[32m  color: #fff;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m}[m
[1mdiff --git a/src/ErrorBoundary.jsx b/src/ErrorBoundary.jsx[m
[1mnew file mode 100644[m
[1mindex 0000000..4632b35[m
[1m--- /dev/null[m
[1m+++ b/src/ErrorBoundary.jsx[m
[36m@@ -0,0 +1,31 @@[m
[32m+[m[32mimport { Component } from 'react'[m
[32m+[m
[32m+[m[32mexport default class ErrorBoundary extends Component {[m
[32m+[m[32m    state = { hasError: false }[m
[32m+[m
[32m+[m[32m    static getDerivedStateFromError() {[m
[32m+[m[32m        return { hasError: true }[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    componentDidCatch(error) {[m
[32m+[m[32m        console.error('[Application] Erreur inattendue :', error)[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    render() {[m
[32m+[m[32m        if (this.state.hasError) {[m
[32m+[m[32m            return ([m
[32m+[m[32m                <main className="app-error" role="alert">[m
[32m+[m[32m                    <div className="app-error__card">[m
[32m+[m[32m                        <h1>Impossible d’afficher le configurateur</h1>[m
[32m+[m[32m                        <p>Une erreur inattendue est survenue.</p>[m
[32m+[m[32m                        <button type="button" onClick={() => window.location.reload()}>[m
[32m+[m[32m                            Réessayer[m
[32m+[m[32m                        </button>[m
[32m+[m[32m                    </div>[m
[32m+[m[32m                </main>[m
[32m+[m[32m            )[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        return this.props.children[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[1mdiff --git a/src/api/api.js b/src/api/api.js[m
[1mindex cccbe55..c15fffd 100644[m
[1m--- a/src/api/api.js[m
[1m+++ b/src/api/api.js[m
[36m@@ -78,6 +78,18 @@[m [mexport async function getConfiguratorDatabyAPI() {[m
         )[m
     }[m
 [m
[32m+[m[32m    const collectionsWithInvalidItems = requiredCollections.filter([m
[32m+[m[32m        (key) => data[key].some([m
[32m+[m[32m            (item) => !item || typeof item !== 'object' || Array.isArray(item)[m
[32m+[m[32m        )[m
[32m+[m[32m    )[m
[32m+[m
[32m+[m[32m    if (collectionsWithInvalidItems.length > 0) {[m
[32m+[m[32m        throw new Error([m
[32m+[m[32m            `Produits du configurateur invalides : ${collectionsWithInvalidItems.join(', ')}`[m
[32m+[m[32m        )[m
[32m+[m[32m    }[m
[32m+[m
     return data[m
 }[m
 [m
[36m@@ -95,10 +107,44 @@[m [mexport async function sendConfiguratorDatabyAPI(payload) {[m
         'Impossible d’envoyer la configuration'[m
     )[m
 [m
[31m-    if (!data?.img || !data?.pdf || !data?.products) {[m
[32m+[m[32m    const hasValidResultUrls =[m
[32m+[m[32m        typeof data?.img === 'string' &&[m
[32m+[m[32m        data.img.trim() &&[m
[32m+[m[32m        typeof data?.pdf === 'string' &&[m
[32m+[m[32m        data.pdf.trim()[m
[32m+[m
[32m+[m[32m    if ([m
[32m+[m[32m        !hasValidResultUrls ||[m
[32m+[m[32m        !data?.products ||[m
[32m+[m[32m        typeof data.products !== 'object' ||[m
[32m+[m[32m        Array.isArray(data.products)[m
[32m+[m[32m    ) {[m
         throw new Error('La réponse de visualisation est incomplète')[m
     }[m
 [m
[32m+[m[32m    const productCollections = [[m
[32m+[m[32m        'parois',[m
[32m+[m[32m        'receveur',[m
[32m+[m[32m        'profiles',[m
[32m+[m[32m        'niches',[m
[32m+[m[32m        'vipanels',[m
[32m+[m[32m    ][m
[32m+[m
[32m+[m[32m    const invalidProductCollections = productCollections.filter((key) => {[m
[32m+[m[32m        const products = data.products[key][m
[32m+[m
[32m+[m[32m        return products !== undefined && ([m
[32m+[m[32m            !Array.isArray(products) ||[m
[32m+[m[32m            products.some((product) => !product || typeof product !== 'object')[m
[32m+[m[32m        )[m
[32m+[m[32m    })[m
[32m+[m
[32m+[m[32m    if (invalidProductCollections.length > 0) {[m
[32m+[m[32m        throw new Error([m
[32m+[m[32m            `Liste de produits invalide : ${invalidProductCollections.join(', ')}`[m
[32m+[m[32m        )[m
[32m+[m[32m    }[m
[32m+[m
     return data[m
 }[m
 [m
[1mdiff --git a/src/api/formatPayload.js b/src/api/formatPayload.js[m
[1mindex a40eca1..d42bebf 100644[m
[1m--- a/src/api/formatPayload.js[m
[1m+++ b/src/api/formatPayload.js[m
[36m@@ -6,7 +6,7 @@[m [mconst DEFAULT_RECEVEUR_FINITION = 'Soft White'[m
 const DEFAULT_VIPANEL_LEFT = 'Z2'[m
 const DEFAULT_VIPANEL_RIGHT = 'X4'[m
 [m
[31m-const findBy = (items, key, value) =>[m
[32m+[m[32mconst findBy = (items = [], key, value) =>[m
     items.find((item) => item?.[key] === value) ?? items[0] ?? null[m
 [m
 [m
[36m@@ -51,17 +51,17 @@[m [mexport function formatSendingBody(selection) {[m
 }[m
 [m
 export function formatSelectionByDefault(data) {[m
[31m-    const defaultParoi = findBy(data.parois, 'id', DEFAULT_PAROI_ID)[m
[31m-    const defaultReceveur = data.receveurs[0] ?? null[m
[31m-    const defaultNiche = data.niches[0] ?? null[m
[31m-    const defaultProfile = data.profiles[0] ?? null[m
[32m+[m[32m    const defaultParoi = findBy(data?.parois, 'id', DEFAULT_PAROI_ID)[m
[32m+[m[32m    const defaultReceveur = data?.receveurs?.[0] ?? null[m
[32m+[m[32m    const defaultNiche = data?.niches?.[0] ?? null[m
[32m+[m[32m    const defaultProfile = data?.profiles?.[0] ?? null[m
     const defaultVipanelLeft = findBy([m
[31m-        data.vipanels,[m
[32m+[m[32m        data?.vipanels,[m
         'decor',[m
         DEFAULT_VIPANEL_LEFT[m
     )[m
     const defaultVipanelRight = findBy([m
[31m-        data.vipanels,[m
[32m+[m[32m        data?.vipanels,[m
         'decor',[m
         DEFAULT_VIPANEL_RIGHT[m
     )[m
[1mdiff --git a/src/main.jsx b/src/main.jsx[m
[1mindex e14d575..6a76f79 100644[m
[1m--- a/src/main.jsx[m
[1m+++ b/src/main.jsx[m
[36m@@ -2,9 +2,12 @@[m [mimport { StrictMode } from 'react'[m
 import { createRoot } from 'react-dom/client'[m
 import './index.css'[m
 import App from './App.jsx'[m
[32m+[m[32mimport ErrorBoundary from './ErrorBoundary.jsx'[m
 [m
 createRoot(document.getElementById('root')).render([m
   <StrictMode>[m
[31m-    <App />[m
[32m+[m[32m    <ErrorBoundary>[m
[32m+[m[32m      <App />[m
[32m+[m[32m    </ErrorBoundary>[m
   </StrictMode>[m
 )[m
[1mdiff --git a/src/models/Receveurs.jsx b/src/models/Receveurs.jsx[m
[1mindex 11228c9..7b3dc6f 100644[m
[1m--- a/src/models/Receveurs.jsx[m
[1m+++ b/src/models/Receveurs.jsx[m
[36m@@ -20,6 +20,8 @@[m [mexport default function Model(props) {[m
         }))[m
     );[m
 [m
[32m+[m[32m    const textureAsset = RECEVEUR_ASSETS[textureReceveur][m
[32m+[m
     // console.log('Model Receveurs:', sizeReceveur, receveur, textureReceveur);[m
 [m
     const receveur1000 = useMemo(() => {[m
[36m@@ -52,12 +54,14 @@[m [mexport default function Model(props) {[m
 [m
     return ([m
         <group {...props} dispose={null}>[m
[31m-            <DynamicTextureMaterial[m
[31m-                url={RECEVEUR_ASSETS[textureReceveur].img}[m
[31m-                material={materials['+RECEVEUR']}[m
[31m-                roughness={0.9}[m
[31m-                metalness={0}[m
[31m-            />[m
[32m+[m[32m            {textureAsset && ([m
[32m+[m[32m                <DynamicTextureMaterial[m
[32m+[m[32m                    url={textureAsset.img}[m
[32m+[m[32m                    material={materials['+RECEVEUR']}[m
[32m+[m[32m                    roughness={0.9}[m
[32m+[m[32m                    metalness={0}[m
[32m+[m[32m                />[m
[32m+[m[32m            )}[m
             <mesh[m
                 receiveShadow[m
                 geometry={nodes.Cube001.geometry}[m
[1mdiff --git a/src/ui/UI.jsx b/src/ui/UI.jsx[m
[1mindex d46b97c..805bebb 100644[m
[1m--- a/src/ui/UI.jsx[m
[1m+++ b/src/ui/UI.jsx[m
[36m@@ -61,6 +61,12 @@[m [mexport default function UI() {[m
     ][m
 [m
     const activeZone = vipanelZones.find((zone) => zone.id === activeVipanelZone)[m
[32m+[m[32m    const paroiFinitions = selectedParoiData?.finitionsDisponibles ?? [][m
[32m+[m[32m    const availableGlasses = selectedParoiData?.verresDisponibles ?? [][m
[32m+[m[32m    const nicheFinitions = cleanedData?.niches?.[0]?.finitionsDisponibles ?? [][m
[32m+[m[32m    const receveurFinitions = cleanedData?.receveurs?.[0]?.finitionsDisponibles ?? [][m
[32m+[m[32m    const profileFinitions = cleanedData?.profiles?.[0]?.finitionsDisponibles ?? [][m
[32m+[m[32m    const vipanels = cleanedData?.vipanels ?? [][m
 [m
 [m
     const handleReceveurChange = (item) => {[m
[36m@@ -141,7 +147,7 @@[m [mexport default function UI() {[m
             <div className={s.blockButtons}>[m
                 <h2>Finition du profilé</h2>[m
 [m
[31m-                {selectedParoiData.finitionsDisponibles[m
[32m+[m[32m                {paroiFinitions[m
                     .filter((item) => FINITION_ASSETS[item.code])[m
                     .map((item) => ([m
                     <Button[m
[36m@@ -171,7 +177,7 @@[m [mexport default function UI() {[m
                         <span>None</span>[m
                     </Button>[m
 [m
[31m-                    {cleanedData?.niches[0].finitionsDisponibles[m
[32m+[m[32m                    {nicheFinitions[m
                         .filter((item) => NICHE_FINITION_ASSETS[item])[m
                         .map((item) => ([m
                             <Button[m
[36m@@ -191,7 +197,7 @@[m [mexport default function UI() {[m
 [m
             <div className={s.blockButtons}>[m
                 <h2>Verre</h2>[m
[31m-                {selectedParoiData.verresDisponibles[m
[32m+[m[32m                {availableGlasses[m
                     .filter((item) => SERIGRAPHIE_ASSETS[item])[m
                     .map((item) => ([m
                     <Button[m
[36m@@ -211,7 +217,7 @@[m [mexport default function UI() {[m
             <div className={s.blockButtons}>[m
                 <h2>Finition du receveur</h2>[m
 [m
[31m-                {cleanedData?.receveurs[0].finitionsDisponibles[m
[32m+[m[32m                {receveurFinitions[m
                     .filter((item) => RECEVEUR_ASSETS[item])[m
                     .map((item) => ([m
                     <Button[m
[36m@@ -232,7 +238,7 @@[m [mexport default function UI() {[m
             <div className={s.blockButtons}>[m
                 <h2>Finition des profilé d'angle pour VIPANEL®</h2>[m
 [m
[31m-                {cleanedData?.profiles[0].finitionsDisponibles[m
[32m+[m[32m                {profileFinitions[m
                     .filter((item) => PROFILE_ASSETS[item])[m
                     .map((item) => ([m
                     <Button[m
[36m@@ -268,7 +274,7 @@[m [mexport default function UI() {[m
                 </div>[m
 [m
                 <div id="vipanel-panel" className={s.vipanelGrid} role="tabpanel">[m
[31m-                        {cleanedData.vipanels.map((item) => ([m
[32m+[m[32m                        {vipanels.map((item) => ([m
                             <Button[m
                                 data-decor={item.decor}[m
                                 className={`${s.vipanelButton} ${activeZone?.key && selection[activeZone.key] === item.decor ? s.vipanelButtonActive : ''}`}[m
