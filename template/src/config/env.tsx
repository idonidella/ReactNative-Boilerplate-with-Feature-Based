//example env.tsx file structure:

import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  REVENUECAT_API_KEY_IOS,
  REVENUECAT_API_KEY_ANDROID,
  NODE_ENV,
} from '@env';

const validateEnvVariable = (
  variable: string | undefined,
  name: string,
  required: boolean = true,
): string => {
  if (required && (!variable || variable.trim() === '')) {
    throw new Error(
      `Environment variable ${name} is required but not provided`,
    );
  }
  return variable as string;
};

export const config = {
  // Google OAuth Configuration
  googleWebClientId: validateEnvVariable(
    GOOGLE_WEB_CLIENT_ID,
    'GOOGLE_WEB_CLIENT_ID',
  ),
  googleIOSClientId: validateEnvVariable(
    GOOGLE_IOS_CLIENT_ID,
    'GOOGLE_IOS_CLIENT_ID',
  ),
  // RevenueCat Configuration
  revenueCatAPIKeyIOS: validateEnvVariable(
    REVENUECAT_API_KEY_IOS,
    'REVENUECAT_API_KEY_IOS',
  ),
  revenueCatAPIKeyAndroid: validateEnvVariable(
    REVENUECAT_API_KEY_ANDROID,
    'REVENUECAT_API_KEY_ANDROID',
  ),
  // Environment
  nodeEnv: NODE_ENV || 'development',
  isDevelopment: NODE_ENV === 'development',
  isProduction: NODE_ENV === 'production',
};

// Log environment variables in development mode
if (config.isDevelopment) {
  console.log('🔧 Environment Configuration:');
  console.log(`- Node Environment: ${config.nodeEnv}`);
  console.log(
    '- Google OAuth configured:',
    !!(config.googleWebClientId && config.googleIOSClientId),
  );
  console.log(
    '- RevenueCat configured:',
    !!(config.revenueCatAPIKeyIOS && config.revenueCatAPIKeyAndroid),
  );
}

export default config;