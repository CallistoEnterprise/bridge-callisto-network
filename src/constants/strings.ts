import t from '../components/Header/types';
import { Assets } from './images';

export const links = [
    {
        type: t.DROPDOWN,
        name: "Services",
        link: "/services",
    },{
        type: t.DROPDOWN,
        name: "Ecosystem",
        link: "/ecosystem",
    },{
        type: "",
        name: "Blog",
        link: "/blog",
    },{
        type: "",
        name: "Cryptocurrency",
        link: "/cryptocurrency",
    },{
        type: "",
        name: "Get an audit",
        link: "/news",
    },{
        type: t.RECT,
        name: "Whitepaper",
        link: "/whitepaper",
    }
];

export const social = [
    {
        name: "telegram",
        link: "https://t.me/CallistoNet",
    },{
        name: "twitter",
        link: "https://twitter.com/CallistoSupport",
    },{
        name: "reddit",
        link: "https://www.reddit.com/r/CallistoCrypto/",
    },{
        name: "youtube",
        link: "https://www.youtube.com/c/CallistoNetwork",
    },{
        name: "instagram",
        link: "https://www.instagram.com/callisto.network",
    },{
        name: "facebook",
        link: "https://www.facebook.com/callistonetwork",
    },{
        name: "linkedin",
        link: "https://www.linkedin.com/company/callisto-network/",
    },{
        name: "bitcoin",
        link: "https://bitcointalk.org/index.php?topic=3380156.0",
    }
];

export const resources = [
    {
        name: "FAQ",
        link: "https://callisto.network/faq/",
    },{
        name: "Timeline",
        link: "https://callisto.network/timeline/",
    },{
        name: "Airdrop",
        link: "https://callisto.network/callisto-airdrop/",
    },{
        name: "Community Guidelines",
        link: "https://callisto.network/community-guidelines/",
    }
]

export const callisto = [
    {
        name: "Partners",
        link: "https://callisto.network/partners/",
    },{
        name: "GitHub",
        link: "https://github.com/EthereumCommonwealth/Callisto-Website",
    },{
        name: "Media Kit",
        link: "https://github.com/EthereumCommonwealth/Callisto-Media-Kit",
    },{
        name: "Contact us",
        link: "https://callisto.network/contact-us/",
    },{
        name: "Want to sell your CLO coins OTC?",
        link: "https://callisto.network/contact-us/",
    }
]

export const tokenList = [
    {
        name: "CLO",
        symbol: "CLO",
        decimals: {
            CLO: 18,
            BNB: 18,
            ETH: 18,
        },
        disable: "",
        addresses: {
            CLO: "0x0000000000000000000000000000000000000001",
            BNB: "0xCcbf1C9E8b4f2cDF3Bfba1098b8f56f97d219D53",
            ETH: "0xCcbf1C9E8b4f2cDF3Bfba1098b8f56f97d219D53"
        },
        addressesTest: {
            CLO: "0x0000000000000000000000000000000000000001",
            BNB: "0xCCEA50dDA26F141Fcc41Ad7e94755936d8C57e28",
            ETH: "0xCC48d2250b55b82696978184E75811F1c0eF383F",
        },
    },{
        name: "BNB",
        symbol: "BNB",
        decimals: {
            CLO: 18,
            BNB: 18,
            ETH: 18,
        },
        disable: "ETH",
        addresses: {
            CLO: "0xCC78D0A86B0c0a3b32DEBd773Ec815130F9527CF",
            BNB: "0x0000000000000000000000000000000000000003",
            ETH: ""
        }
    },{
        name: "ETH",
        symbol: "ETH",
        decimals: {
            CLO: 18,
            BNB: 18,
            ETH: 18,
        },
        disable: "BNB",
        addresses: {
            CLO: "0xcC00860947035a26Ffe24EcB1301ffAd3a89f910",
            BNB: "",
            ETH: "0x0000000000000000000000000000000000000002"
        }
    }
]

export const Networks = [
    {
        name: "Callisto Network",
        symbol: "CLO",
        devNet: "mainnet",
        img: Assets.cloLogo,
        chainId: "820",
        rpcs: ["https://clo-geth.0xinfra.com/"],
        explorer: "https://explorer.callisto.network/"
    },{
        name: "Binance Smart Chain",
        symbol: "BNB",
        devNet: "mainnet",
        img: Assets.chainbnb,
        chainId: "56",
        rpcs: ["https://bsc-dataseed.binance.org/", "https://bsc-dataseed1.defibit.io/", "https://bsc-dataseed1.ninicoin.io/"],
        explorer: "https://bscscan.com/"
    },{
        name: "Ethereum Network",
        symbol: "ETH",
        devNet: "mainnet",
        img: Assets.chaineth,
        chainId: "1",
        rpcs: ["https://eth-mainnet.alchemyapi.io/v2/u9rCarAf0yB8i6wnRaZvqM8Zrd8bgG1b"],
        explorer: "https://etherscan.io/"
    },
]