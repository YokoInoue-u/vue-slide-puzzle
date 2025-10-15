import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SlidePuzzle from '../views/SlidePuzzle.vue';

const routes = [
    {
        path: '/',          // URL のパス
        name: 'Home',       // ルートの名前（ナビゲーションなどで便利）
        component: Home,     // このパスで表示するコンポーネント
        meta: { title: 'TOP | うちのパズルサイト' },
    },
    {
        path: '/slide_puzzle',
        name: 'SlidePuzzle',
        component: SlidePuzzle,
        meta: { title: 'スライドパズル | うちのパズルサイト' },
    }
];

const router = createRouter({
    history: createWebHistory(), // HTML5 History API を使用して、URL をハッシュモードなしで綺麗に表示
    routes                       // 上で定義したルートの配列
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = 'パズルサイト';
    }
    next();
});

export default router; // 他のファイルで使えるようにエクスポート