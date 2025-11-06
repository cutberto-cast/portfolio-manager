import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Probar conexión
export const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Conectado a Neon PostgreSQL via Prisma');
    
    // Probar una consulta simple
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    console.log(`🕒 Hora actual en DB:`);
    
    return true;
  } catch (error) {
    console.error('❌ Error conectando a la DB via Prisma:', error);
    throw error;
  }
};

// Exportar prisma como default o named export
export default prisma;

// O si prefieres named export, usa esto:
// export { prisma };