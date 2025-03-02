import { createRoute } from 'honox/factory';
import { getOriginalUrl } from '../lib/url-utils';

// 短縮URLのリダイレクト処理
export default createRoute(async (c) => {
  // URLパラメータから短縮IDを取得
  const shortId = c.req.param('shortId');

  if (!shortId) {
    return c.notFound();
  }

  try {
    // 元のURLをKVストアから取得
    const originalUrl = await getOriginalUrl(c.env.URL_STORE, shortId);

    if (!originalUrl) {
      return c.render(
        <div className='max-w-lg mx-auto my-12 p-6 bg-white rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-red-600 mb-4'>リンクが見つかりません</h2>
          <p className='text-gray-700 mb-4'>
            このURLは存在しないか、期限切れになった可能性があります。
          </p>
          <div className='mt-6'>
            <a
              href='/'
              className='inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700'
            >
              トップページに戻る
            </a>
          </div>
        </div>,
      );
    }

    // 元のURLにリダイレクト
    return c.redirect(originalUrl, 302);
  } catch (error) {
    console.error('リダイレクト処理エラー:', error);

    return c.render(
      <div className='max-w-lg mx-auto my-12 p-6 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-red-600 mb-4'>エラーが発生しました</h2>
        <p className='text-gray-700 mb-4'>
          リダイレクト処理中にエラーが発生しました。後ほど再試行してください。
        </p>
        <div className='mt-6'>
          <a
            href='/'
            className='inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700'
          >
            トップページに戻る
          </a>
        </div>
      </div>,
    );
  }
});
