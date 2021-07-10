//引入样式
import "$css/index";

// import(/*webpackChunkName: "a"*/"./a").then(({add}) => {
import("./a").then(({add}) => {
    add(1,3);
})