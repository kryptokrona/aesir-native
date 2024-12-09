const WB = require("kryptokrona-wallet-backend-js");
import { saveWallet, loadWallet } from '../../services/sqlite';

let wallet = null;
const daemon = new WB.Daemon('blocksum.org', 11898);

export const saveWalletToDb = async () => {
    try {
        await saveWallet(wallet.toJSONString());
    } catch (err) {
        console.log(err);
    };
}

export const loadWalletFromDb = async () => {


        /* Load wallet data from DB */
        let [walletData, walletDbError] = await loadWallet();

        console.log('walletData', JSON.parse(walletData))

        const [loadedWallet, walletError] = await WB.WalletBackend.loadWalletFromJSON(
            daemon, JSON.parse(walletData)
        );

        if (walletError) {
            console.log('Error: ', walletError)
        }

        wallet = loadedWallet;

        const addresses = wallet.getAddresses();

        console.log(addresses[0])

        console.log('loadedWallet', loadedWallet);

}

export const createWallet = async () => {

    wallet = await WB.WalletBackend.createWallet(daemon);

    const [seed, err] = await wallet.getMnemonicSeed();

    console.log(seed, err);

    const addresses = wallet.getAddresses();

    await saveWalletToDb(wallet);

    return addresses[0];

}

