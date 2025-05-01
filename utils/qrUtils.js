const QRCode = require('qrcode');

exports.generateQRCode = async (data) => {
  return await QRCode.toDataURL(JSON.stringify(data));
};
