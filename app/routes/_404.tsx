import type { NotFoundHandler } from 'hono';

const handler: NotFoundHandler = (c) => {
  c.status(404);
  return c.render(
    <div className='max-w-lg mx-auto my-12 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>ページが見つかりません</h2>
      <p className='text-gray-700 mb-4'>お探しのURLは存在しないか、削除された可能性があります。</p>
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
};

export default handler;
