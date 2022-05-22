import useKeywordVolume from '../../libs/client/useKeywordVolume';
import useSearchArticle from '../../libs/client/useSearchArticle';
import useDataLab from '../../libs/client/useDataLab';

async function handler(req, res) {

    if (req.method === "GET") { 

        const categories = ["datalab"]; // ["kvolume", "news", "blog", "cafearticle", "kin"];
        
        // const { query : { ...queries } } = req; 
        const koreaTimeNow = String(new Date((new Date()).getTime() + ((new Date()).getTimezoneOffset() * 60 * 1000) + 9 * 60 * 60 * 1000)).slice(0, 24);

        if (true) { // queries?.keyword
        
        for (let i = 0; i < categories.length; i += 1) { 

            const promises = categories.map(async (category) => {
                if (category === "datalab") {
                    const data = await useDataLab("블록체인", category); // queries?.keyword
                    return data;
                }
                // else if (category === "kvolume") {
                //     const data = await useKeywordVolume(queries?.keyword, category);
                //     return data;
                // }

                // else if (category !== "kvolume") {
                // const data = await useSearchArticle(queries?.keyword, category);
                // return data;
                // }
            })

            const promiseResults = await Promise.all(promises);

            return res.json({

                // kvolumeSearchDate: koreaTimeNow,// promiseResults[0]?.kvolume?.searchDate,
                // newsSearchDate: promiseResults[1]?.news?.lastBuildDate,
                // blogSearchDate: promiseResults[2]?.blog?.lastBuildDate,
                // cafeSearchDate: promiseResults[3]?.cafearticle?.lastBuildDate,
                // kinSearchDate: promiseResults[4]?.kin?.lastBuildDate,
                
                keyword: "블록체인", // queries?.keyword,
                searchDate: koreaTimeNow,
                dataLabStartDate: promiseResults[0]?.datalab?.startDate,
                dataLabEndDate: promiseResults[0]?.datalab?.endDate,
                dataLabLabels: promiseResults[0]?.datalab?.results?.[0]?.data?.map(date => {return date?.period}),
                dataLabRelativeCounts: promiseResults[0]?.datalab?.results?.[0]?.data?.map(date => {return date?.ratio}),
                // dataLabPeriods: promiseResults[0]?.datalab?.results?.[0]?.data,
                
                // kvolumeItems: promiseResults[0]?.kvolume?.keywordList?.slice(0, 5),
                // newsItems: promiseResults[1]?.news?.items,
                // blogItems: promiseResults[2]?.blog?.items,
                // cafeItems: promiseResults[3]?.cafearticle?.items,
                // kinItems: promiseResults[4]?.kin?.items,

            })
        }
    }
  }
}

export default handler;