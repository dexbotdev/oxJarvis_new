/* eslint-disable */

import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Trophy from 'src/views/scanner/Trophy'
import TotalEarning from 'src/views/scanner/TotalEarning'
import StatisticsCard from 'src/views/scanner/StatisticsCard'
import WeeklyOverview from 'src/views/scanner/WeeklyOverview'
import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import HoneypotCheckerCaller from 'src/api/HoneypotCheckerCaller';
import Web3 from 'web3';
import { RPC, SUSHISWAP_SWAP_ROUTER_ADDRESS, WBNB_ADDRESS, HONEYPOT_CHECKER_ADDRESS } from 'src/constants'
import { HoneypotIsV1 } from '@normalizex/honeypot-is';

import { getPairInformationByChain } from 'dexscreener-api';
const { bep20Abi } = require("src/ABI");
const defcont = '0x2eCBa91da63C29EA80Fbe7b52632CA2d1F8e5Be0';


const Item = (props) => {
  let colorTxt = 'cyan';
  if (props.value === 'FAILED' || props.value === 'UnVerified' || Number(props.value) < 0)
    colorTxt = 'red'

  return (<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
    <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
      <Typography variant='body2' sx={{ color: 'common.grey', fontWeight: 'bolder' }}>
        {props.tag}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
        <Typography variant='button' sx={{ color: colorTxt, fontWeight: 'bolder' }}>
          {props.value}
        </Typography>
      </Box>
    </Box>
  </Box>)
};

const Dashboard = () => {

  const [network, setNetwork] = React.useState('');
  const [tokenAddress, setTokenAddress] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false)
  const [tokenInfo, setTokenInfo] = useState({});
  const [tokenScanData, setTokenScanData] = useState({});

  const handleClose = () => {
    setIsLoading(false);
  };

  const checkforHoneyPot = (abi) => {

    console.log(abi);
    var str = JSON.stringify(abi).toLowerCase();

    const isAccounting = str.indexOf('accounting') > 0;
    const isLibrary = str.indexOf('library') > 0;
    const isBlackList = str.indexOf('blacklist') > 0;

    console.log(str);
    console.log(isAccounting);
    console.log(isLibrary);
    console.log(isBlackList);

    if (isAccounting) return true;
    else if (isBlackList) return true;
    else if (isLibrary) return true;

    return false;

  }
  const fetchTokenDetails = () => {
    if (tokenAddress != undefined) {
      getTokenDetails(tokenAddress)
    } else {
      alert('Enter Token Address')
    }
  }

  const getTokenDetails = async (tokenAddress) => { 
    const CHAIN_ID = 1;
    const honeypotis = new HoneypotIsV1();
    const BUSD = tokenAddress; 
    if (BUSD !== undefined && BUSD !== "") {
      setIsLoading(true)

      const BUSD_PAIRS = await honeypotis.getPairs(BUSD, CHAIN_ID);

      await honeypotis.honeypotScan(
        BUSD,
        BUSD_PAIRS[0].Router,
        BUSD_PAIRS[0].Pair,
        CHAIN_ID
      ).then((result) => {

        getPairInformationByChain("ethereum",result.PairAddress).then((response)=>{


          result.pair=response.pair; 

          console.log(result)

          setTokenScanData(result)
          setIsLoading(false)

        })
       }).catch(Error => {

        setIsLoading(false)
       })
    } 

  }
  const handleChange = (event) => {
    setNetwork(event.target.value);
  };
  const handleInputChange = (event) => {
    setTokenAddress(event.target.value);
  };

  useEffect(() => {
    getTokenDetails(defcont);
  }, [])

  return (
    <Grid>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Scan Token</Typography>
      </Grid>
      <Card>
        <CardContent>
          <Paper sx={{ maxWidth: '100%', margin: 'auto', overflow: 'hidden' }}>
            <AppBar
              position="static"
              color="default"
              elevation={3}
            >
              <Toolbar>
                <Grid container spacing={5} alignItems="center">
                  <Grid item>
                    <SearchIcon color="inherit" sx={{ display: 'block' }} />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      placeholder="Enter Token Address"
                      value={tokenAddress}
                      onChange={handleInputChange}
                      InputProps={{
                        disableUnderline: true,
                        sx: { fontSize: 'default' },
                      }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" sx={{ mr: 1 }} onClick={() => {
                      fetchTokenDetails();
                    }}>
                      Scan Token
                    </Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </Paper>
        </CardContent>
      </Card>
      {
        isLoading ?
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop> :
          tokenScanData.Token ?
            <ApexChartWrapper sx={{ mt: 4 }}>

              <Grid container spacing={6}>
                <Grid item xs={12} md={4}>
                  <Trophy name={tokenScanData.Token.Name} priceusd={tokenScanData.pair.priceUsd} network={tokenScanData.pair.chainId} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <StatisticsCard data={tokenScanData} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <WeeklyOverview data={tokenScanData} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TotalEarning data={tokenScanData} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Grid container spacing={6}>
                    <Grid item xs={6}>
                      <CardStatisticsVerticalComponent
                        stats={Number(tokenScanData.BuyGas).toFixed(2)}
                        icon={<Poll />}
                        color='success'
                        title='Buy Gas'
                        subtitle='in wei'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CardStatisticsVerticalComponent
                        stats={Number(tokenScanData.SellGas).toFixed(2)}
                        title='Sell Gas'
                        color='secondary'
                        subtitle='in wei'
                        icon={<CurrencyUsd />}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CardStatisticsVerticalComponent
                        stats={Number(tokenScanData.BuyTax).toFixed(2)}
                        trend='negative'
                        title='Buy Tax'
                        subtitle='in pct'
                        icon={<BriefcaseVariantOutline />}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CardStatisticsVerticalComponent
                        stats={Number(tokenScanData.SellTax).toFixed(2)}
                        trend='negative'
                        title='Sell Tax'
                        subtitle='in pct'
                        color='warning'
                        icon={<HelpCircleOutline />}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ApexChartWrapper> : ''}

    </Grid>
  )
}

export default Dashboard
