import { createRoute } from 'honox/factory';
import UrlForm from '../islands/url-form';

export default createRoute((c) => {
  // クエリパラメータから情報を取得
  const error = c.req.query('error');
  const url = c.req.query('url') || '';
  const shortId = c.req.query('shortId');

  // 現在のリクエストURLから基本URLを取得
  const currentUrl = new URL(c.req.url);
  const origin = currentUrl.origin;
  const shortUrl = shortId ? `${origin}/${shortId}` : '';

  const params = {
    initialUrl: url,
    initialError: error,
    initialShortUrl: shortUrl,
  };

  return c.render(
    <div className='max-w-2xl mx-auto py-8'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold mb-2'>URLを短縮する</h2>
        <p className='text-gray-600'>長いURLを入力して、共有しやすい短いURLを生成しましょう。</p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md'>
        <UrlForm params={params} />
      </div>

      <div className='mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200'>
        <h3 className='text-xl font-semibold mb-3'>使い方</h3>
        <ol className='list-decimal pl-5 space-y-2'>
          <li>上のフォームに短縮したいURLを入力します</li>
          <li>「短縮URL生成」ボタンをクリックするか、Enterキーを押します</li>
          <li>生成された短縮URLをコピーして使用します</li>
          <li>短縮URLにアクセスすると、元のURLにリダイレクトされます</li>
        </ol>
      </div>
    </div>,
  );
});
