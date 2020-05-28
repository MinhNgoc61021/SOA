import Vue from 'vue'
import VueRouter from 'vue-router';
import Calculator from "@/components/Calculator";
import CalculatorJSON from "@/components/Type/CalculatorJSON";
import CalculatorXML from "@/components/Type/CalculatorXML";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      { path: '/calculator', name: 'Calculator', component: Calculator ,
            children: [
                { path: '/calculator-json', name: 'CalculatorJSON', component: CalculatorJSON },
                { path: '/calculator-xml', name: 'CalculatorXML', component: CalculatorXML },
            ]},
      { path: '/*', redirect: '/calculator' },
  ],
});