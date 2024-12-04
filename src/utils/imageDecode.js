const fs = require('fs');
const path = require('path');

// Função para decodificar imagem base64 e salvar no diretório de imagens
function imageDecode(base64String) {
  const matches = base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  const response = {};
  
  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], 'base64');
  
  return response.data;
}

module.exports = { imageDecode };
