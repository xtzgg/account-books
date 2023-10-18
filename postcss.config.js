// 该文件项目启动后会自动运行: 将px自动转化为rem
// postcss.config.js
module.exports = {
    plugins: {
        // postcss-pxtorem 插件的版本需要 >= 5.0.0
        "postcss-pxtorem": {
            rootValue({ file }) {
                // 判断是否是 vant 的文件 如果是就使用 37.5 为根节点字体大小
                // 否则使用 75 因为 vant 使用的设计标准为 375 但是市场现在的主流设置尺寸是 750
                //因为参照图是 375 的所以是 37.5
                return file.indexOf("vant") === -1 ? 37.5 : 75;
            },
            // 配置哪些文件中的尺寸需要转化为 rem *表示所有的都要转化
            propList: ["*"],
        },
    },
}