# simple-demo

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Plugins
* `public/js/flexible.js` Automatically set the zoom scale according to the screen width, make sure 1rem = device width / 10;
* `postcss-adaptive`: you can use `px` as value's unit in css files, it will automatically translate into `rem`.
* `vant`: ui framework for mobile app.
* `src/assets/app.less` Some common usage of css.
  
### Todo
1. http request
2. router 
3. back button of first page need to add jsbridge to close webview.
4. `AgePicker` component need to fix the position of stay, there is a problem with the scrolling area on the React Native.