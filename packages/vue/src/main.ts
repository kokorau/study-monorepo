import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

export function mountVueApp(el: HTMLElement) {
  createApp(App).mount(el)
}
