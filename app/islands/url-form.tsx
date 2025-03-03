import { useState } from 'hono/jsx';

type Props = {
  params: {
    initialUrl?: string;
    initialError?: string;
    initialShortUrl?: string;
  };
};

// URL短縮フォームのコンポーネント
export default function UrlForm({ params }: Props) {
  const { initialUrl = '', initialError = '', initialShortUrl = '' } = params;
  const [url, setUrl] = useState(initialUrl);
  const [error] = useState(initialError);
  const [shortUrl] = useState(initialShortUrl);
  const [copied, setCopied] = useState(false);

  // 入力フィールド変更ハンドラー
  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setUrl(target.value);
  };

  // クリップボードにコピーする関数
  const copyToClipboard = async () => {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn(err);
    }
  };

  // 選択ハンドラー
  const handleSelect = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    target.select();
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <form action='/api/shorten' method='post' className='mb-6'>
        <div className='mb-4'>
          <label htmlFor='originalUrl' className='block text-sm font-medium text-gray-700 mb-1'>
            短縮したいURL
          </label>
          <input
            type='url'
            id='originalUrl'
            name='originalUrl'
            value={url}
            onChange={handleInputChange}
            placeholder='https://example.com/long/url'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full px-4 py-2 text-white font-medium rounded-md bg-blue-600 hover:bg-blue-700'
        >
          短縮URL生成
        </button>
      </form>

      {error && (
        <div className='mb-6 p-3 bg-red-100 border border-red-300 text-red-700 rounded'>
          {error}
        </div>
      )}

      {shortUrl && (
        <div className='p-4 bg-gray-100 border border-gray-300 rounded-md'>
          <div className='flex justify-between items-center mb-2'>
            <span className='block text-sm font-medium text-gray-700'>短縮されたURL:</span>
            <button
              type='button'
              onClick={copyToClipboard}
              className='text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded'
            >
              {copied ? 'コピーしました!' : 'コピー'}
            </button>
          </div>
          <div className='flex items-center'>
            <input
              type='text'
              readOnly
              value={shortUrl}
              className='w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none'
              onClick={handleSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
}
