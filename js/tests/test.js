!function () {
    console.log('Hello SOSO!');
    
    var obj =  {
        num: 19
    };

    /* add function */
    function add(e) {
        return e.num + 1;
    }

    var sum = add(obj);

    console.log(sum);
}();