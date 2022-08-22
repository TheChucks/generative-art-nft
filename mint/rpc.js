const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const sleep = ms => new Promise(r => setTimeout(r, ms))

async function main(){
    
    const meta = fs.readdirSync(`./json`);

    if (!fs.existsSync('./json/done')){
        fs.mkdirSync('./json/done');
    }


    for(let file of meta){
        console.log(`exec: chia rpc wallet nft_mint_nft -j${file}`);
        let rawdata = fs.readFileSync(`./json/${file}`);
        let json = JSON.parse(rawdata);
        let data = JSON.stringify(json);
        fs.writeFileSync(`./json/${file}`, data);
        const { stdout, stderr } = await exec(`chia rpc wallet nft_mint_nft -j ./json/${file}`);
        console.log('stdout:', stdout);
        fs.rename(`./json/${file}`, `./json/done/${file}`, () => console.log('moved to done'));
        await sleep(300000);
    }

}

main().then(() => process.exit(0), e => { console.error(e); process.exit(1) })