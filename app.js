// WLD Price を Coingecko API から取得
async function getWLDPrice() {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=worldcoin&vs_currencies=usd');
  const data = await response.json();
  return data.worldcoin.usd;
}

// 取得した価格を更新
async function updateWLDPrice() {
  const price = await getWLDPrice();
  document.getElementById('wld-price').innerText = `$${price}`;
}

// 60秒ごとに価格を更新
setInterval(updateWLDPrice, 60000);

// 初回ロード時にも更新
updateWLDPrice();

// 仮のデータ（World ID）
async function getWorldIDRegistrations() {
  const response = await fetch('https://api.dune.com/api/v1/world-id/registrations');
  const data = await response.json();
  return data.totalRegistrations; // 仮のフィールド名
}

// 登録数を更新
async function updateWorldID() {
  const totalRegistrations = await getWorldIDRegistrations();
  document.getElementById('world-id-registrations').innerText = totalRegistrations;
}

// 60秒ごとに更新
setInterval(updateWorldID, 60000);

// 初回ロード時にデータを表示
updateWorldID();

// スパークラインを描画する関数（仮のデータ）
function drawSparkline(data) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const width = 100;
  const height = 20;
  const path = data.map((point, index) => `${index === 0 ? 'M' : 'L'} ${index * (width / data.length)} ${height - point}`).join(' ');

  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  line.setAttribute('d', path);
  line.setAttribute('stroke', 'black');
  line.setAttribute('fill', 'transparent');
  svg.appendChild(line);

  return svg;
}

// 仮データ
const dummyData = [0, 5, 8, 6, 4, 7, 3];

// スパークラインを表示
document.getElementById('sparkline-container').appendChild(drawSparkline(dummyData));

// API呼び出し時のエラーハンドリング
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null; // エラー時はnullを返す
  }
}
