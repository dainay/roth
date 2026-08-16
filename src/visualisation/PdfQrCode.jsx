import QRCode from "react-qr-code";
export default function PdfQrCode({ link }) {
  return (
    
      <QRCode
        value={link}
        size={120}
        level="M"
      /> 
  );
}
