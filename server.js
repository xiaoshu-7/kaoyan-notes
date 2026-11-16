/* ============================================================
   本地静态服务器
   目的：用 http://localhost 打开，浏览器的缩放和阅读进度才会记住。
   file:// 下每次跳转缩放都会重置，这是浏览器的限制，不是页面的问题。
   ============================================================ */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';

  const file = path.join(ROOT, p);

  // 防越界：只允许访问本目录内的文件
  if (!file.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 越界访问');
    return;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 找不到：' + p);
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    // 已经有一个在跑，静默退出即可，不打扰用户
    console.log('  [已在运行] 端口 8080 被占用，直接用浏览器打开 http://localhost:8080');
    process.exit(0);
  } else {
    console.log('  启动失败：' + e.message);
    process.exit(1);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  计算机考研笔记 · 本地服务');
  console.log('  ------------------------------------');
  console.log('  http://localhost:' + PORT);
  console.log('');
  console.log('  关掉这个窗口 = 停止服务');
  console.log('');
});
