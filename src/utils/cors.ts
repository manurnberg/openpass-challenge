import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS: CorsOptions = {
  origin: true,
  methods: 'GET, POST',
  credentials: true,
};
