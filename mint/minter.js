const {  NFTStorage, File, Blob } = require('nft.storage');
const { getFilesFromPath } = require('files-from-path');
const sha256File = require('sha256-file');

const fs = require('fs');


/*
    THE FOLLOWING VALUES MUST BE EDITED, TAKE YOUR TIME :)
*/

const EDITION_FOLDER ='edition The Chucks'; // folder generated by generative-art-nft
const WALLET_ID = 2; // chia wallet show -- nft wallet id
const ROYALTY_ADDRESS = ''; // address for royalties
const TARGET_ADRESS = '';  // nft target address
const LICENSE_HASH = null; //leave null if you dont have license
const LICENSE_URIS = null; // array of uris example ['https://wwww.example1.com/license', 'https://wwww.example2.com/license'] leave null if you dont have license
const FEE = 0 // transaction fee
const ROYALTY_PERCENTAGE = 650 // example  250 = 2.5%
const NFT_STORAGE_TOKEN = '';

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

async function uploadNFTStorage(message,files){
    console.log(message)
    const upload = await client.storeDirectory(files);
    console.log(`done! cid: ${upload}`);
    return upload;
}


async function main () {

    if (!fs.existsSync('./json')){
        fs.mkdirSync('./json');
    }

    const images = fs.readdirSync(`../output/${EDITION_FOLDER}/images`);
    const jsons = fs.readdirSync(`../output/${EDITION_FOLDER}/json`).sort((a, b) => a.split('.')[0] - b.split('.')[0]);

    let imgFiles = await getFilesFromPath(`../output/${EDITION_FOLDER}/images`);
    let metaFiles = await getFilesFromPath(`../output/${EDITION_FOLDER}/json`);

    const cidImgs = await uploadNFTStorage('uploading image files, this could take a while :p',imgFiles);
    const cidMeta = await uploadNFTStorage('uploading meta files, this could take a while :p',metaFiles);


    images.forEach(file => {

        const img = `https://${cidImgs}.ipfs.nftstorage.link/images/${file}`;
        const meta = `https://${cidMeta}.ipfs.nftstorage.link/json/${jsons[images.indexOf(file)]}`;
        let mintJson = {
            wallet_id: WALLET_ID,
            royalty_address: ROYALTY_ADDRESS,
            target_address: TARGET_ADRESS,
            hash: sha256File(`../output/${EDITION_FOLDER}/images/${file}`),
            uris: [img],
            meta_hash: sha256File(`../output/${EDITION_FOLDER}/json/${jsons[images.indexOf(file)]}`),
            meta_uris: [meta],
            fee: FEE,
            royalty_percentage: ROYALTY_PERCENTAGE
          }

          if(LICENSE_HASH != null && LICENSE_URIS != null){
            mintJson.license_hash = LICENSE_HASH;
            mintJson.license_uris = LICENSE_URIS;
          }

          console.log(`creating ${file.split('.')[0]}.json  ${images.indexOf(file) + 1}/${images.length}`)

          fs.writeFileSync(`json/${file.split('.')[0]}.json`, JSON.stringify(mintJson), 'utf8');
      });

      console.log(
        `
        _      _      _
        >(.)__ >(.)__ >(.)__
         (___/  (___/  (___/  TheChucks
        `
      )

}


main().then(() => process.exit(0), e => { console.error(e); process.exit(1) })