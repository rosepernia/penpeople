module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/_global.scss";`
            },
        }
    },
    devServer: {
        public: 'subdomain.domain.ext:port'
    }
}
