import AWS from 'aws-sdk';

// Configurar las credenciales globalmente (si no las pasas al constructor)
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

// Crear una nueva instancia de la clase S3
export const s3 = new AWS.S3();
