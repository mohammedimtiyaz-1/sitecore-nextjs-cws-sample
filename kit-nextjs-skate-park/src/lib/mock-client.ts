import scConfig from 'sitecore.config';

type PlaceholderItems = unknown[];

interface RouteFields {
  Title?: { value: string };
  [key: string]: unknown;
}

interface RouteData {
  name: string;
  displayName: string;
  fields: RouteFields;
  placeholders: Record<string, PlaceholderItems>;
}

interface LayoutServiceData {
  sitecore: {
    context: {
      site: { name: string };
      language: string;
    };
    route: RouteData | null;
  };
}

interface PageMode {
  isEditing: boolean;
  isDesignLibrary: boolean;
}

interface SitecorePage {
  siteName: string;
  locale: string;
  path: string;
  layout: LayoutServiceData;
  mode: PageMode;
}

interface DictionaryRequest {
  site: string;
  locale: string;
}

interface ComponentDataContext {
  locale?: string;
  [key: string]: unknown;
}

interface ComponentRegistry {
  [key: string]: unknown;
}

interface StaticPath {
  params: {
    path?: string[];
  };
  locale?: string;
}

interface HeadLink {
  rel: string;
  href: string;
}

interface MockClient {
  getPage(
    path: string | string[] | undefined,
    options?: { locale?: string }
  ): Promise<SitecorePage>;
  getDictionary(request: DictionaryRequest): Promise<Record<string, string>>;
  getComponentData(
    layout: LayoutServiceData,
    context: ComponentDataContext,
    components: ComponentRegistry
  ): Promise<Record<string, unknown>>;
  getPagePaths(sites: string[], locales: string[]): Promise<StaticPath[]>;
  getPreview(previewData: unknown): Promise<SitecorePage>;
  getDesignLibraryData(previewData: unknown): Promise<SitecorePage>;
  getHeadLinks(
    layout: LayoutServiceData,
    options: { enableStyles?: boolean; enableThemes?: boolean }
  ): HeadLink[];
  config: typeof scConfig;
}

const defaultSite = process.env.NEXT_PUBLIC_DEFAULT_SITE_NAME || 'skate-park';
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'en';

function buildPage(path: string | string[] | undefined, locale?: string): SitecorePage {
  const resolvedLocale = locale || defaultLocale;
  const pathSegments = Array.isArray(path)
    ? path
    : typeof path === 'string'
      ? path.split('/').filter(Boolean)
      : [];
  const resolvedPath = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '/';
  const routeName = resolvedPath === '/' ? 'home' : pathSegments.join('-');

  const route: RouteData = {
    name: routeName || 'home',
    displayName: 'Mock Page',
    fields: {
      Title: { value: 'Mock Page' },
    },
    placeholders: {
      'headless-main': [
        {
          uid: 'mock-title',
          componentName: 'Title',
          placeholders: {},
          fields: {
            data: {
              datasource: {
                field: { jsonValue: { value: 'Welcome to Skate Park' } },
                url: { path: '/', siteName: defaultSite },
              },
            },
          },
          params: {},
        },
        {
          uid: 'mock-content',
          componentName: 'PageContent',
          placeholders: {},
          fields: {
            Content: {
              value: '<p>This is sample rich text rendered in disconnected mode.</p>',
            },
          },
          params: {},
        },
      ],
      'headless-header': [],
      'headless-footer': [],
    },
  };

  const layout: LayoutServiceData = {
    sitecore: {
      context: {
        site: { name: defaultSite },
        language: resolvedLocale,
      },
      route,
    },
  };

  const mode: PageMode = { isEditing: false, isDesignLibrary: false };

  return {
    siteName: defaultSite,
    locale: resolvedLocale,
    path: resolvedPath,
    layout,
    mode,
  };
}

const mockClient: MockClient = {
  async getPage(path, options) {
    return buildPage(path, options?.locale);
  },

  async getDictionary(request) {
    void request;
    return {};
  },

  async getComponentData(layout, context, components) {
    void layout;
    void context;
    void components;
    return {};
  },

  async getPagePaths(sites, locales) {
    void sites;
    void locales;
    return [];
  },

  async getPreview(previewData) {
    void previewData;
    return buildPage('/', defaultLocale);
  },

  async getDesignLibraryData(previewData) {
    void previewData;
    const page = buildPage('/', defaultLocale);
    page.mode = { isEditing: false, isDesignLibrary: true };
    return page;
  },

  getHeadLinks(layout, options) {
    void layout;
    void options;
    return [];
  },

  config: scConfig,
};

export default mockClient;
