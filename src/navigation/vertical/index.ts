// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
// ** Icon imports 
import MessageOutline from 'mdi-material-ui/MessageOutline'
import CalendarBlankOutline from 'mdi-material-ui/CalendarBlankOutline'
import Abacus from 'mdi-material-ui/Abacus'
import Unity from 'mdi-material-ui/Unity'
import { Telegram } from '@mui/icons-material'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      badgeContent: 'new',
      badgeColor: 'error',
      path: '/scanner',
      /*  children: [
      
        {
          title: 'Scanner',
          path: '/scanner'
        },
        {
          title: 'CRM',
          path: '/dashboards/crm'
        },
        {
          title: 'Analytics',
          path: '/dashboards/analytics'
        },
        {
          title: 'eCommerce',
          path: '/dashboards/ecommerce'
        } 
      ]*/
    },
    {
      sectionTitle: 'Section'
    },
    {
      title: 'Swap',
      icon: Abacus,
      path: '/swap'
    },
    {
      title: 'ArbinoLyzerBot',
      icon: Telegram,
      externalLink: true,
      openInNewTab: true,
      path: 'https://t.me/ArbinoLyzerBot'
    },
    {
      title: 'Partnerships',
      icon: Unity,
      path: '/partnerships'
    }, ,
    {
      title: 'Tokenomics',
      icon: GoogleCirclesExtended,
      path: '/tokenomics'
    },
    {
      title: 'Whitepaper',
      icon: MessageOutline,
      path: '/whitepaper'
    },
    {
      title: 'Roadmap',
      icon: CalendarBlankOutline,
      path: '/roadmap'
    },
    {
      title: 'Community',
      icon: HomeOutline,
      externalLink: true,
      openInNewTab: true,
      path: 'https://t.me/Arbinium'
    }
  ]
}

export default navigation
