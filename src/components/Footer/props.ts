export interface FooterProps {
  footer: {
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
  };
}
