import * as React from 'react';
 import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletWrapper } from 'src/components/WalletProvider';
import {ConnectButtonX} from 'src/components/ConnectButton';
import '@rainbow-me/rainbowkit/styles.css';
import { AggregatorContainer } from 'src/components/Aggregator';
import { getTokenList } from 'src/components/Aggregator/getTokenList';
 
function SwapPage({ Component, pageProps }) {
	const [queryClient] = React.useState(() => new QueryClient()); 
	const [isMounted, setIsMounted] = React.useState(false);
	const [tokenlist, setTokenlist] = React.useState();

	const getStaticProps =()=>{
		return getTokenList();
	}

	React.useEffect(() => {
		async function fetchData() { 
			const response = await getTokenList();
			setTokenlist(response.props.tokenlist);
			setIsMounted(true);

			console.log(response.props.tokenlist);
		  }
		  fetchData();
 
	}, []);

	return (
		<QueryClientProvider client={queryClient}>  
						{isMounted && (
							<WalletWrapper>  
									<AggregatorContainer tokenlist={tokenlist} />
							</WalletWrapper>
						)} 
		</QueryClientProvider>
	);
}

export default SwapPage;
