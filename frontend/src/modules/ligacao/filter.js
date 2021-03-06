(function () {
  angular.module('NipCentral')
    .filter('fancytime', function () {
      return function (time) {
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
      }
    })
    .filter('ptbrdate', function () {
      return function (datetime) {
        return datetime.substr(8, 2) + '/' + datetime.substr(5, 2) + '/' + datetime.substr(0, 4) + ' ' + datetime.substr(11, 8)
      }
    })
    .filter('maptranslate', function () {
      return function (status) {
        let label;
        switch (status) {
          case 'ANSWERED':
            label = 'Atendida'
            break
          case 'NO ANSWER':
            label = 'Não atendida'
            break
          case 'FAILED':
            label = 'Falha'
            break
          case 'BUSY':
            label = 'Ocupado'
            break
          default:
            label = 'Outro'
        }
        return label
      }
    })
    .filter('searchwith', [
      'fancytimeFilter',
      'ptbrdateFilter',
      function (
        fancytimeFilter,
        ptbrdateFilter) {
        return function (rows, str) {
          rows = rows || [];

          return rows.filter(function (row) {
            var rowTest = angular.copy(row);
            rowTest['duracao'] = fancytimeFilter(rowTest['duracao']);
            rowTest['faturado'] = fancytimeFilter(rowTest['faturado']);
            rowTest['date'] = ptbrdateFilter(rowTest['date']);

            var rowTestSearchable = Object.keys(rowTest)
            var status = rowTestSearchable.indexOf('status')
            rowTestSearchable.splice(status, 1)
            var sentido = rowTestSearchable.indexOf('sentido')
            rowTestSearchable.splice(sentido, 1)
            return rowTestSearchable.some(function (key) {
              if (rowTest[key]) {
                return new RegExp(str, 'gi').test(rowTest[key].toString());
              }
            });
          });

        };
      }])
    .filter('search', [function () {
      return function (rows, str) {
        rows = rows || [];
        return rows.filter(function (row) {
          
          return Object.keys(row).some(function (key) {
            if (row[key]) {
              return new RegExp(str, 'gi').test(row[key].toString());
            }
          });

        });
      };
    }])
})();