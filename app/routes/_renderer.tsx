import { jsxRenderer } from 'hono/jsx-renderer';
import { Link, Script } from 'honox/server';

export default jsxRenderer(({ children }) => {
  return (
    <html lang='ja'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='シンプルなURL短縮サービス' />
        <title>URL短縮サービス</title>
        <Link href='/app/style.css' rel='stylesheet' />
        <Script src='/app/client.ts' async />
      </head>
      <body>
        <div className='min-h-screen flex flex-col'>
          <header className='bg-blue-600 text-white p-4 shadow-md'>
            <div className='container mx-auto'>
              <h1 className='text-2xl font-bold'>URL短縮サービス</h1>
            </div>
          </header>
          <main className='flex-grow container mx-auto p-4'>{children}</main>
          <footer className='bg-gray-100 p-4 border-t'>
            <div className='container mx-auto text-center text-gray-600'>
              &copy; {new Date().getFullYear()} URL短縮サービス
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
});
