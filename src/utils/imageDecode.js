import fs from 'fs';
import path from 'path';

/**
 * Decodifica a string base64 da imagem e salva no disco
 * @param {string} base64String - String base64 da imagem
 * @param {string} fileName - Nome do arquivo de imagem
 * @returns {string} Caminho do arquivo salvo
 */
function imageDecode(base64String, fileName) {
  const matches = base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  const response = {};
  
  if (matches.length !== 3) {
    throw new Error('Invalid input string');
  }

  // Tipo da imagem (para salvar com a extensão correta)
  response.type = matches[1];
  
  // Decodifica a string base64 para um buffer
  const buffer = Buffer.from(matches[2], 'base64');
  
  // Salva o arquivo no diretório desejado
  const filePath = path.join(__dirname, '..', 'uploads', `${fileName}.${response.type.split('/')[1]}`);

  fs.writeFileSync(filePath, buffer);

  // Retorna o caminho do arquivo salvo
  return filePath;
}

export default imageDecode;
