import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import watchlistcopyReducer from './src/store/reducers/watchlist copy';
import watchlistReducer from './src/store/reducers/watchlist';
import topMoversReducer from './src/store/reducers/topmovers';
import newsReducer from './src/store/reducers/news';
import AppNavigator from './src/navigation/AppNavigator';


import {useEffect} from 'react';
import {LogBox} from 'react-native';
import { NativeBaseProvider } from 'native-base';


import { SafeAreaView, StatusBar } from 'react-native'



const {Buffer} = require('buffer/');

const protobuf = require("protobufjs");



LogBox.ignoreLogs([
  "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
]);



const rootReducer = combineReducers({
  watchlist: watchlistReducer,
  watchlistcopy:watchlistcopyReducer,
  topMovers: topMoversReducer,
  news: newsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));






export default function App() {

  // var tickersArray: string[] = ["GME"];
  

  // useEffect(() =>{
  //   const ws = new WebSocket("wss://streamer.finance.yahoo.com");
    
  //   const root = protobuf.load('https://raw.githubusercontent.com/khayuenkam/yahooliveticker/master/YPricingData.proto', (error, root) => {
    
  //     if(error){
  //       return console.log(error);
        
  //     }
      
  //     const Yaticker = root.lookupType('yaticker');
  
  //   ws.onopen = function open() {
  //     console.log('connected');
  //     ws.send('{"subscribe":' + JSON.stringify(tickersArray) + "}");
  //   };
   
  //   ws.onclose = function close() {
  //     console.log('disconnected');
  //   };
    
  //   ws.onmessage = function(message) {
  //     console.log('comming message');
  //     console.log(Yaticker.decode(new Buffer(message.data,'base64')));
  //   };

  //   ws.onerror = (e)=>{
  //     console.log(e.message);
  //   };
  //   });
  // },[])
  // console.log("511");
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
      <NativeBaseProvider >
          <AppNavigator />
          <StatusBar backgroundColor="#EEEEEE" barStyle='dark-content' />
      </NativeBaseProvider>
    </Provider>



</SafeAreaView>
  
  );
}
