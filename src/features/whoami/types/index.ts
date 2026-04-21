export type Whoami = {
  id: string;
  userName: string;
  isBlocked: boolean;
  isConfirmed: boolean;
};

export type WhoamiStore = {
  whoami: Whoami;
  setWhoamiStore: (whoami: Whoami) => void;
  clearWhoamiStore: () => void;
};

export type WhoamiResponse = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
