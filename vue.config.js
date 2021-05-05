module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/_global.scss";`
            },
        }
    },
    devServer: {
        disableHostCheck: true
    }
}
