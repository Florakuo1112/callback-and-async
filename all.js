//第一題：奇偶數過濾器
//請分別製作過濾奇數與偶數的函式做為回呼函式，傳入 filter 函式中，過濾出不同的結果。

const randomNumbers = [1, 8, 10, 22, 137, 31];

//filter寫法 arr.filter(function(item){return item%2 !==0})

function isOdd(num) {
    return num.filter((item)=>{return item%2 !==0})
};

function isEven(num) {
    return num.filter((item)=>{return item%2 ==0})
};

//callback＝>傳入參數的函式. 上面的任一函式,使用參數callback,可以傳入主函式。因為是參數，可以呼叫不同的函式,直接呼叫的話就不行
function filter(arr, callback) {
    return callback(arr);
}
//觀察題目console.log(filter(randomNumbers, isOdd));console.log(filter(randomNumbers, isEven))
//filter()函式裡面先放陣列 再放功能,會輸出符合功能的數字陣列

console.log(filter(randomNumbers, isOdd));
console.log(filter(randomNumbers, isEven));


//第二題：定時器
//請製作兩個打印文字定時器，分別運用 setTimeout 與 setInterval 來達成，間隔一秒打印一次。

function intervalCounter(start, end){
    function add(){
        if(start < end){
            console.log(start)
            start ++
        }
    };
    setInterval(add, 1000) //不用重複呼叫，每一秒就重新呼叫一次add,不會停止，要想辦法停止
};
intervalCounter(-5, 0)


//setTimeout延遲一秒後執行，不會重複執行, 所以要重複呼叫到需要的次數
function hello(){
    let count =0;
    function add(){
        if(count<3){
            console.log("hello");
            count++
            console.log(count)
        }
        setTimeout(add,1000)
    //1秒後再執行一次myFunction,1秒後再執行一次myFunction,
    };
    add()
};  

hello()

function timeoutCounter(start, end){
    let count = start;
    function add(){
        if(count<end){
            console.log(count);
            count ++
        }
        setTimeout(add, 1000)
    };
    add()
};

timeoutCounter(0,5)

//第三題
//dom
const input = document.querySelector('.input');
const defaultt= document.querySelector('.default');
const debouncee = document.querySelector('.debounce')
const throttlee = document.querySelector('.throttle');


//debounce固定寫法,

function debounce(callback, delay = 3000){
    let timer;
    return (...args)=>{
        console.log(...args)
        clearTimeout(timer);
        timer = setTimeout(()=>callback(...args), delay)
    }
}
//把需要被執行debounce的功能放盡callback包裝起來，好維護
let conductDebounce = debounce(showDebounce, 3000)

function showDebounce(word) {
    debouncee.innerHTML = `<li class="debounce">Debounce:<span>${word}</span></li>`
   }

//(...args) 这个语法是定义返回的函数的参数，这个函数会在调用时接收参数，并将这些参数传递给 callback 函数。它不是代表 debounce 函数本身的参数，而是用于接收 debounce 返回的函数的参数。

//throttle固定寫法
function throttle(callback, delay=2000){
    let timer;
    return (...args)=>{
        if(timer==undefined){
            timer = setTimeout(()=>{
            callback(...args);timer=undefined
            },delay)
        }
    }
};
//把需要執行throttle的功能放盡callback包裝起來，好維護
let conductThrottle = throttle(showThrottle, 3000)

  

  function showDefault(word) {
   defaultt.innerHTML = ` <li class="default">Default:<spant>${word}</span></li>`
  }



    function showThrottle(word) {
    throttlee.innerHTML = `<li class="throttle">Throttle:<span>${word}</span></li>`
   }


   function test(){
       console.log('防抖')
   }

   //document.onmousemove = debounce(test)
  

input.addEventListener('input', function(e){
    showDefault(input.value);
    //debounce(showDebounce)(input.value) 這個寫法無法實現debounce
    conductDebounce(input.value)
    conductThrottle (input.value)
});
//第五題：非同步計算矩形面積 回呼函式
//請製作一個計算矩形面積的函式。當被呼叫時經過 1秒 後，使用邊長計算出矩形的面積，使用 console.log 印出。

//簡單練習回呼函示
//函示
function greeting(name) {
console.log("Hello " + name);
};

//callback放在接受回調函式做為參數的函式
function processUserInput(callback) {
var name = ("輸入你的名字：");
callback(name); //會出現韓式調用節果"Hello " + name)=>("Hello " + "輸入你的名字：)
};
processUserInput(greeting);//(放要從外面呼叫的函示)


//函示
function result(side){
    console.log(side*side)  
};

//callback放在接受回調函式做為參數的函式
function calcRectangleArea(side, callback) { 
    function myFunction(){
        callback(side)
    }; 
//必須把函式調用結果想辦法放盡函示裡面
//    setTimeout(()=>{
//     callback(side)
//    }, 4000)   
setTimeout(myFunction, 4000)
};
//setTimeout(函式,delay time)
//setTimeout(callback(side), time) callback(side)是函式調用結果非函示,所以不能這樣寫

