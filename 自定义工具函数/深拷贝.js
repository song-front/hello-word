function clone1(target){
    //类型判断  {}  []  null
    if(typeof target === 'object' && target !== null){
        //判断数据是否为数组
        if(Array.isArray(target)){
            return [...target];
        }else{
            return {...target};
        }
    }else{
        return target;
    }
}

function clone2(target){
    //判断
    if(typeof target === 'object' && target !== null){
        //创建一个容器
        const result = Array.isArray(target) ? [] : {};
        //遍历 target 数据
        for(let key in target) {
            //判断当前对象身上是否包含该属性
            if(target.hasOwnProperty(key)){
                //将属性设置到 result 结果数据中
                result[key] = target[key];
            }
        }
        return result;
    }else{
        return target;
    }
}


function deepClone1(target){
    //通过数据创建 JSON 格式的字符串
    let str = JSON.stringify(target);
    //将 JSON 字符串创建为 JS 数据
    let data = JSON.parse(str);
    return data;    
}


function deepClone2(target){
    //检测数据的类型
    if(typeof target === 'object' && target !== null ){
        //创建一个容器
        const result = Array.isArray(target) ? [] : {};
        //遍历对象
        for(let key in target){
            //检测该属性是否为对象本身的属性(不能拷贝原型对象的属性)
            if(target.hasOwnProperty(key)){
                //拷贝
                result[key] = deepClone2(target[key]);
            }
        }
        return result;
    }else{
        return target;
    }
}

function deepClone3(target, map=new Map()){
    //检测数据的类型
    if(typeof target === 'object' && target !== null ){
        //克隆数据之前, 进行判断, 数据之前是否克隆过
        let cache = map.get(target);
        if(cache){
            return cache;
        }
        //创建一个容器
        const result = Array.isArray(target) ? [] : {};
        //将新的结果存入到容器中
        map.set(target, result);
        //遍历对象
        for(let key in target){
            //检测该属性是否为对象本身的属性(不能拷贝原型对象的属性)
            if(target.hasOwnProperty(key)){
                //拷贝
                result[key] = deepClone3(target[key], map);
            }
        }
        return result;
    }else{
        return target;
    }
}


function deepClone4(target, map=new Map()){
    //检测数据的类型
    if(typeof target === 'object' && target !== null ){
        //克隆数据之前, 进行判断, 数据之前是否克隆过
        let cache = map.get(target);
        if(cache){
            return cache;
        }
        //判断目标数据的类型
        let isArray = Array.isArray(target);
        //创建一个容器
        const result = isArray ? [] : {};
        //将新的结果存入到容器中
        map.set(target, result);
        //如果目标数据为数组
        if(isArray){
            //forEach 遍历
            target.forEach((item, index) => {
                result[index] = deepClone4(item, map);
            });
        }else{
            //如果是对象, 获取所有的键名, 然后 forEach 遍历
            Object.keys(target).forEach(key => {
                result[key] = deepClone4(target[key], map);
            });
        }
        return result;
    }else{
        return target;
    }
}



// 深拷贝 数组和对象综合方法
function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    // 判断obj是可用的引用类型
    if (obj && typeof obj == "object") {
        for (var key in obj) {
            // 先判断obj[key] 是否是一个对象
            if (obj[key] && typeof obj[key] == "object") {
                result[key] = deepCopy(obj[key]);
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

// 深拷贝
function deepClone5(obj) {
   if (typeof obj === "object" && obj !== null) {
      const result = Array.isArray(obj) ? [] : {};
      for (const key in obj) {
         result[key] = deepClone5(obj[key]);
      }
      return result;
   } else {
      return obj;
   }
}

// 对象复制器函数
function copy(obj) {
    const copy = Object.create(Object.getPrototypeOf(obj));
    const propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach(function (name) {
        const desc = Object.getOwnPropertyDescriptor(obj, name);
        Object.defineProperty(copy, name, desc);
    });

    return copy;
}
