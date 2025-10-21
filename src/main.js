import './assets/main.css';

import { createApp } from 'vue';
import { createGtm } from '@gtm-support/vue-gtm'; // GTMプラグインインポート
import App from './App.vue';
import router from './router'; // 作成したルーターインスタンスをインポート

const app = createApp(App);
app.use(router); // Vue アプリケーションにルーターをインストール（使用可能にする）

/**
 * VueGTMを用いたPageViewトラッキング送信
 */

if (import.meta.env.PROD) {
    app.use(
        createGtm({
            id: "import.meta.env.VITE_GTM_ID",    // GTM_IDをいれる
            defer: false,         // ページの読み込みを高速化（トラッキング精度低下の可能性あり）
            debug: false,         // コンソールログのデバッグを表示するかどうか
            loadScript: true,     // GTMスクリプトを読み込むかどうか
            vueRouter: router,    // vueRouterと自動的に同期するインスタンスを設定
            ignoredViews: ['notFound'], // 指定したルーター名はトラッキングしない（例：404ページなど）
            trackOnNextTick: true // Vue.nextTick で trackView を呼び出すかどうか
        })
    )
};
app.mount('#app')