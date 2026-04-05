type Language = 'en' | 'zh';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export interface LocalizedSEO {
  en: SEOConfig;
  zh: SEOConfig;
}

// Page-specific SEO configurations
export const PAGE_SEO_CONFIG: Record<string, LocalizedSEO> = {
  home: {
    en: {
      title: 'CU Chorus | University Choral Ensemble',
      description: 'Discover the vibrant world of CU Chorus, a premier university choral ensemble. Explore our performances, recordings, and sheet music collections.',
      keywords: 'chorus, choral, university, singing, ensemble, performances',
      ogType: 'website',
    },
    zh: {
      title: 'CU Chorus | 大學合唱團',
      description: '探索 CU Chorus 充滿活力的世界，一個頂級大學合唱團。瀏覽我們的演出、錄音和樂譜收藏。',
      keywords: '合唱, 合唱團, 大學, 唱歌, 樂團, 演出',
      ogType: 'website',
    },
  },
  about: {
    en: {
      title: 'About Us | CU Chorus',
      description: 'Learn about CU Chorus mission, vision, leadership, and team members. Discover our history and commitment to choral excellence.',
      keywords: 'about, mission, vision, team, leadership, history',
    },
    zh: {
      title: '關於我們 | CU Chorus',
      description: '了解 CU Chorus 的使命、願景、領導層和團隊成員。發現我們的歷史和對合唱卓越的承諾。',
      keywords: '關於, 使命, 願景, 團隊, 領導, 歷史',
    },
  },
  'mission-vision': {
    en: {
      title: 'Mission & Vision | CU Chorus',
      description: 'Explore the mission and vision that guide CU Chorus. Learn about our core values and long-term goals.',
      keywords: 'mission, vision, values, goals, purpose',
    },
    zh: {
      title: '使命與願景 | CU Chorus',
      description: '探索指導 CU Chorus 的使命和願景。了解我們的核心價值觀和長期目標。',
      keywords: '使命, 願景, 價值觀, 目標, 目的',
    },
  },
  'music-director': {
    en: {
      title: 'Music Director | CU Chorus',
      description: 'Meet the Music Director of CU Chorus. Learn about their background, experience, and artistic vision.',
      keywords: 'music director, conductor, leadership, biography',
    },
    zh: {
      title: '音樂總監 | CU Chorus',
      description: '認識 CU Chorus 的音樂總監。了解他們的背景、經驗和藝術願景。',
      keywords: '音樂總監, 指揮, 領導, 傳記',
    },
  },
  staff: {
    en: {
      title: 'Staff & Administration | CU Chorus',
      description: 'Meet the dedicated staff and administration team of CU Chorus.',
      keywords: 'staff, administration, team, management',
    },
    zh: {
      title: '職員及行政 | CU Chorus',
      description: '認識 CU Chorus 的敬業職員和行政團隊。',
      keywords: '職員, 行政, 團隊, 管理',
    },
  },
  members: {
    en: {
      title: 'Chorus Members | CU Chorus',
      description: 'Explore the talented members of CU Chorus. Browse by vocal type and year joined.',
      keywords: 'members, singers, vocal types, ensemble',
    },
    zh: {
      title: '合唱團成員 | CU Chorus',
      description: '探索 CU Chorus 的才華橫溢的成員。按聲部類型和加入年份瀏覽。',
      keywords: '成員, 歌手, 聲部類型, 樂團',
    },
  },
  'upcoming-events': {
    en: {
      title: 'Upcoming Events | CU Chorus',
      description: 'Discover upcoming performances and events by CU Chorus. Check dates, venues, and ticket information.',
      keywords: 'events, performances, concerts, tickets, schedule',
    },
    zh: {
      title: '即將舉行的活動 | CU Chorus',
      description: '發現 CU Chorus 即將舉行的演出和活動。查看日期、場地和票務信息。',
      keywords: '活動, 演出, 音樂會, 票券, 日程',
    },
  },
  'past-events': {
    en: {
      title: 'Past Events | CU Chorus',
      description: 'Browse past performances and events from CU Chorus. Relive memorable moments from our history.',
      keywords: 'past events, archive, performances, history',
    },
    zh: {
      title: '過往活動 | CU Chorus',
      description: '瀏覽 CU Chorus 過去的演出和活動。重溫我們歷史上的難忘時刻。',
      keywords: '過往活動, 檔案, 演出, 歷史',
    },
  },
  'sheet-music': {
    en: {
      title: 'Sheet Music | CU Chorus',
      description: 'Browse and purchase sheet music from CU Chorus collections. Explore our choral, cantopop, and specialty series.',
      keywords: 'sheet music, scores, choral, cantopop, purchase',
    },
    zh: {
      title: '樂譜 | CU Chorus',
      description: '瀏覽和購買 CU Chorus 收藏中的樂譜。探索我們的合唱、粵語流行曲和特色系列。',
      keywords: '樂譜, 樂分, 合唱, 粵語流行曲, 購買',
    },
  },
  recordings: {
    en: {
      title: 'Recordings | CU Chorus',
      description: 'Listen to and purchase recordings from CU Chorus. Explore our albums and digital releases.',
      keywords: 'recordings, albums, music, purchase, listen',
    },
    zh: {
      title: '錄音 | CU Chorus',
      description: '聆聽和購買 CU Chorus 的錄音。探索我們的專輯和數字版本。',
      keywords: '錄音, 專輯, 音樂, 購買, 聆聽',
    },
  },
  support: {
    en: {
      title: 'Support Us | CU Chorus',
      description: 'Support CU Chorus through sponsorship programs and donations. Learn how you can contribute to our mission.',
      keywords: 'support, sponsorship, donation, contribute',
    },
    zh: {
      title: '支持我們 | CU Chorus',
      description: '通過贊助計劃和捐款支持 CU Chorus。了解您如何可以為我們的使命做出貢獻。',
      keywords: '支持, 贊助, 捐款, 貢獻',
    },
  },
  sponsorship: {
    en: {
      title: 'Sponsorship Programs | CU Chorus',
      description: 'Explore sponsorship opportunities with CU Chorus. Partner with us to support choral excellence.',
      keywords: 'sponsorship, partnership, corporate, support',
    },
    zh: {
      title: '贊助計劃 | CU Chorus',
      description: '探索與 CU Chorus 的贊助機會。與我們合作以支持合唱卓越。',
      keywords: '贊助, 合作, 企業, 支持',
    },
  },
};

