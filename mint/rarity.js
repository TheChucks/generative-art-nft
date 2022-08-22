const bigDecimal = require('js-big-decimal');
const {stringify} = require('csv-stringify');
const fs = require("fs");
const { parse } = require("csv-parse");
const traits = {};
let rankings = [];

const ROW_COUNT = 5000; //lol we are lazy, just put collection size

let pad = '';

for(let i = 0; i < ROW_COUNT.toString().length; i++){
    pad = `${pad}0`;
}


fs.createReadStream("../../meta/metadata.csv")
    .pipe(parse({ delimiter: ",", from_line: 1, to_line: 1 }))
    .on("data", function (row) {
        for (let i = 1; i < row.length; i++) {
            traits[row[i]] = {}
        }
    })
    .on("end", function () {
        fs.createReadStream("../../meta/metadata.csv")
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
                for (let i = 1; i < row.length; i++) {
                    if (!(row[i] in traits[Object.keys(traits)[i - 1]])) {
                        traits[Object.keys(traits)[i - 1]][row[i]] = {}
                        traits[Object.keys(traits)[i - 1]][row[i]].count = 1;
                        traits[Object.keys(traits)[i - 1]][row[i]].rarity = traits[Object.keys(traits)[i - 1]][row[i]].count / ROW_COUNT;
                    }
                    else {
                        traits[Object.keys(traits)[i - 1]][row[i]].count += 1;
                        traits[Object.keys(traits)[i - 1]][row[i]].rarity = (traits[Object.keys(traits)[i - 1]][row[i]].count / ROW_COUNT);
                    }
                }
            })
            .on("end", function () {
                fs.createReadStream("../../meta/metadata.csv")
                    .pipe(parse({ delimiter: ",", from_line: 2 }))
                    .on("data", function (row) {
                        let rarities = []
                        for (let i = 1; i < row.length; i++) {
                            rarities.push(traits[Object.keys(traits)[i - 1]][row[i]].rarity);
                        }

                        let data = {
                            ranking: 0,
                            '#': `${pad.substring(row[0].toString().length) + row[0].toString()}\t`
                        }

                        for (let i = 1; i < row.length; i++) {
                            data[Object.keys(traits)[i - 1]] = row[i];
                        }

                        data.rarity = new bigDecimal(rarities.reduce((previous, current) => previous * current));

                        rankings.push(data);
                    })
                    .on("end", function () {
                        rankings = rankings.sort(function (a, b) { return a.rarity.compareTo(b.rarity) }).map((e, i) => {
                            e.ranking = i + 1;
                            e.rarity = `${e.rarity.getValue()}\t`;
                            return e;
                        })

                        fs.writeFile('./rarity_list.json', JSON.stringify(rankings), () => console.log(`rarity_list.json created!`));

                        stringify(rankings, {
                            header: true,

                        }, function (err, output) {
                            fs.writeFile('./rarity_list.csv', output, () => console.log(`rarity_list.csv created!`));
                        })
                    })
            })
    })

