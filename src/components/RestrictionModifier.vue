<template>
    <b-td class="form-input">
      <b-row>
        <b-col class="px-0 mx-0">
          <b-form-input
              style="text-align: right" 
              v-model="value"
              type="number"
              min="1"
              :state="state"
              required
              @change="modifyCCFDensity"
          ></b-form-input>
        </b-col>
        <b-col>
            m<sup>2</sup> por persona
        </b-col>
      </b-row>
    </b-td>
</template>

<script>

import {APIRestrictions} from '../API/APIRestrictions'

export default {
  name: 'RestrictionModifier',
  props: ['value'],
  data(){
    return {
      state: "null"
    }
  },
  methods:{
        modifyCCFDensity(){
          if(this.value > 0){
            this.state = "null";
            var apiService = new APIRestrictions();

            apiService.modifyCCFDensity(this.value).then((response) => {
              if (response.status == 200) {
                this.$root.$refs.time.updateViewData();
              }
            }).catch(error => {alert(error);});
          }else{
            this.state = false
          }
        }
  }
} 
</script>

<style>
.form-input{
    vertical-align: middle;
}
.modify-CCF-input{
  width: 5px;
}

</style>