// Get SEO config for a page
export const getSEOConfig = (pageKey: string, language: Language): SEOConfig => {
  const config = PAGE_SEO_CONFIG[pageKey]?.[language];
  if (!config) {
    return {
      title: 'CU Chorus',
      description: 'CU Chorus - Premier University Choral Ensemble',
    };
  }
  return config;
};

// Build hreflang links for language alternates
export const buildHrefLangLinks = (pathname: string, baseUrl: string): string => {
  const cleanPath = pathname.replace(/^\/(?:en|zh)/, '') || '/';
  const enUrl = `${baseUrl}/en${cleanPath}`;
  const zhUrl = `${baseUrl}/zh${cleanPath}`;
  const xDefault = `${baseUrl}${cleanPath}`;

  return `
    <link rel="alternate" hrefLang="en" href="${enUrl}" />
    <link rel="alternate" hrefLang="zh" href="${zhUrl}" />
    <link rel="alternate" hrefLang="x-default" href="${xDefault}" />
  `;
};

// Update document head with SEO meta tags
export const updateSEOHead = (config: SEOConfig, language: Language, pathname: string, baseUrl: string = 'https://cu-chorus.wix.com') => {
  // Update title
  document.title = config.title;

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string) => {
    let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = name;
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  const updateOGTag = (property: string, content: string) => {
    let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  updateMetaTag('description', config.description);
  if (config.keywords) {
    updateMetaTag('keywords', config.keywords);
  }

  // Update OG tags
  updateOGTag('og:title', config.title);
  updateOGTag('og:description', config.description);
  updateOGTag('og:type', config.ogType || 'website');
  if (config.ogImage) {
    updateOGTag('og:image', config.ogImage);
  }

  // Update canonical URL
  const cleanPath = pathname.replace(/^\/(?:en|zh)/, '') || '/';
  const canonicalUrl = `${baseUrl}/${language}${cleanPath}`;
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  // Update language meta tag
  updateMetaTag('language', language === 'en' ? 'English' : 'Chinese');
};
