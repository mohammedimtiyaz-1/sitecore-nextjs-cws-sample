import { SitecoreClient } from '@sitecore-content-sdk/nextjs/client';
import scConfig from 'sitecore.config';
import mockClient from './mock-client';

const useMock = process.env.USE_MOCK === '1' || process.env.USE_MOCK === 'true';
const client = useMock
  ? mockClient
  : new SitecoreClient({
      ...scConfig,
    });

export default client;
