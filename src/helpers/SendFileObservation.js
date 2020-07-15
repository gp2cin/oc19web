import api from '../services/api';
import { awsApi } from '../services/api';

const uploadFile = async ({ setUploadMessage, images, id, type }) => {
  setUploadMessage('Carregando ...');

  for (const index in images) {
    const image = images[index];
    if (image !== undefined) {
      let folder;
      switch (process.env.REACT_APP_TYPE) {
        case 'dev':
          folder = 'testes/';
          break;
        case 'prod':
          folder = 'producao/';
          break;
        case 'homolog':
          folder = 'homologacao/';
          break;

        default:
          folder = 'testes/';
          break;
      }
      const options = {
        params: {
          Key: folder + type + '/' + id + '/' + image.name,
          ContentType: image.type,
        },
        headers: {
          'Content-Type': image.type,
        },
      };
      const res = await api.get('api/v1/generate-put-url', options);
      if (res.data.putURL !== null && res.data.putURL !== undefined) {
        await awsApi.put(res.data.putURL, image, options);
        setUploadMessage('Upload Successful!');
        return false;
      } else {
        return true;
      }
    }
  }
};

export { uploadFile };
