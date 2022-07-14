<template>
    <div class="alert alert-success" role="alert">
        <i class="bi bi-cart-check"></i>
{{text}}
    </div>
</template>
<style>
.alert{
  display: none;
  transition: all 1s;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  position: fixed !important;
}
</style>
<script>
import Alert from "bootstrap/js/dist/alert"
export default {
    props:{
        alertText:{
            type:String,
            default(){
                return "成功";
            },
        },
    },
    data() {
        return {
            text:"",  
        }
    },
    watch:{
        alertText(){
            if (this.alertText!==""||undefined){
                this.text=this.alertText;
            }
        },
    }
}
</script>