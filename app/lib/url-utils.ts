import { nanoid } from 'nanoid';
import { z } from 'zod';

// URL検証のためのZodスキーマ
export const urlSchema = z.string().url().min(1);

// URLストアのキー接頭辞
const URL_PREFIX = 'url:';

// 短縮IDを生成する関数
export function generateShortId(): string {
  return nanoid(6);
}

// KVストアのキーを生成する関数
export function getUrlKey(shortId: string): string {
  return `${URL_PREFIX}${shortId}`;
}

// URL保存関数
export async function saveUrl(
  kv: KVNamespace,
  shortId: string,
  originalUrl: string,
): Promise<void> {
  const key = getUrlKey(shortId);
  await kv.put(key, originalUrl);
}

// URL取得関数
export async function getOriginalUrl(kv: KVNamespace, shortId: string): Promise<string | null> {
  const key = getUrlKey(shortId);
  return await kv.get(key);
}

// URLバリデーション関数
export function validateUrl(url: string): boolean {
  try {
    urlSchema.parse(url);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return false;
    }
    return false;
  }
}
