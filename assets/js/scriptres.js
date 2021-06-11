 var gsheet_url =
     "https://spreadsheets.google.com/feeds/list/1cq3KrqZSPGqT9gU45JY6HRuFyely2BSiRE2mqu3R7VY/1/public/values?alt=json";


 // Global variables to hold the data from the spreadsheet
 var dataList = [];


 // Load data when the page is ready
 var app = new Vue({
     el: '#app',
     data() {
         return {
             info: null
         }
     },
     mounted() {
         axios
             .get(gsheet_url)
             .then(response => (
                 parseData(response.data.feed.entry)
             ))
     }
 });


 var quotes = new Vue({
     el: '#data',
     data: {
         quotes: dataList,
         annual: dataList.annual
     }
 });


 function parseData(entries) {
     entries.forEach(function (value) {
         var entry = {
             "annual": value.gsx$annual.$t,
             "personal": value.gsx$personal.$t,
             "long": value.gsx$long.$t
         };
         dataList.push(entry);
         console.log(entry)
     });

 }