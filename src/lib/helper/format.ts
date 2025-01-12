import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { EIP712Domain } from "@thirdweb-dev/sdk/dist/declarations/src/evm/common/sign";
import { ethers, TypedDataField } from "ethers";
import omitDeep from "omit-deep";
/**
 * Write a function that takes in some markdown that looks like this
 * "#### **Python developers love working with the smart contract framework Brownie. A successor to Brownie is in the making—creating a reimagination of the Python Web3 developer experience. **\n\nIn this piece, I’ll be talking about [ApeWorX](https://www.apeworx.io/), also known as “Ape”.\n\nApeWorX is a Python-based smart contract development and deployment framework known for its customizability and safe private key management.\n\nMany of you know that I love Python, and upon entering the Web3 space I fell in love with the[ Brownie](https://github.com/eth-brownie/brownie) framework. Since I entered the space it seems as if all the original Web3 frameworks have either been succeeded or another competitor has swooped in:\n\n* [DappTools officially recognized Foundry](https://github.com/dapphub/dapptools/pull/927/files) as its successor.\n* [Hardhat](https://hardhat.org/) took the spot of the most-used framework in DeFi after a long tenure from[ Truffle](https://trufflesuite.com/)<span style=\"text-decoration:underline;\">.</span>\n* [ApeWorX](https://www.apeworx.io/) seems to be positioned to one day be the successor to the Brownie framework.\n\nThe Ethereum Python community is known for being one of the most collaborative and tight-knit groups out there. Many of the[ Vyper](https://vyper.readthedocs.io/en/stable/index.html) and[ Brownie contributors](https://github.com/eth-brownie/brownie/graphs/contributors) can be seen on the list of[ Ape contributors](https://github.com/ApeWorX/ape/graphs/contributors), including[ Doggie B](https://github.com/fubuloubu),[ Banteg](https://twitter.com/bantg), and[ Skellet0r](https://github.com/skellet0r) (and to a lesser extent, even myself!) \n\nAdditionally, both Python enthusiasts and DeFi protocols[ like Curve](https://curve.fi/) have started[ using Ape](https://github.com/curvefi/metaregistry) as a framework for their contracts.\n\nToday we are going to take a high-level “lickity-split” look at coming at ApeWorX from a Brownie user’s perspective. \n\n\n### **Lickity-Split**\n\n_You can find a minimal ApeWorX & Vyper template in our[ ApeWorX-starter-kit](https://github.com/smartcontractkit/apeworx-starter-kit) with code examples to get you started. _\n\nAfter[ installing ape](https://docs.apeworx.io/ape/stable/userguides/quickstart.html#installation) with something like pipx install eth-ape or pip, you’ll have access to the ape command-line interface.\n\nThe quickest way to start a new project is to use ape init, which will give you a blank setup that will look as such:\n\n```\n.\n├── ape-config.yaml\n├── contracts\n├── scripts\n└── tests\n```\n\nHere’s what each folder contains:\n\n* **Contracts: **Where all your Vyper, Solidity, or other contracts will go.\n* **Scripts: **Where all your Python code will go.\n* **Tests: **Your Python tests. \n* **ape-config.yaml: **The config file for your project. This is the ape equivalent of brownie-config.yaml or hardhat.config.js. \n\nIn your scripts folder, you can make a script like:\n\n```python\ndef main():\n\n print(\"Hello!\")\n```\n\nTo run any of your Python scripts in ape, run:\n\n```python\nape run scripts/my_script.py\n```\n\n#### **Plugins**\n\nApe doesn’t have Vyper, Solidity, or really anything by default, and instead uses a[ system of plugins](https://docs.apeworx.io/ape/stable/userguides/installing_plugins.html) to make ApeWorX completely customizable to your specific smart contract needs. Two of the most popular plugins are those for[ Solidity](https://github.com/ApeWorX/ape-solidity) and[ Alchemy](https://github.com/ApeWorX/ape-alchemy), which allow you to compile Solidity contracts and easily deploy to Alchemy. \n\nape plugins install solidity alchemy\n\nOnce you have this set up, you can write your Solidity contract in the contracts folder and compile. \n\nape compile\n\n\n#### **Networks**\n\nApe takes a specific approach to working with networks. Most frameworks, including Hardhat, Brownie, and Foundry, treat EVM chains in a similar fashion. ApeWorX is different. \n\nApeWorX separates networks into **ecosystems **and **chains**. For example, the Ethereum ecosystem is separated into **mainnet, ropsten, kovan, goerli, **etc. If you want to work with something like Fantom, you can install the fantom network plugin:\n\nape plugins install fantom\n\nThen you’ll see your new list of networks on the ape networks list:  \n\n```\nfantom                                                                                                      \n├── opera                                                                                                   \n│   └── geth  (default)                                                                                     \n├── testnet                                                                                                 \n│   └── geth  (default)                                                                                     \n└── local  (default)                                                                                        \n   └── test  (default)\n```\n\nIn cases where you don’t want to have to install a plugin for your network, you can use the[ ad-hoc method](https://docs.apeworx.io/ape/stable/userguides/networks.html#ad-hoc-network-connection) and just drop the RPC URL to the network you like. ape will assume as much as it can for sending transactions. \n\nape run scripts/my_script.py --network https://my_rpc_url.com\n\n\n#### **Accounts**\n\nOne of the biggest differences across frameworks is how they deal with accounts. Most frameworks have you setup a .env file to store your private keys in. However, putting your private keys in a .env has been[ tripping up developers forever](https://twitter.com/heyOnuoha/status/1522542744954191872). You _can _do this in ape, but the default is much safer. \n\nApe allows you to import private keys, then it will encrypt and store them on your computer. Whenever you want to work with that account or private key, you’ll need the password to decrypt it. This means no more accidentally pushing your keys up to GitHub!\n\nape accounts import my_key\n\nIt will then prompt you for your key and your password. In your Python scripts, you can then get your private key using the load function.\n\nfrom ape import accounts\n\naccounts.load(\"local-default\")\n\nWhen you run this script, you’ll be prompted for your password. \n\n\n#### **The Rest…**\n\nThe rest of the framework works as you’d expect. You can write your tests using[ pytest](https://docs.pytest.org/en/7.1.x/), one of the most popular Python testing frameworks. You can enter the[ ape console](https://docs.apeworx.io/ape/stable/commands/console.html) to work with an interactive shell in a Python environment with your network of choice. \n\nIt’s everything you’d want and expect from a framework. \n\nApe is a new player in the framework space, and it’s a[ wonderful repo to contribute to.](https://github.com/ApeWorX/ape/issues) If you love Python and have an idea on how to improve ape, be sure to leave an issue, a pull request, or just drop them a star!\n\nHappy Ape-ing!\n"
 * And convert it to a preview string that removes any markdown formatting
 * and limits the length to 100 characters.
 */
