import { zValidator } from '@hono/zod-validator';
import { createRoute } from 'honox/factory';
import { z } from 'zod';
import { generateShortId, saveUrl, validateUrl } from '../../lib/url-utils';

// フォームデータスキーマ
const formSchema = z.object({
  originalUrl: z.string().url('有効なURLを入力してください'),
});

export default createRoute((c) => {
  // GETリクエストの場合はトップページにリダイレクト
  return c.redirect('/');
});

// フォーム送信処理
export const POST = createRoute(
  zValidator('form', formSchema, (result, c) => {
    if (!result.success) {
      const { originalUrl } = result.data;
      return c.redirect(
        `/?error=${encodeURIComponent(result.error.flatten().fieldErrors.originalUrl?.[0] || '入力エラーがあります')}&url=${encodeURIComponent(originalUrl || '')}`,
        303,
      );
    }
  }),
  async (c) => {
    const { originalUrl } = c.req.valid('form');

    // URLの検証
    if (!validateUrl(originalUrl)) {
      return c.redirect(
        `/?error=${encodeURIComponent('無効なURLです。正しいURLを入力してください。')}&url=${encodeURIComponent(originalUrl)}`,
        303,
      );
    }

    try {
      // 短縮IDの生成
      const shortId = generateShortId();

      // Cloudflare KVに保存
      await saveUrl(c.env.URL_STORE, shortId, originalUrl);

      // 成功情報を持ってリダイレクト
      return c.redirect(`/?shortId=${shortId}&url=${encodeURIComponent(originalUrl)}`, 303);
    } catch (error) {
      console.error('URL保存エラー:', error);

      // エラー情報を持ってリダイレクト
      return c.redirect(
        `/?error=${encodeURIComponent('URL短縮サービスでエラーが発生しました。後ほど再試行してください。')}&url=${encodeURIComponent(originalUrl)}`,
        303,
      );
    }
  },
);
