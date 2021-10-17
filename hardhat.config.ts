import dotenv from 'dotenv';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-web3';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-watcher';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task('accounts', 'Prints the list of accounts', async () => {
// 	const accounts = await ethers.getSigners();

// 	for (const account of accounts) {
// 		console.log(account.address);
// 	}
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

dotenv.config();

module.exports = {
	watcher: {
		compilation: {
			tasks: ['compile'],
			files: ['./contracts'],
			verbose: true,
		},
		ci: {
			tasks: [
				'clean',
				{ command: 'compile', params: { quiet: true } },
				{ command: 'test', params: { noCompile: true, testFiles: ['./test'] } },
			],
		},
	},
	solidity: {
		compilers: [
			{
				version: '0.5.16',
				settings: {
					optimizer: {
						enabled: true,
						runs: 1000,
					},
				},
			},
		],
	},
	networks: {
		rinkeby: {
			url: `https://eth-rinkeby.alchemyapi.io/v2/7z572lXXuyfpl4wcS-faR81Oyobzb8Pj`,
			accounts: [process.env.MNEMONIC_PRIMARY_ACCOUNT],
		},
		matic: {
			url: `https://apis.ankr.com/e22bfa5f5a124b9aa1f911b742f6adfe/c06bb163c3c2a10a4028959f4d82836d/polygon/full/main`,
			accounts: [process.env.MNEMONIC_PRIMARY_ACCOUNT],
		},
		goerli: {
			url: 'https://eth-goerli.alchemyapi.io/v2/7z572lXXuyfpl4wcS-faR81Oyobzb8Pj',
			accounts: [process.env.MNEMONIC_PRIMARY_ACCOUNT],
		},
		bsc_testnet: {
			url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
			accounts: [process.env.MNEMONIC_PRIMARY_ACCOUNT, process.env.MNEMONIC_ADMIN_STAKING],
		},
		mumbai: {
			url: 'https://polygon-mumbai.g.alchemy.com/v2/7z572lXXuyfpl4wcS-faR81Oyobzb8Pj',
			accounts: [process.env.MNEMONIC_PRIMARY_ACCOUNT],
		},
		hardhat: {
			forking: {
				url: 'https://data-seed-prebsc-2-s3.binance.org:8545/',
				blockNumber: 13310698,
			},
		},
	},

	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://bscscan.com/
		apiKey: '8KFSH17E4S26HYAFBGTPCA29NMNCRY4W3K',
		// apiKey: 'H73WJKKZ7PP5WGF9C11EAPU8MJKY9BNHIJ',
		// apiKey: '4FIZ8WRNU47K26M8DG3YG5ZWR29V7EKAGY',
	},

	typechain: {
		outDir: './types',
		target: 'ethers-v5',
		alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
	},
};
