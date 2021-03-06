'use strict';
// import gmap from './components/googlemap';
import ajaxSearch from './components/ajaxSearch';
Vue.component('modal', {
    template:`<transition name="modal">
   <div class="modal-mask" @click="$emit(\'close\')">
      <div class="modal-wrapper">
         <div class="modal-container">
            <div class="modal-close" @click="$emit(\'close\')">
               <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 47.971 47.971" xml:space="preserve" width="13px" height="13px">
                    <g>
                        <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
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



if(document.getElementById('header')){

    window.headerVue = new Vue({
        el:"#header",
        data:{
            lang:1,
            cartProducts:2,
            favProducts:0,
            categMenu:false,
            menuClick:false,
            log:false,
            modal:{
                auth:1,
                log:false
            },
            user:{
                enter:{
                    email:'',
                    pas:''
                },
                reg:{
                    email:'',
                    pas:'',
                    pasrepeat:'',
                    name:'',
                    tel:''
                },
                req:{

                    error:''
                },
                fog:{
                    email:''
                }

            }
        },
        methods:{
            validate(){
                this.$validator.validateAll().then(result => {
                        if (result) {
                            if(this.modal.log){
                                switch (this.modal.auth){
                                    case 1:
                                        Login();
                                        break;
                                    case 2:
                                        Register();
                                        break;
                                    case 3:
                                        ResetFromEmail();
                                        break;
                                }
                            }
                            return;
                        }else{
                            headerVue.$validator.validateAll()
                        }
                });
            },
            removeError(name){
                this.errors.remove(name);
            }
        },
        watch:{
            'modal.log'(val,oldval){
                //this.$validator.init();
                if(oldval){
                    this.modal.auth = 1;
                }
            }
        },
        components:{ajaxSearch},
        mounted(){
        },
    });
    $(document).on('click','.category-back',function(e){
        var el=e.currentTarget;
        console.log(1);
        $(el).closest('.subcategories-list').velocity({
            left:'100vw'
        });
    })
    $('.catalog-butt').on('click', function(){
       if(window.innerWidth < 1270){
            if(!($('html').hasClass('scr-no'))){
                $('html').addClass('scr-no');
                $('body').addClass('scr-no');
            }else{
                $('html').removeClass('scr-no');
                $('body').removeClass('scr-no');
            }
       }
        headerVue.menuClick = true;
    });
    $(document).on('click','.header-categories' , function(){ headerVue.menuClick = true});
    $(document).on('click' , function(e){
       if(!headerVue.menuClick) {
           headerVue.categMenu = false;
       }
        headerVue.menuClick=false;
    });
    $('.mob-menu-butt').click(function(){
        $('.main-menu').velocity({
                top:0
        });
        $('html').addClass('scr-no');
        $('body').addClass('scr-no');
    });
    $('.mob-men-Close').click(function(){
        $('.main-menu').velocity({
            top:'-100vh'
        });
        $('html').removeClass('scr-no');
        $('body').removeClass('scr-no');
    });
    $(window).resize(function(){
        if(window.innerWidth >1269){
            $('.main-menu').removeAttr('style')
            $('body').removeAttr('class');
            $('html').removeAttr('class');
        }
        if(window.innerWidth < 1270){
            console.log(1);
            setTimeout(function(){
                $(window).scrollTop(0);
            },50)

        }
    });
    $(document).on('click','.deeper .subcategory-title',function(e){
        e.preventDefault();
        var el=e.currentTarget;
        if(!($(el).closest('.subcategory').hasClass('subActive'))){
            $(el).closest('.subcategory').find('.subSubCategory').slideDown('200',()=>{

            });
            $('.subActive .subSubCategory').slideUp('200');
            $('.subcategory.subActive').removeClass('subActive');
            $(el).closest('.subcategory').addClass('subActive')
        }else{
            console.log(1);
            $(el).closest('.subcategory').find('.subSubCategory').slideUp('200',()=>{
                $(el).closest('.subcategory').removeClass('subActive')
            });
        }

    });


    $(document).on('click', 'li>.deep',function(e){
             e.preventDefault();
            var el=e.currentTarget;
            if($(el).closest('li').find('.subcategories-list')){
                $('.categories-list').addClass('scr-no');
                $(el).closest('li').find('.subcategories-list').velocity({
                    left:0
                });
            }
    });


    $(document).on('mouseenter' , '.categories-list>li' , function(e){

        if(window.innerWidth >1270){
            console.log(1);
            var el=e.currentTarget;
            if($('.categories-list').innerHeight() < $(el).find('.subcategories-list').innerHeight()){
                $('.categories-list').css('height' , $(el).find('.subcategories-list').innerHeight() + 'px');
            }
        }

    }).on('mouseleave','.categories-list>li', function(){
        if(window.innerWidth > 1270){

            $('.categories-list').removeAttr('style');
        }
    });

}

