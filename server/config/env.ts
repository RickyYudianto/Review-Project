import config from './config.json';

const env = process.env.NODE_ENV === 'production' ? config.production : config.development;

export default env;