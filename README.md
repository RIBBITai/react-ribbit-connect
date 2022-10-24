
# react-ribbit-connect
React component for integrating [RIBBIT CONNECT](https://ribbit.ai/) into your webpage

Don't use react? Here are a few more implementation methods we provide:
1.  [Pure JavaScript](https://github.com/darrylhuffman/ribbit-connect)
2. Angular (coming soon)
3. React Native (coming soon)

## Install
With ```npm```:
```
npm install --save react-ribbit-connect
```

With ```yarn```:
```
yarn add react-ribbit-connect
```


## Documentation
Please refer to the official [RIBBIT CONNECT](https://portal.ribbit.ai/Widgets/Integration) docs for more information.

## Usage
```jsx
import  {  RIBBITConnect  }  from  "react-ribbit-connect";

const App extends React.Component {
    // ...
    render() {
        return (
            <RIBBITConnect
            token={this.state.token} // see documentation on how to get a token
            settings={{
                curtainColor: 'rgba(0,0,0,0.5)',
            }}
            onComplete={this.onComplete}
            // onLaunch={...} // fired on ready
            // onMessage={...}
            // onExit={...}
            />
        );
    }
}
```
### All Props
| Name | Type | Default | Description |
| ------- | ----- | --------- | --------|
| ```token``` | string |  | Token recieved from ```/CONNECT/session/``` endpoint
| ```open``` | boolean | false | Whether or not CONNECT should be open or not
| ```language``` | string | en | Optional language to be displayed to the user (Translation must be added within CONNECT settings. More coming soon.)
| ```style``` | object |  | Optional styles to be applied to the CONNECT container
| ```className``` | string |  | Optional class to be added to the CONNECT container
| ```inline``` | boolean | false | Whether or not CONNECT should display inline (default is popup)
| ```settings``` | object | | Additional settings (see below)
| ```getContext``` | function |  | Can be used to get the RIBBIT CONNECT context
| ```onMessage``` | function |  | Generic message handler that fires for every one of the events below ```function(eventName, eventData) => void```  
| ```onLaunch``` | function |  | ```function(eventData) => void```  
| ```onExit``` | function |  | ```function(eventData) => void```  
| ```onComplete``` | function |  | ```function(eventData) => void```  
| ```onBankLoginSelected``` | function |  | ```function(eventData) => void```  
| ```onManualEnrollmentSelected``` | function |  | ```function(eventData) => void```  
| ```onNoAccountsFound``` | function |  | ```function(eventData) => void```  
| ```onBankNotFound``` | function |  | ```function(eventData) => void```  
| ```onBankLogin``` | function |  | ```function(eventData) => void```  
| ```onLinkOpen``` | function |  | ```function(eventData) => void```  

#### Settings
| Name | Type | Default | Description | 
| ------- | ----- | --------- | --------|
| ```curtainColor``` | string |  | Color of the popup background curtain. Examples: ```#FFF``` and ```rgba(0,0,0,0.5)```
| ```curtainAllowClose``` | boolean | true | Whether or not the user clicking on the popup background curtain should close the CONNECT popup


