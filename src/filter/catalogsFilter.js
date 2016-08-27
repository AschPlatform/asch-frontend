/**
 * Created by zenking on 16/8/27.
 */
angular.module('asch').filter('catalogsFilter', function () {
    return function (value) {
        var type = '';
        if(value=='1'){
            type ='通用';
        }  else if(value=='2'){
            type ='商业';
        } else if(value=='3'){
            type ='社交';
        } else if(value=='4'){
            type ='教育';
        } else if(value=='5'){
            type ='娱乐';
        } else if(value=='6'){
            type ='新闻';
        } else if(value=='7'){
            type ='生活';
        } else if(value=='8'){
            type ='工具';
        } else if(value=='9'){
            type ='游戏';
        }
        return type;
    }
});
