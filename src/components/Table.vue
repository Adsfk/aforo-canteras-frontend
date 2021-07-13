<template>
    <div>
        <div v-if="content">
            <b-form-checkbox-group
                    id="restrictions" 
                    v-model="selected" 
                    @input="applyRestrictions"
                >
                <b-table-simple small caption-top class="mb-0 mt-2" :style="'border-top: 8px solid ' + color + ';'">
                    <b-tbody>
                        <b-tr>
                            <b-td class="zone align-middle subheader">Altura del mar (m)</b-td>
                            <b-td></b-td>
                            <b-td colspan="6" class="data">{{information[0].tide}}</b-td>
                        </b-tr>
                    </b-tbody>
                    <b-tbody>
                        <b-tr>
                            <b-td class="zone align-middle subheader column">Superficie (m<sup>2</sup>)</b-td>
                            <b-td></b-td>
                            <b-td class="header data align-middle" v-for="(value, idx) in information[1].superficie" :key="idx">
                                {{value | formatNumber}}
                            </b-td>
                        </b-tr>
                    </b-tbody>
                
                    <b-tbody id="table_header">
                        <b-tr>
                            <b-td></b-td>
                            <b-td></b-td>
                            <b-td class="header">Total</b-td>
                            <b-td class="header">Jardines del Atlántico</b-td>
                            <b-td class="header">Churruca</b-td>
                            <b-td class="header">Olof Palme</b-td>
                            <b-td class="header">Tomás Miller</b-td>
                            <b-td class="header">Saulo Torón</b-td>
                        </b-tr>
                    </b-tbody>
                    <b-tbody>
                        <b-tr>
                            <b-td class="zone align-middle subheader">Capacidad de carga física (CCF) m<sup>2</sup> por persona</b-td>
                            <RestrictionModifier v-bind:value="CCFDensity"/>
                            <b-td class="header data align-middle" v-for="(value, idx) in information[2].aforo_fisico" :key="idx">
                                {{value | formatNumber}}
                            </b-td>
                        </b-tr>
                        <b-tr>
                            <b-td class="zone align-middle subheader">Capacidad de carga real (CCR)</b-td>
                            <b-td></b-td>
                            <b-td class="header data align-middle" v-for="(value, idx) in information[3].aforo_recomendado" :key="idx">
                                {{value | formatNumber}}
                            </b-td>
                        </b-tr>
                        <b-tr>
                            <b-td class="zone align-middle subheader">Capacidad de carga efectiva (CCE)</b-td>
                            <b-td></b-td>
                            <b-td class="header data align-middle" v-for="(value, idx) in information[4].aforo_efectivo" :key="idx">
                                {{value | formatNumber}}
                            </b-td>
                        </b-tr>
                        <b-tr v-for="(restrictionValue, index) in restrictions" :key="index">
                            <b-td colspan="2" class="zone align-middle">
                                <b-form-checkbox 
                                :value="index"
                                :name="'distancia_'+index"
                                class="checkbox">
                                <div class="checkbox-label">
                                <p class="hint subheader">{{restrictionValue.category}}</p><div v-html="restrictionValue.name">{{restrictionValue.name}}</div>
                                </div>
                                </b-form-checkbox>
                            </b-td>
                            <b-td class="header data align-middle" v-for="item in information[5+index].distancia" :key="item.id"> 
                                {{item | formatNumber}} 
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </b-form-checkbox-group>
        </div>
        <div v-if="!content">
            <h4 class="mt-2">There is no data available</h4>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import {APIRestrictions} from '../API/APIRestrictions'

Vue.filter("formatNumber", function (value) {
    return value.toString()
                .replace(/\./g, ",")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  });

import RestrictionModifier from './RestrictionModifier.vue'

export default {
    name: "Table",
    components: {
        RestrictionModifier
    },
    data() {
      return {
            selected: [],
            restrictions: {},
            information : {},
            content: true,
            CCFDensity: 0,
            color: '' 
      }
    },
    created(){
        this.$root.$refs.table = this;
    },
    methods:{
        updateTable(data){
            if(typeof data == 'undefined' || data[0].tide == "no-content") this.content = false
            else{
                this.information = data;
                this.content = true
                this.getActiveRestrictions();
                this.getRestrictionsData();
            }
        },

        formatNumber(newValue) {
            return newValue.replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
        },

        setColor(color){
            this.color = color
        },
        
        applyRestrictions(){
            var apiService = new APIRestrictions();
            
            apiService.applyRestriction(this.selected).then((response) => {
            if (response.status == 200) {
                this.$root.$refs.time.updateViewData();
            }}).catch(error => {alert(error);});
        },

        getActiveRestrictions(){
            var apiService = new APIRestrictions();

            apiService.getActiveRestrictions().then((response) => {
              if (response.status == 200) {
                this.selected = response.data.selected;
              }
            }).catch(error => {alert(error);});
        },

        getRestrictionsData(){
            var apiService = new APIRestrictions();

            apiService.getRestrictionsData().then((response) => {
              if (response.status == 200) {
                this.restrictions = response.data.restrictions;
                this.CCFDensity = response.data.CCFDensity;
              }
            }).catch(error => {alert(error);});
        }
    }
}
</script>

<style>
#table_header{
    background-color: #333333;
    color: white;
}

.zone{
    text-align: left;
    width: 205px;
}

.data{
    vertical-align: middle;
}

.measure{
    margin-bottom: 0; 
    font-size: 0.7em;
}

.hint{
    margin-bottom: 0; 
    font-size: 0.9em;
}

.subheader{
    font-weight: bold;
}

.header{
    text-align: right;
}

.checkbox{
  margin-top:15px;
}

.checkbox-label{
  position:relative;
  transform: translateY(-15%);
}

.column {
    min-width: 9em;
}

td {
    width: 200px;
}

</style>