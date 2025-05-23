// Secure configuration management
export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY,
  },
  auth: {
    // Remove hardcoded credentials - use environment variables instead
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
  },
  app: {
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
  },
}

export const validateConfig = () => {
  const errors: string[] = []

  if (!config.supabase.url) {
    errors.push("NEXT_PUBLIC_SUPABASE_URL is required")
  }

  if (!config.supabase.anonKey) {
    errors.push("NEXT_PUBLIC_SUPABASE_ANON_KEY is required")
  }

  if (config.app.isDevelopment && !config.auth.adminEmail) {
    console.warn("ADMIN_EMAIL not set - using fallback authentication")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
