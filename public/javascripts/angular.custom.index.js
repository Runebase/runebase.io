const app = angular.module('myApp', []);
app.controller('myController',['$q', '$scope','$http',function($q,$scope,$http){
        $scope.$emit('LOAD');
        $data_0 = $http.get('https://www.runebase.io/supply', {cache: false});
        $data_1 = $http.get('https://www.runebase.io/dogebalance', {cache: false});
        $data_2 = $http.get('https://www.runebase.io/runesprice', {cache: false});
        $q.all([$data_0, $data_1, $data_2])
        .then(function(data){
            console.log(data[0]);
            console.log(data[1]);
            console.log(data[2]);
            const blockNumber=data[0].data/100;
            const supply=data[0].data;
            const runesBalance=data[1].data
            const price=data[2].data
            data = [
            {
                title: "Block Time",
                message: "2min"
            },
            {
                title: "Minted Blocks",
                message: blockNumber
            },
            {
                title: "Type",
                message: "Proof of Stake"
            },                       
            {
                title: "Block Reward",
                message: "100"
            },             
            {
                title: "Circulating Supply",
                message: supply
            },
            {
                title: "Current Price",
                message: '$ ' + price
            },                        
            ];
            console.log(data);
            $scope.coinData = data;   
            $scope.$emit('UNLOAD');
        })
    }]).controller('MainCtrl',['$scope',function($scope){
            $scope.$on('LOAD',function(){$scope.loading=true});
            $scope.$on('UNLOAD',function(){$scope.loading=false});
        }])
  