export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.warn(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment variables. ' +
    'Please add it to your .env.local file.'
  );
}

