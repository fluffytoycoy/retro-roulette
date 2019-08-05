import React from 'react';
import { css } from '@emotion/core';
import { CircleLoader } from 'react-spinners';
import './Loading.scss';


// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

function Loading(){

    return (
      <div className='loading'>
        <CircleLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
        />
      </div>
    )

}

export default Loading;
