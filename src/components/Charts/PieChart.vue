<script>

  // Rainbow Scheme: ['#ff0000', '#ff3c00', '#f5c400', '#00af41', '#00a8e1']

  import { defineComponent } from 'vue'
  import { Pie } from 'vue3-chart-v2'

  export default defineComponent({
    name: 'PieChart',
    extends: Pie,
    props: {
      holdingsData: { type: Array }
    },
    methods: {
      updateHoldingsChart() {
        this.chartData.datasets[0].data[0] = 100
      }
    },
    data() {
      return {
        chartData: {
          type: 'doughnut',
          datasets: [{
            data: this.holdingsData,
            label: '$',
            backgroundColor: ['#1961FB', '#5B8AFD', '#FF635C', '#FF3C31', '#ff0000'],
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
