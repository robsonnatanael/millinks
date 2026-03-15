export const logger = {
  info: (msg: string, data?: unknown) => {
    console.log(
      `[INFO] [${new Date().toLocaleString('pt-BR')}] ${msg}`,
      data || ''
    );
  },
  warn: (msg: string, data?: unknown) => {
    console.warn(
      `[WARN] [${new Date().toLocaleString('pt-BR')}] ${msg}`,
      data || ''
    );
  },
  error: (msg: string, error?: unknown) => {
    console.error(
      `[ERROR] [${new Date().toLocaleString('pt-BR')}] ${msg}`,
      error || ''
    );
  },
};