export function getPreviewText(markdown: string) {
  if (markdown?.length > 300) {
    return (
      markdown
        .replace(/[\*_\[\]\(\)]/g, "") // Remove markdown formatting
        .replace(/(\r|\n|\r)/gm, " ") // Replace newlines with spaces
        .replace(/^(#+\s)/gm, "")
        .replace(/^(?:[-*]\s)/gm, "")
        .substring(0, 300)
        .trim() + "..."
    );
  }

  return markdown;
}

export const omit = (object: any, name: string[]) => {
  return omitDeep(object, name);
};

export const omitTypeName = (object: any) => {
  return omitDeep(object, ["__typename"]);
};

/**
 * TODO: Could probably clean up the types here with all the casting... but it works for now.
 * I think it's cleaner than the Lens API Example:
 * https://github.com/lens-protocol/api-examples/blob/24911e7ab58ff909886ae4a4118073c9a6a6b363/src/ethers.service.ts#L16
 */
export async function signTypedDataWithOmittedTypenames(
  sdk: ThirdwebSDK,
  domain: EIP712Domain,
  types: Record<string, any>,
  message: Record<string, any>
) {
  return sdk.wallet.signTypedData(
    omitTypeName(domain) as EIP712Domain,
    omitTypeName(types) as Record<string, TypedDataField[]>,
    omitTypeName(message)
  );
}

export const splitSignature = (signature: string) => {
  return ethers.utils.splitSignature(signature);
};

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
