import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // 作成したルーターインスタンスをインポート

const app = createApp(App);
app.use(router); // Vue アプリケーションにルーターをインストール（使用可能にする）

app.mount('#app')