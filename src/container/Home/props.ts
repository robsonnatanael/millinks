export interface DataPage {
  seo: SEO;
  title: string;
  avatar: {
    photo: Image;
  };
  links: Link[];
  footer: Footer;
}

interface SEO {
  title: string;
  metaDescription: string;
  metKeywords: string;
}

interface Image {
  image: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface Link {
  id: string;
  name: string;
  url: string;
  active: boolean;
}

interface Footer {
  description: string;
  link: {
    name: string;
    url: string;
  };
  logo: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}
