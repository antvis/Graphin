import React, { useState, useEffect } from 'react';
import Graphin, { Utils } from '@antv/graphin';
import { Grid } from '@antv/graphin-components';

// Do not forget to import CSS

const App = () => {
  const [img, setImg] = useState('');
  const data = Utils.mock(5).circle().graphin();

  const image2Base64 = img => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const dataURL = canvas?.toDataURL('image/png');
    return dataURL;
  };

  useEffect(() => {
    const img = new Image();
    img.src = 'https://gw.alipayobjects.com/mdn/rms_a7551c/afts/img/A*zSzQQ5n5xQAAAAAAAAAAAAAAARQnAQ';
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = () => {
      const imgBase64 = image2Base64(img);
      setImg(imgBase64);
    };
  }, []);

  return (
    <div className="App grid-plugin-container">
      <Graphin data={data}>
        <Grid img={`url(${img})`} />
      </Graphin>
    </div>
  );
};
export default App;
