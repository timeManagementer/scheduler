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
    var getDate = document.getElementById("getDateBtn");
    getDate.addEventListener("click",displayDate,false);
    function displayDate() {        

        //start押した時
        if(document.getElementById("getDateBtn").innerHTML == "Start"){
            document.getElementById("getDateBtn").innerHTML = "End";
            date01 = new Date();
            d1 = date01.getTime();
            document.getElementById("date01").innerHTML = Date(d1); 
            document.getElementById("date02").innerHTML = "";    
            document.getElementById("date03").innerHTML = "";  
        }
        //end押した時
        else if(document.getElementById("getDateBtn").innerHTML == "End"){
            document.getElementById("getDateBtn").innerHTML = "Start";
            date02 = new Date();
            d2 = date02.getTime();
            console.log(d2);
            document.getElementById("date02").innerHTML = Date(d2);
            d3 = (d2 - d1)/1000;
            document.getElementById("date03").innerHTML = d3 + " seconds";
        }

        
    }
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
////MyChart
var a,b,c;
var day = new Date();
var theDay = day.getDate();
var theMonth = day.getMonth();
var theYear = day.getFullYear();
var day1 = new Date(theYear,theMonth,theDay,14,0,0,0);
var dayStart = day1.getTime();
var day2 = new Date(theYear,theMonth,theDay,14,59,59,999);
var dayEnd = day2.getTime();
console.log(dayStart,dayEnd,dayEnd - dayStart,Date(dayStart),Date(dayEnd)); 

var getPie = document.getElementById("getDateBtn");
getPie.addEventListener("click",displayPie,false);
function displayPie() {        
    var ctx = document.getElementById('myChart').getContext('2d');
    console.log(d1,d2,dayStart,dayEnd);
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(228, 228, 228)',
            data: [dayEnd-dayStart],
        }]
    },

    // Configuration options go here
    options: {}
});

    //add data
    var addData = document.getElementById("addDataBtn");
    addData.addEventListener("click",addData,false);
    function addData() {
        console.log("adddata");
        chart.data.datasets[0].data[chart.data.datasets[0].data.length] = 10;
        chart.update();
    }

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
            backgroundColor: 'rgb(255, 99, 132)',
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

