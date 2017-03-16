var provinces = require('./database')

exports = module.exports = provinces

exports.json = sortProvince(provinces);



/**
 * [sortProvince 序列化 省市区信息 第2,3级]
 * @param  {[type]} arr [第2,3级总数组]
 * @return {[type]}     [序列化后的第2,3级总数组]
 */
function findChild(arr,id,level){
    var newarr = []
    for (var i = 0; i < arr.length; i++) {
        var json = {};
        if(arr[i].parent_id === id&&arr[i].level !== level){
            json.label = arr[i]['name'];
            json.value = arr[i]['name'];
            var child = findChild(arr,arr[i]['id']);
            if(child.length>0) json.children=child;
            newarr.push(json);
        }
    }
    return newarr

}
/**
 * [sortProvince 序列化 省市区信息 第一级]
 * @param  {[type]} arr [总数组]
 * @return {[type]}     [序列化后的总数组]
 */
function sortProvince(arr){
    var newarr = []
    for (var i = 0; i < arr.length; i++) {
        var json = {};
        if(arr[i].level === 1){
            json.label = arr[i]['name'];
            json.value = arr[i]['name'];
            var child = findChild(arr,arr[i]['id'],1);
            if(child.length>0) json.children=child;
            newarr.push(json);
        }
    }

    return newarr
}