calcRectangleArea(10, result);


//第六題：非同步錯誤處理
//延續上一個題目，撰寫錯誤處理捕捉以下例外情境：
//輸入非數字輸入非正數
function calcRectangleArea2(side,callback){

    function myFunction(){
        if(typeof(side)!== 'number'){
            callback('TypeError:請輸入數字', null) 
            return
        };
        if(side<=0){
            callback('Error:請輸入正數',null)
            return
        };
        callback(null, side**2)
    };
    //setTimeout要用函示
    setTimeout(myFunction, 2000)
}

//error是參數
function result2(error, result){
    if(error){
        console.log(error);
        return
    }
    console.log(result)
};
  
calcRectangleArea2(8,result2)

//第七題：改寫至 Promise
//延續第五題。改為使用 Promise 來撰寫，成功或失敗都將結果或錯誤使用 console.log 印出。

// const promiseSetTimeOut = (status) =>{
//     return new Promise((resolve, result)=>{
//         setTimeout(function(){
//             if(status){
//                 resolve('promiseSetTimeout成功')
//             }else{
//                 reject('promiseSetTimeout失敗')
//             }
//         })
//     })
// };

function promiseSetTimeOut(status){
return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        if(status){
            resolve('promiseSetTimeout成功')
        }else{
            reject('promiseSetTimeout失敗')
        }
    }, 1000)
})
}


promiseSetTimeOut(1>1).then(function(res){
    console.log(res)
}).catch((error)=>{
    console.log(error)
})





function calcRectangleArea3(side){

    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(side>0 && typeof side =='number'){
                resolve(console.log('第七題promise'+side**2))
            }else if (side<=0){
                reject('第七題promise'+'Error:請輸入正數');   
            }else if(typeof side !== 'number'){
                reject('第七題promise'+'Error:請輸入數字'); 
                    
            }
        },1000)
        
    })
}


calcRectangleArea3(9).then((res)=>{
    console.log(res)
}).catch((error)=>{
    console.log(error)
})

//第八題：改寫至 Async / Await
//延續第五題。改為使用 Async / Await 來撰寫，成功或失敗都將結果或錯誤使用 console.log 印出。

function calcRectangleArea4(side){

    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(side>0 && typeof side =='number'){
                resolve(console.log('第八題await'+side**2))
            }else if (side<=0){
                reject('第八題await'+'Error:請輸入正數');   
            }else if(typeof side !== 'number'){
                reject('第八題await'+'Error:請輸入數字'); 
                    
            }
        },1000)
        
    })
}


async function getResult(side){
    try{
        await calcRectangleArea4(side);
        console.log('done')
    }catch(error){
        console.log(error)
        console.log('error')
    }
  
}


getResult(0)

//第九題：獲取圖片
//dom
const btn1 = document.querySelector('.btn1');
const gallery = document.querySelector('.gallery');


function getPhoto(){
    return new Promise((resolve, reject)=>{
        url='https://fastly.picsum.photos/id/868/200/300.jpg?hmac=UbXGSABDJTIs8VH95oRuEIVyJquMN8rcqqC9NrTFuAU';
        resolve(url)
    })
};


async function showPhoto(){
    let url = await getPhoto();
    gallery.innerHTML = `<img src="${url}" alt=""> `
};

btn1.addEventListener('click',(e)=>{
    showPhoto()

})

//show 5 張照片
//dom 
const btn2 = document.querySelector('.btn2');
const gallery2 = document.querySelectorAll('.gallery2')


async function show5Photo(){
    let url = await getPhoto();
    gallery2.forEach((item)=>{
        item.innerHTML = `<img src="${url}" alt=""> `
    })

};

btn2.addEventListener('click',(e)=>{
    show5Photo()
})

//用promise all試看看
//dom
const gallery3 = document.querySelector('.gallery3');
const gallery4 = document.querySelector('.gallery4');
const btn3 = document.querySelector('.btn3')

function getPhoto3(){
    return new Promise((resolve, reject)=>{
        url='https://fastly.picsum.photos/id/868/200/300.jpg?hmac=UbXGSABDJTIs8VH95oRuEIVyJquMN8rcqqC9NrTFuAU';
        resolve(url)
    })
};

async function showPhoto3(){
    let url = await getPhoto3();
    gallery3.innerHTML = `<img src="${url}" alt=""> `

};

function getPhoto4(){
    return new Promise((resolve, reject)=>{
        url='https://fastly.picsum.photos/id/868/200/300.jpg?hmac=UbXGSABDJTIs8VH95oRuEIVyJquMN8rcqqC9NrTFuAU';
        resolve(url)
    })
};

async function showPhoto4(){
    let url = await getPhoto4();
    gallery4.innerHTML = `<img src="${url}" alt=""> `

};

btn3.addEventListener('click', (e)=>{
    Promise.all([showPhoto3(), showPhoto4()]).then((res)=>{
        console.log('finish')
    })
})


