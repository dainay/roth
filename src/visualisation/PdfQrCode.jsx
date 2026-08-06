import QRCode from "react-qr-code";
import s from './PdfQrCode.module.css';

export default function PdfQrCode({ link }) {
  return (
    <div style={{ background: "#fff", padding: 15 }} className={s.qr}>
      <QRCode
        value={link}
        size={120}
        level="M"
      />
    </div>
  );
}