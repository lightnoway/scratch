## C08 [迭代器和生成器](@深入理解es6)
- 迭代器
  - 设计模式，封装 `let i;i<len;i++`
  - api
    - next(arg):result
    - throw(error):result
    - result
      - done 是否结束 
      - value 
        - yield express: done为false
        - returnVal: 第一次done为true
        - undefine 其他
  - [Symbol.iterator]() 返回迭代器对象
    - 弱引用weekmap 不支持
      - [ ] 实现？
    - 内建迭代器: entries,values,keys
      - [ ]数组创建过程 与 values
        - new Array(count)
          - map,forEach [不执行](https://stackoverflow.com/questions/931872/what-s-the-difference-between-array-and-while-declaring-a-javascript-ar)
            - Array(len) only creates a new array with length set to len and nothing more. Thus there is no real element inside the new array.
            - map,forEach would firstly check HasProperty
    - 字符串
      - 迭代器result.value 是 字符而不是 编码单元
      - 字符串字符数量:Array.from(String.fromCodePoint(134072)).length
      
  - 运行时
    - next 对应代码
      - 1次next(arg) 对应 [left yield:arg  ,下一个 yield right:return 或return]

     ```js
     ```      
  - for of, 展开: 忽略done为true的value
    - 组合generator 时:上一个gen的 yield 执行到下一个gen中的yield
       - genCompose 中 gen1的return 被隐藏
        - 如果不想被隐藏，这样显示 `yield (yield* gen1())`
       - `yield * iterator()` 
        - yield * gen1()
        - yield * arr, str
    ```js
    (function(){
      function *gen1(){
        yield 1;
        yield 2;
        yield 3;
        console.log('gen1 yield end');
        return 5;
      }
      function *gen2(){
        yield "a";
        yield "b";
        yield "c";
        console.log('gen2 yield end');
        return "done";
      } 
      function *genCompose(){
        console.log('yield *gen1():',yield *gen1());
        yield *gen2();
      }
      var it = genCompose();
      for(let result of it){
        console.log('it',result);
      }

      /* 
      it 1
      it 2
      it 3
      gen1 yield end
      yield *gen1(): 5
      it a
      it b
      it c
      gen2 yield end
      */ 
     var lt2 =genCompose(),result=[];
     debugger;
       for(let i = 0;i< 8;i++){
         result.push(lt2.next());
       }
       /** 
        0: {value: 1, done: false}
        1: {value: 2, done: false}
        2: {value: 3, done: false}
        3: {value: "a", done: false}
        4: {value: "b", done: false}
        5: {value: "c", done: false}
        6: {value: undefined, done: true}
        7: {value: undefined, done: true}
        */

    })()
    ```
    -  [] step 
    - 错误处理
      - ？gen内未处理的错误？
      - 异常捕获
        - 同步部分：`try{next(),throw()}`
        - 异步部分： 回调参数
          - promise方式
            - 封装回调成promise
            - 构建对应执行器 step
              ```js
               var g = gen();
               var result = g.next(); 
               step();
               function step(){
                 if(!result.done){
                   Promise.resolve(result.value)
                   .then(ret=>{
                     result = g.next(ret);
                     step();
                   })
                   .catch(err=>{
                     g.throw(err);//todo 处理
                     step();
                   })
                 }
               }
              ```
   
- 练习，使用gen 实现其他控制流　，比如all ，race

