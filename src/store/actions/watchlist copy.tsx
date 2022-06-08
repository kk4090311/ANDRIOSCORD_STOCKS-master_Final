import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { WatchlistcopyState } from '../reducers/watchlist copy';
import Coincopy from '../../models/Coin copy';
import Stock from '../../models/Stock';
import cmpData from '../../data/CoinMarketCapData';
import sipData from '../../data/StockIconCapData';


export const SET_WATCHLISTCOPY_DATA = 'SET_WATCHLISTCOPY_DATA';





export const fetchCoinData = () => {
  return async (dispatch: ThunkDispatch<WatchlistcopyState, void, Action>) => {
    // Will change when user can favorite coins
    const coins = ['BTC', 'XRP', 'BCH', 'ETH', 'DOGE', 'LTC'];
    const stocks = ['tse_2330.tw',
                  

                  ];
    try {
      const stocksResponse = await fetch( `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${stocks.join('|')}&json=1&delay=0`)
      const cryptoResponse = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
      );
      const cryptoResponseData = await cryptoResponse.json();
      const stocksResponseData = await stocksResponse.json();

      const stockData: Stock[] = [];
      stocks.forEach((stock,index) => {
        // Find ID from CMP data, if it doesn't exist use 1
        console.log(stocksResponseData);
        const stockDetails = stocksResponseData.msgArray[index];

        const sipDetails = sipData.data.find(
          (sipStock) => stockDetails.c === sipStock.symbol
        );

        const stockID = sipDetails?.id ?? 0;

        const stockName = stockDetails.n;
        const stockSymbol = stock.substring(4,8);
        //const stockPrice = Number(stockDetails.pz);PZ第一版
        //const stockPrice = Number((stockDetails.a).substring(0,5));PZ第二版
        //const stockChange = Number(stockDetails.z)-Number(stockDetails.y);

        const stockB = (stockDetails.b).substring( 0, (stockDetails.b).indexOf("_")  );
        const stockPrice = Number(stockDetails.z == "-" ?  stockB : stockDetails.z);

        const stockChange = stockPrice-Number(stockDetails.y);
        const stockUpdown = (stockChange/stockDetails.y)*100
        stockData.push(
          new Stock(
            stockID,
            stockName,
            stockSymbol,
            stockPrice,
            stockChange,
            stockUpdown
          )
        );
      });

      const coinData: Coincopy[] = [];
      coins.forEach((coin) => {
        // Find ID from CMP data, if it doesn't exist use 1
        const coinDetails = cryptoResponseData.RAW[coin].USD;
        const cmpDetails = cmpData.data.find(
          (cmpCoin) => coinDetails.FROMSYMBOL === cmpCoin.symbol
        );
        const coinID = cmpDetails?.id ?? 0;
        const coinName = cmpDetails?.name ?? 'Unknown';
        coinData.push(
          new Coincopy(
            coinID,
            coinName,
            coin,
            coinDetails.PRICE,
            coinDetails.CHANGEPCT24HOUR
          )
        );
      });

      dispatch({
        type: SET_WATCHLISTCOPY_DATA,
         coinData: stockData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updateCoinData = (newData: Stock[]) => {
  return async (dispatch: ThunkDispatch<WatchlistcopyState, void, Action>) => {
    dispatch({
      type: SET_WATCHLISTCOPY_DATA,
      coinData: newData,
      //coinData: newData,
    });
  };
};
