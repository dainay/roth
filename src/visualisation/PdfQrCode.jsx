import QRCode from "react-qr-code";
import s from './PdfQrCode.module.css';

export default function PdfQrCode({ link }) {
    console.log('link', link);
  return (
    
      <QRCode
        value={link}
        size={120}
        level="M"
      /> 
  );
}