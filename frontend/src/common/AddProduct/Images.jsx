import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

const Images = ({ state, back, next, updateState }) => {
  const [images, setImages] = useState({
    file1: state.file1 ? state.file1 : undefined,
    file2: state.file2 ? state.file2 : undefined,
    file3: state.file3 ? state.file3 : undefined,
    file4: state.file4 ? state.file4 : undefined,
    file5: state.file5 ? state.file5 : undefined,
  });
  const [previewImages, setPreviewImages] = useState({
    file1: undefined,
    file2: undefined,
    file3: undefined,
    file4: undefined,
    file5: undefined,
  });

  useEffect(() => {
    setPreviewImages({
      file1: images.file1 ? URL.createObjectURL(images.file1) : undefined,
      file2: images.file2 ? URL.createObjectURL(images.file2) : undefined,
      file3: images.file3 ? URL.createObjectURL(images.file3) : undefined,
      file4: images.file4 ? URL.createObjectURL(images.file4) : undefined,
      file5: images.file5 ? URL.createObjectURL(images.file5) : undefined,
    });
  }, []);

  const renderButtons = () => {
    return (
      <div className="ui fluid buttons">
        <div className="ui button" onClick={back}>
          Back
        </div>
        <div className="or"></div>
        <div
          className="ui primary button"
          onClick={() => {
            next();
          }}
        >
          Next
        </div>
      </div>
    );
  };

  const renderImageCard = (fileName) => {
    return (
      <div className="card">
        <div className="image">
          {images[fileName] ? (
            <img src={previewImages[fileName]} />
          ) : (
            <div className="ui placeholder">
              <div className="ui placeholder segment">
                <div className="ui icon header">
                  <i className="image file outline icon"></i>
                  Select an image
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="extra">
          <input
            className="ui feild"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImages({
                ...images,
                [fileName]:
                  e.target.value && e.target.value.trim() !== ''
                    ? e.target.files[0]
                    : undefined,
              });
              setPreviewImages({
                ...previewImages,
                [fileName]:
                  e.target.value && e.target.value.trim() !== ''
                    ? URL.createObjectURL(e.target.files[0])
                    : undefined,
              });
              updateState({
                [fileName]:
                  e.target.value && e.target.value.trim() !== ''
                    ? e.target.files[0]
                    : undefined,
              });
            }}
          />
          {images[fileName] ? (
            <button
              className="ui fluid button"
              style={{ marginTop: '.2rem' }}
              onClick={() => {
                setImages({
                  ...images, [fileName]: undefined,
                });
                setPreviewImages({
                  ...previewImages, [fileName]: undefined,
                });
                
                updateState({
                  [fileName]: undefined,
                });
              }}
            >
              Remove Image
            </button>
          ) : null}
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <div className="ui five cards">
        {renderImageCard('file1')}
        {renderImageCard('file2')}
        {renderImageCard('file3')}
        {renderImageCard('file4')}
        {renderImageCard('file5')}
      </div>
      <div className="ui basic segment">{renderButtons()}</div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Images);
