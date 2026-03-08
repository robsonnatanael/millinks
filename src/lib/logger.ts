export const logger = {
    info: (msg: string, data?: any) => {
        console.log(`[INFO] [${new Date().toLocaleString('pt-BR')}] ${msg}`, data || '');
    },
    warn: (msg: string, data?: any) => {
        console.warn(`[WARN] [${new Date().toLocaleString('pt-BR')}] ${msg}`, data || '');
    },
    error: (msg: string, error?: any) => {
        console.error(`[ERROR] [${new Date().toLocaleString('pt-BR')}] ${msg}`, error || '');
    }
};