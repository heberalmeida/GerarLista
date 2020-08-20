import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import Ads from 'vue-google-adsense'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueClipboard)
Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

new Vue({
  render: h => h(App)
}).$mount('#app')
