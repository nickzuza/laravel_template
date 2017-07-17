'use strict';
// import gmap from './components/googlemap';
Vue.component('modal', {
    template:`<transition name="modal">
   <div class="modal-mask" @click="$emit(\'close\')">
      <div class="modal-wrapper">
         <div class="modal-container">
            <div class="modal-close" @click="$emit(\'close\')">
               <svg width="20" version="1.1" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 64 64">
                  <g>
                     <path  d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59   c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59   c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0   L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z"/>
                  </g>
               </svg>
            </div>
            <div class="modal-body" @click.stop>
               <slot></slot>
            </div>
         </div>
      </div>
   </div>
</transition>`
});

import Multiselect from 'vue-multiselect';

function wordend(num, words){
    return words[ ((num=Math.abs(num%100)) > 10 && num < 15 || (num%=10) > 4 || num === 0) + (num !== 1) ];
}





