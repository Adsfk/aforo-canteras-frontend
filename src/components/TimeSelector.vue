<template>
  <div class="header">
        <b-row>
            <b-col class="text-left">
                <b-row>
                    <b-col>
                        <h1>Playa de Las Canteras</h1>
                        <p>Capacidad de carga</p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col class="pr-0" cols="3">
                <h4 class="modelType">{{modelType}}</h4>
            </b-col>

            <b-col class="px-0 mr-1" md="auto" cols="3">
                <b-form-datepicker class="datePicker" v-model="value_date" :max="max" locale="es" @input="checkTime"></b-form-datepicker>
            </b-col>

            <b-col class="px-0" md="auto" cols="3">
                <b-form-timepicker class="hourPicker" v-model="value_time" locale="es" @input="checkTime"></b-form-timepicker>
            </b-col>

            <b-col class="px-0 selector" cols="1">
                <b-button size="sm" class="ml-1 buttons" variant="light" @click="goBackTime">
                    <b-icon icon="arrow-left-square" aria-label="Help"></b-icon>
                </b-button>
                <b-button size="sm" pill class="ml-1 buttons" variant="light" @click="setActualDateAndTime"> 
                    <b-icon icon="circle" aria-label="Help"></b-icon>
                </b-button>
                <b-button size="sm" class="ml-1 buttons" variant="light" @click="advanceTime">
                    <b-icon icon="arrow-right-square" aria-label="Help"></b-icon>
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>

export default {
    data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const maxDate = new Date(today)
      maxDate.setDate(maxDate.getDate() + 2)

      return {
        value_date: '',
        value_time: '',
        hour: '',
        max: maxDate,
        actualTime: true,
        color: '',
        modelType: '',
        typeData: 'measure'
      }
    },

    created(){
        this.$root.$refs.time = this;
    },

    mounted(){
        this.setActualDateAndTime();
        this.todo()
    },
    
    beforeDestroy () {
       clearInterval(this.interval)
    },

    methods:{
        todo: function(){           
            this.interval = setInterval(function(){
                this.updateActualTime()
            }.bind(this), 60000);
        },

        setTimestampt(date){
            this.value_date = date.getFullYear() + "-" + 
                                this.formatFieldOfDate(date.getMonth()+1) + "-" 
                                + this.formatFieldOfDate(date.getDate());
            this.value_time = date.getHours() + ":00:00";
            
            this.hour = this.formatFieldOfDate(date.getHours());
        },

        formatFieldOfDate(field){
            return field < 10 ? "0" + field : field;
        },

        updateActualTime(){
            if(this.actualTime && !this.isActualHour()){
                this.setActualDateAndTime();
            }
        },

        checkTime(){
            var timestamp = this.getTimestampt();
            this.updateParameters(timestamp);
        },

        isActualHour(){
            var now = this.getActualTimestampt();
            return this.getTimestampt() == now;
        },

        isBefore(){
            return this.getTimestampt() < this.getActualTimestampt();
        },

        setActualDateAndTime(){
            this.updateParameters(new Date(), "");
        },

        advanceTime(){
            var timestamp = this.getTimestampt();
            timestamp.setHours(timestamp.getHours()+1);
            this.updateParameters(timestamp);
        },

        goBackTime(){
            var timestamp = this.getTimestampt();
            timestamp.setHours(timestamp.getHours()-1);
            this.updateParameters(timestamp);
        },

        updateParameters(timestamp){
            this.setTimestampt(timestamp);
            this.actualTime = this.isActualHour();
            this.changeStatus();
            this.updateViewData();
        },

        updateViewData(){
            this.$emit('updatedata', this.value_date, this.hour, this.typeData)
        },

        changeStatus(){
            var actual = this.getTimestampt().getTime();
            var now = this.getActualTime();
            if(actual === now){
                this.color = 'green';
                this.modelType = 'Tiempo real';
                this.typeData= 'measure';
            } else if(actual > now){
                this.color = 'blueviolet';
                this.modelType = 'Modelo predictivo';
                this.typeData= 'prediction';
            } else {
                this.color = 'darkgrey';
                this.modelType = 'Histórico';
                this.typeData= 'historic';
            }
        },

        getActualTimestampt(){
            var now = new Date();
            now.setMinutes(0);
            now.setSeconds(0);
            now.setMilliseconds(0);
            return now;
        },

        getActualTime(){
            var now = this.getActualTimestampt();
            return now.getTime();
        },

        getTimestampt(){
            var date = this.value_date.split("-");
            var time = this.value_time.split(":");
            var timestamp = new Date(date[0], date[1]-1, date[2]);
            timestamp.setHours(time[0], time[1], 0);
            return timestamp;
        },

        getColor(){
            return this.color;
        },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
    text-align: center;
    vertical-align: center;
}

.selector{
    min-width: 10em;
}

.buttons{
    background: white;
    border: white;
    height: 40px;
    width: 45px;
}

.datePicker{
    width: 326px;
}

.hourPicker{
    width: 103px;
}

.modelType {
    text-align: left;
}
</style>
