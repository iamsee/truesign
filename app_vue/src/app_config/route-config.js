// import Home from './components/Home.vue'
// import Article from './components/Article.vue'
// import Demo from './components/Demo.vue'
// import DemoVuexState from './components/DemoVuexState.vue'
import {router_spa} from '../components/project/spa/router-spa'
const home = resolve => require(['../components/Home.vue'], resolve)

const tools = resolve => require(['../components/tools/tools.vue'], resolve)
const websocket = resolve => require(['../components/tools/websocket.vue'], resolve)

const effect = resolve => require(['../components/effect/effect.vue'], resolve)
const loading_canvas = resolve => require(['../components/effect/loading_canvas.vue'], resolve)
const threejs_dev = resolve => require(['../components/effect/threejs_dev.vue'], resolve)
const threejs_dev_trackball = resolve => require(['../components/effect/threejs_dev_trackball.vue'], resolve)
const word_canvas = resolve => require(['../components/effect/word_canvas.vue'], resolve)
const draw_canvas = resolve => require(['../components/effect/draw_canvas.vue'], resolve)
const canvas = resolve => require(['../components/effect/canvas.vue'], resolve)
const ball_canvas = resolve => require(['../components/effect/ball_canvas.vue'], resolve)
const ball_canvas_onedraw = resolve => require(['../components/effect/ball_canvas_onedraw.vue'], resolve)
const ball_canvas_init = resolve => require(['../components/effect/ball_canvas_init.vue'], resolve)

const routes = [

    {
        name: 'home',
        path: '/',
        meta: {
            title: 'home'
        },
        component: home
    },

    {
        name: 'tools',
        path: '/tools',
        meta: {
            title: 'tools'
        },
        component: tools,
        children: [
            {
                name: 'websocket',
                path: 'websocket',
                meta: {
                    title: 'websocket'
                },
                component: websocket
            },
        ]
    },
    {
        name: 'effect',
        path: '/effect',
        meta: {
            title: 'effect'
        },
        component: effect,

        children: [
            {
                name: 'loading_canvas',
                path: 'loading_canvas',
                meta: {
                    title: 'loading_canvas'
                },
                component: loading_canvas
            },
            {
                name: 'threejs_dev',
                path: 'threejs_dev',
                meta: {
                    title: 'threejs_dev'
                },
                component: threejs_dev
            },
            {
                name: 'threejs_dev_trackball',
                path: 'threejs_dev_trackball',
                meta: {
                    title: 'threejs_dev_trackball'
                },
                component: threejs_dev_trackball
            },
            {
                name: 'draw_canvas',
                path: 'draw_canvas',
                meta: {
                    title: 'draw_canvas'
                },
                component: draw_canvas
            },
            {
                name: 'canvas',
                path: 'canvas',
                meta: {
                    title: 'canvas'
                },
                component: canvas
            },
            {
                name: 'word_canvas',
                path: 'word_canvas',
                meta: {
                    title: 'word_canvas'
                },
                component: word_canvas
            },

            {
                name: 'ball_canvas',
                path: 'ball_canvas',
                meta: {
                    title: 'ball_canvas'
                },
                component: ball_canvas
            },
            {
                name: 'ball_canvas_onedraw',
                path: 'ball_canvas_onedraw',
                meta: {
                    title: 'ball_canvas_onedraw'
                },
                component: ball_canvas_onedraw
            },
            {
                name: 'ball_canvas_init',
                path: 'ball_canvas_init',
                meta: {
                    title: 'ball_canvas_init'
                },
                component: ball_canvas_init
            },
        ]
    },
]
export default routes
