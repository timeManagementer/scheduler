/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

app.initialize();


///////////////////////////////////////////////////////////////////////////////////////////
//press button
var d1,d2,d3;
var a,b,c;
var day = new Date();
var theDay = day.getDate();
var theMonth = day.getMonth();
var theYear = day.getFullYear();
var day1 = new Date(theYear,theMonth,theDay,0,0,0,0);
var dayStart = day1.getTime();
var day2 = new Date(theYear,theMonth,theDay,23,59,59,999);
var dayEnd = day2.getTime();
var timeArray = [];
var chart;
var chartCountFlag = 0;
var sendData = {"id": 0, "user": "evitch", "work": "work_name", "start_clock": "start", "elapsed_time": "elapsed"};

var getPie = document.getElementById("getDateBtn");
getPie.addEventListener("click",displayPie,false);
function displayPie() {  
        //start押した時
        if(document.getElementById("getDateBtn").innerHTML == "Start"){
            document.getElementById("getDateBtn").innerHTML = "End";
            date01 = new Date();
            d1 = date01.getTime();
            timeArray.push(d1);
            sendData.start_clock = getDateInSpecificForm(d1);
            document.getElementById("date01").innerHTML = Date(d1); 
            document.getElementById("date02").innerHTML = "";    
            document.getElementById("date03").innerHTML = "";  
        }
        //end押した時
        else if(document.getElementById("getDateBtn").innerHTML == "End"){
            document.getElementById("getDateBtn").innerHTML = "Start";
            date02 = new Date();
            d2 = date02.getTime();
            timeArray.push(d2);
            document.getElementById("date02").innerHTML = Date(d2);
            d3 = (d2 - d1)/1000;
            sendData.elapsed_time = d2-d1;
            document.getElementById("date03").innerHTML = d3 + " seconds";

            disp();
            function disp(){
                 // 入力ダイアログを表示 ＋ 入力内容を user に代入
                 chart.data.labels[chart.data.labels.length] = window.prompt("task name", "");
             }
             sendData.work = chart.data.labels[chart.data.labels.length-1];
             $.ajax({
                type: "POST",
                url: "http://160.16.213.109:3000/users/",
                data: sendData,
                success: function(data) {
                    console.log(sendData);
                    console.log(data);
                }
            });

         }


         var ctx = document.getElementById('myChart').getContext('2d');
         if(chartCountFlag==0){
            chartCountFlag = 1;
            chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: ["test"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: [
                'rgb(192, 192, 192)',
                'rgb(255, 99, 132)',
                'rgb(59, 148, 174)',
                'rgb(148, 50, 76)',
                'rgb(58, 126, 148)',
            ],
            borderColor: 'rgb(228, 228, 228)',
            data: [dayEnd-dayStart],
        }]
    },

    // Configuration options go here
    options: {}
});
        }

    //add data
    addData();
    function addData() {
        var difBtwE = dayEnd-timeArray[timeArray.length-1];
        console.log("dif",difBtwE);
        chart.data.datasets[0].data[chart.data.datasets[0].data.length-1] -= difBtwE;
        chart.data.datasets[0].data[chart.data.datasets[0].data.length] = difBtwE;
        chart.update();
    }
    console.log("timeArray",timeArray);
    console.log("chart.data",chart.data.datasets[0].data);
    console.log(sendData);

}
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
////MyChart
var getPieTest = document.getElementById("getDateTestBtn");
getPieTest.addEventListener("click",displayPieTest,false);
function displayPieTest() {        
    var ctxTest = document.getElementById('myChartTest').getContext('2d');
    console.log(d1,d2,dayStart,dayEnd);
    var chartTest = new Chart(ctxTest, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: "My First dataset",
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(59, 148, 174)',
                'rgb(148, 50, 76)',
                'rgb(230, 223, 124)',
                'rgb(58, 126, 148)',
            ],
            borderColor: 'rgb(228, 228, 228)',
            data: [10,10,10],
        }]
    },

    // Configuration options go here
    options: {}
});

    var addDataTest = document.getElementById("addDataTestBtn");
    addDataTest.addEventListener("click",addData,false);
    function addData() {
        chartTest.data.datasets[0].data[chartTest.data.datasets[0].data.length] = 10;
        chartTest.update();
    }
}
///////////////////////////////////////////////////////////////////////////////////////////
function getDateInSpecificForm(eTime){
    console.log("eTime",eTime);
    var date   = new Date(eTime);
    var year   = toDoubleDigits(date.getFullYear());
    var month  = toDoubleDigits(date.getMonth()+1);
    var day    = toDoubleDigits(date.getDate());
    var hour   = toDoubleDigits(date.getHours());
    var minute = toDoubleDigits(date.getMinutes());
    var second = toDoubleDigits(date.getSeconds());

    var time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return time;

    function toDoubleDigits(num) {
        num += "";
        if (num.length === 1) {
            num = "0" + num;
        }
        return num;     
    };
}


