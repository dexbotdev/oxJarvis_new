// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
 
import TokenomicsChart from 'src/views/TokenomicsChart'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const ApexCharts = () => {
  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <Grid container spacing={6} className='match-height'> 
          <Grid item xs={12} md={6}>
            <TokenomicsChart />
          </Grid>
        </Grid> 
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default ApexCharts
