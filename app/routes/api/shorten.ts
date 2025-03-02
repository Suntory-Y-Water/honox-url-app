import { zValidator } from '@hono/zod-validator';
import { createRoute } from 'honox/factory';
import { z } from 'zod';
import { generateShortId, saveUrl, validateUrl } from '../../lib/url-utils';

// リクエストのZodスキーマ
const requestSchema = z.object({
  originalUrl: z.string().url('有効なURLを入力してください'),
});

// POST /api/shorten エンドポイント
export const POST = createRoute(zValidator('json', requestSchema), async (c) => {
  const { originalUrl } = c.req.valid('json');

  // URLの検証
  if (!validateUrl(originalUrl)) {
    return c.json({ message: '無効なURLです。正しいURLを入力してください。' }, { status: 400 });
  }

  try {
    // 短縮IDの生成
    const shortId = generateShortId();

    // Cloudflare KVに保存
    await saveUrl(c.env.URL_STORE, shortId, originalUrl);

    // 成功レスポンスを返す
    return c.json({
      shortId,
      originalUrl,
    });
  } catch (error) {
    console.error('URL保存エラー:', error);
    return c.json(
      { message: 'URL短縮サービスでエラーが発生しました。後ほど再試行してください。' },
      { status: 500 },
    );
  }
});
