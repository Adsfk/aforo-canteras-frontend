<template>
  <div id="app" class="mt-1">
    <b-row>
      <b-col cols="11">
        <TimeSelector @updatedata="updateComponents"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <Table/>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import TimeSelector from './TimeSelector.vue'
import Table from './Table.vue'
import {APITides} from '../API/APITides'

export default {
    components: {
        TimeSelector,
        Table
    },
    methods:{
        updateComponents(date, hour, dataType){
            console.log(date + " - " + hour)
            
            var apiService = new APITides();

            apiService.getData(date, hour, dataType).then((response) => {
              if (response.status == 200) {
                var data = response.data.information;
                var color = this.$root.$refs.time.getColor();
                this.$root.$refs.table.setColor(color);
                this.$root.$refs.table.updateTable(data);
                
              }else{
                  this.tide_height = 'no-content'
            }}).catch(error => {alert(error);});
        }
    }
}
</script>
