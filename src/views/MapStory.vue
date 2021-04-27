<template>
  <div class="view-top">
    <h1>Prueba google chart</h1>
<!--     <button @click="generateChart">Dibujar Esquema</button> -->
    <div id="chart_div"></div>
  </div>
</template>
<script>
import {onMounted} from 'vue'

export default({
  setup() {
    onMounted(async ()=>{
      const plugin = document.createElement("script");
      plugin.setAttribute(
        "src",
        "https://www.gstatic.com/charts/loader.js"
      );
      plugin.async = true;
      document.head.appendChild(plugin);
      generateChart()
    })

    function generateChart(){
      google.charts.load('current', {packages:["orgchart"]});
      google.charts.setOnLoadCallback(drawChart);
    }

    function drawChart(){
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager'); 
        // For each orgchart box, provide the name, manager, and tooltip to show.
        data.addRows([
          [{'v':'0', 'f':'Mike President'},'La isla del tesoro'],
          [{'v':'1', 'f':'Jim Vice President'},'La isla del tesoro'],
          [{'v':'01', 'f':'Mike President'},'0'],

        ]);    
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
        chart.draw(data, {'allowHtml':true});
    
    } 
    return {
      generateChart
    }
  },
})
</script>

<style lang="scss" scoped>


</style>
