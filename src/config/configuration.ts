export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '1234',
    database: process.env.DATABASE_NAME || 'medicamentos10g1',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt-super-secret-0129jskdmxdxd',
  },
  stripe: {
    apiKey:
      process.env.STRIPE_API_KEY ||
      'pk_test_51JHKVXFBYqER2yeXpaK8aAasVa4hhdZ3Rzm8U2dtlE5TAppLgnDxihHX4eLuR5S3qSRyKVJ1wnBTVWddx8sDBYMi00K5NrUfTl',
    apiSecret:
      process.env.STRIPE_API_SECRET ||
      'sk_test_51JHKVXFBYqER2yeXcO59qsu2YxAjDFR8UqdXBoYlqo9qTwX7SGPnLDxLkvnah1lzsJDDypfIBTv70taTYDEhw4ZM004pp1mjQD',
  },
});
