const prefix = '[watson] -> ';

const watsonConfig = require('./configs/watson.natural.language.config');
const NaturalLanguageUndestandingV1 = require('ibm-watson/natural-language-understanding/v1');


const naturalLanguageUndestandingV1 = new NaturalLanguageUndestandingV1({
    version: '2018-11-16',
    iam_apikey: watsonConfig.apikey,
    url: watsonConfig.url
});

async function start(tracks){

    return new Promise((resolve,reject) => {
        Promise.all(tracks.map(async track => {
            return await getWatsonResponse(track);
        }))
        .then(results => {
            
            results.forEach(result => {
                for (let index = 0; index < tracks.length; index++) {
                    if(tracks[index].name == result.name){
                        tracks[index].sentimentPoint = result.sentimentPoint;
                    }
                }
            });
            console.log(`${prefix} got all ${results.length} results`);
            resolve(tracks);
        });
    });
    
}

async function getWatsonResponse(track){

    try {
        const analyzeParams = {
            'text': track.lyric,
            'features': {
                'emotion': {},
                'sentiment' : {}
            }
        };
    
        const response = await naturalLanguageUndestandingV1.analyze(analyzeParams);
        track.watsonResponse = response;
        return track;
        
    } catch (error) {
        return track;
    }
}

module.exports = start;