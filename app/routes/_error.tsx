import type { ErrorHandler } from 'hono';

const handler: ErrorHandler = (e, c) => {
  if ('getResponse' in e) {
    return e.getResponse();
  }
  console.error(e.message);
  c.status(500);
  return c.render(
    <div className='max-w-lg mx-auto my-12 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold text-red-600 mb-4'>エラーが発生しました</h2>
      <p className='text-gray-700 mb-4'>{e.message}</p>
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
