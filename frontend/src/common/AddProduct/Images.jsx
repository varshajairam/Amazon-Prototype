import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

const Images = ({ back, next, submit, updateState }) => {
  const [images, setImages] = useState({
    file1: undefined,
    file2: undefined,
    file3: undefined,
    file4: undefined,
    file5: undefined,
  });

  const [previewImages, setPreviewImages] = useState({
    file1: undefined,
    file2: undefined,
    file3: undefined,
    file4: undefined,
    file5: undefined,
  });

  const validateInput = () => {
    return true;
  };
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
            submit()
          }}
        >
          Next
        </div>
      </div>
    );
  };

  const renderImageCard = (fileName) => {
    if (images[fileName]) {
    }
    return (
      <div className="card">
        <div className="image">
          {images[fileName] ? (
            <img
              src={previewImages[fileName]}
            />
          ) : (
            <div className="ui placeholder">
              <div className="square image"></div>
            </div>
          )}
        </div>
        <div className="extra">
          <input
            className="ui feild"
            type="file"
            value={images[fileName]}
            onChange={(e) => {
              setImages({ ...images, [fileName]: e.target.value });
              setPreviewImages({...previewImages, [fileName]: URL.createObjectURL(e.target.files[0])});
            }}
            multiple
          />
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
