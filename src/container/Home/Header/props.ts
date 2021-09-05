export type HeaderProps = {
  data: data;  
}

type data = {
  page: page;
  links: link[];
}

type page = {
  id: number;
  title: string;
  avatar: string;
}

type link = {
  id: number;
  title: string;
  url: string;
}
