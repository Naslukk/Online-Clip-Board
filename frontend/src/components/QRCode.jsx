import React from 'react';
import QRCodeReact from 'qrcode.react';

const QRCode = ({ value }) => {
    return <QRCodeReact value={value} bgColor={"#00000000"} />;
};

export default QRCode;