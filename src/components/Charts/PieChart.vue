<script>

  import { defineComponent } from 'vue'
  import { Pie } from 'vue3-chart-v2'

  export default defineComponent({
    name: 'PieChart',
    extends: Pie,
    props: {
      holdingsData: { type: Array }
    },
    data() {
      return {
        chartData: {
          type: 'doughnut',
          datasets: [{
            data: this.holdingsData,
            label: '$',
            backgroundColor: ['#6a4c9e', '#1961FB', '#759cfa', '#FF635C', '#ff0000'],
            borderColor: "black",
            clip: 100,
          }],
          labels: [
              'CROC',
              'SLTH',
              'TURT',
              'GIRA',
              'BUNY',
          ],
        },
        chartOptions: {
          responsive: true,
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.chartOptions)
    }
  })
</script>
