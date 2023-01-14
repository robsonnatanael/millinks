export type LinksProps = {
  links: link[];
};

type link = {
  id: string;
  name: string;
  url: string;
  active: boolean;
};
