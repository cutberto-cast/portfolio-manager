import prisma from '../config/database';

async function testPrisma() {
  try {
    // Crear un proyecto de prueba
    const project = await prisma.project.create({
      data: {
        title: 'Mi Primer Proyecto',
        description: 'Este es un proyecto de prueba',
        repoUrl: 'https://github.com/tu-usuario/tu-repo',
        liveUrl: 'https://tu-proyecto.com'
      }
    });
    console.log('✅ Proyecto creado:', project);

    // Leer todos los proyectos
    const projects = await prisma.project.findMany();
    console.log('📋 Todos los proyectos:', projects);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();