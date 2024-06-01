$(document).ready(function () {
    let setTimeoutId = undefined;
    let startTime = 0;
    let currentTime = 0;
    let elapsedTime = 0;

    function runTimer() {
        currentTime = Date.now(); 
        showTime();
        // 100msecごとにrunTimer()を実行
        setTimeoutId = setTimeout(function () {
            runTimer();
        }, 100); 
    }

    /* 時間表示の関数
    ・ DateクラスのgetHours,getMinutes, getSeconds, getMillisecondsで時分秒ミリ秒を取得
    ・ ミリ秒は100ごとに1表示
    ・ cssが適用されるように、取得した時分秒ミリ秒を表示
    */
    function showTime() {
        let d = new Date(currentTime - startTime + elapsedTime); 
        const getHour = d.getUTCHours();
        const getMin = d.getMinutes(); 
        const getSec = d.getSeconds(); 
        const getMillisec = Math.floor(d.getMilliseconds() / 100); 
        $("#timer").html(`${String(getHour).padStart(1, '0')}<span>:</span>${String(getMin).padStart(1, '0')}<span>:</span>${String(getSec).padStart(1, '0')}<span>:</span>${String(getMillisec).padStart(1, '0')}`);
    }

    // ボタンのアクティブ・非アクティブ操作の関数
    // 1. スタートボタンクリック時  スタート：非アクティブ、ストップ：アクティブ、リセット：アクティブ
    function classReplacementRun() {
        $("#start").addClass("disabled");
        $("#stop").removeClass("disabled");
        $("#reset").removeClass("disabled");
    }
    // 2. ストップボタンクリック時  スタート：アクティブ、ストップ：非アクティブ、リセット：アクティブ
    function classReplacementStop() {
        $("#start").removeClass("disabled");
        $("#stop").addClass("disabled");
        $("#reset").removeClass("disabled");
    }
    // 3. リセットボタンクリック時  スタート：アクティブ、ストップ：非アクティブ、リセット：非アクティブ
    function classReplacementInitial() {
        $("#start").removeClass("disabled");
        $("#stop").addClass("disabled");
        $("#reset").addClass("disabled");
    }

    /* スタートボタンを押した時の動作
    1. ボタンが非アクティブの時は動作しない
    2. ボタンのアクティブ・非アクティブを操作
    3. ボタンクリックされた時間を記憶
    4. runTimer()実行
    */
    $("#start").click(function () {
        // 1.
        if ($(this).hasClass('disabled')) {
            return;
        }
        // 2.
        classReplacementRun();
        // 3.
        startTime = Date.now();
        // 4.
        runTimer();
    });

    /*ストップボタンを押した時の動作
     1. ボタンが非アクティブの時は動作しない
     2. ボタンのアクティブ・非アクティブを操作
     3. 経過時間を保持 (リスタート時用)
    */
    $("#stop").click(function () {
        // 1.
        if ($(this).hasClass('disabled')) {
            return;
        }
        // 2.
        classReplacementStop();
        // 3.
        elapsedTime += currentTime - startTime;
        clearTimeout(setTimeoutId); 
    });

    /* リセットボタンを押した時の動作
     1. ボタンが非アクティブの時は動作しない
     2. ボタンのアクティブ・非アクティブを操作
     3. 経過時間をリセット
     4. 表示を「0:0:0:0」に戻す
    */
    $("#reset").click(function () {
        // 1.
        if ($(this).hasClass('disabled')) {
            return;
        }
        // 2.
        classReplacementInitial();
        // 3.
        clearTimeout(setTimeoutId);
        elapsedTime = 0;
        // 4.
        $("#timer").html("0<span>:</span>0<span>:</span>0<span>:</span>0");
    });
});


