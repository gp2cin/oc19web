import React from 'react';

export default function FileInput({ images, setImages, uploadMessage, setUploadMessage }) {

  function fileIsInSizeLimit(event) {
    let files = event.target.files;
    let size = 5000000;
    let err = "";
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err += `${files[x].name} é muito grande. Por favor, escolha arquivos de até 5MB. `;
        setUploadMessage(err);
      }
    }
    if (err !== "") {
      return false;
    } else {
      return true;
    }
  }

  function filesAreInAmoutLimit(event) {
    let files = event.target.files;
    if (files.length > 20) {
      let err = "";
      err = 'Apenas 20 arquivos podem ser enviados por vez.';
      setUploadMessage(err);
      return false;
    } else {
      return true;
    }
  }

  function removeFile(file) {
    var array = [...images]; // make a separate copy of the array
    var index = array.indexOf(file)
    if (index !== -1) {
      array.splice(index, 1);
      setImages(array);
    }
  }

  function getImage(e) {
    const files = e.target.files;
    if (files && files.length > 0 && fileIsInSizeLimit(e) && filesAreInAmoutLimit(e)) {
      setImages([...files]);
    }
  }

  return (
    <div
      className="col-md-12 image"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>Cadastro de arquivos:</p>
        <input
          style={{ marginTop: '5px', padding: '0px' }}
          id="upload-image"
          className="upload-image col-md-12"
          type="file"
          hidden
          accept="image/*, application/pdf, text/*, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.openxmlformats-officedocument.presentationml.slideshow"
          multiple
          onChange={(e) => getImage(e)}
        />
        <label
          htmlFor="upload-image"
          className="upload-image col-md-12"
          type="button"
          style={{
            marginTop: '5px',
            textAlign: 'center',
            padding: '5px',
            backgroundColor: '#3cdb37',
            color: 'black',
            borderRadius: '3px',
            border: '1px solid #BEBEBE',
          }}>
          Enviar arquivos
        </label>
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
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                onClick={() => removeFile(image)}
                style={{ backgroundColor: '#ffcccb' }}>
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
