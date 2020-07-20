import React from 'react';

export default function FileInput({ images, getImage, uploadMessage }) {
  return (
    <div
      className="col-md-12 image"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>Cadastro de imagem:</p>
        <input
          style={{ marginTop: '5px', padding: '0px' }}
          id="upload-image"
          className="upload-image col-md-12"
          type="file"
          accept=""
          multiple
          onChange={(e) => getImage(e)}
        />
        <p>{uploadMessage}</p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {images.map((image) => {
          return (
            <div style={{ display: 'flex' }}>
              <button type="button" class="btn btn-outline-secondary btn-sm">
                {image.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
