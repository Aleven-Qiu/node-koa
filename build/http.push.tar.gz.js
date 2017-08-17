/**
 * @author wangwei
 * @since 17/4/1
 */

var httpPushTarGz = require('./http.push.js')
var path = require('path');

/*--------------发布代码配置-------------------*/
new httpPushTarGz({
    receiver: 'http://xja-pc.seosiwei.com/http-push-test/receiver',
    distDir: path.resolve(__dirname, '../dist/targz'), //生成tar.gz包的文件夹
    proDir: path.resolve(__dirname, '../dist/test'), //上传的目标文件夹
    copyDir: path.resolve(__dirname, '../dist/xja_en_html'), //复制的目标文件夹
    tarGzName: 'build.tar.gz', //压缩后的名字
    to: '/usr/local/app/nginx/xja_en_html', //服务器 放置目录
    data: {
        isDelDir: 'no', //是否删除服务端文件   no || yes
        exclude: '', //服务器不需要删除的文件夹
    }
});