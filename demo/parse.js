// parse demo
// @author CAIHUAZHI <moyan@come-future.com>
// @create 2021/02/24 21:39

const path = require('path');
const { parseProperties } = require('./../lib/utils/parser');

(async () => {
  const file = path.resolve(__dirname, 'parse-demo.conf');
  const result = await parseProperties(file);

  console.log('>>> result', result);
})();
