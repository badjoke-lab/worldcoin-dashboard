// WLD Price を Coingecko API から取得
async function getWLDPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=worldcoin&vs_currencies=usd');
    const data = await response.json();
    return data.worldcoin.usd;
  } catch (error) {
    console.error("Error fetching WLD Price:", error);
    return null;
  }
}

// 取得した価格を更新
async function updateWLDPrice() {
  const price = await getWLDPrice();
  if (price !== null) {
    document.getElementById('wld-price').innerText = `$${price}`;
  } else {
    document.getElementById('wld-price').innerText = 'Failed to load';
  }
}

// 60秒ごとに価格を更新
setInterval(updateWLDPrice, 60000);

// 初回ロード時にも更新
updateWLDPrice();

// 仮のデータ取得（World ID）
async function getWorldIDRegistrations() {
  try {
    const response = await fetch('https://api.dune.com/api/v1/your-correct-endpoint'); // 正しいエンドポイントに修正
    const data = await response.json();
    return data.totalRegistrations; // 仮のフィールド名
  } catch (error) {
    console.error("Error fetching World ID registrations:", error);
    return null;
  }
}

// 登録数を更新
async function updateWorldID() {
  const totalRegistrations = await getWorldIDRegistrations();
  if (totalRegistrations !== null) {
    document.getElementById('world-id-registrations').innerText = totalRegistrations;
  } else {
    document.getElementById('world-id-registrations').innerText = 'Failed to load';
  }
}

// 60秒ごとに更新
setInterval(updateWorldID, 60000);

// 初回ロード時にデータを表示
updateWorldID();

// スパークラインを描画する関数（仮のデータ）
function drawSparkline(data) {
  const container = document.getElementById('sparkline-container');
  if (!container) {
    console.error("Target container for sparkline not found.");
    return;
  }

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

  container.appendChild(svg); // ここでappendChildを実行
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
