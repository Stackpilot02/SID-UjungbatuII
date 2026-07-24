'use client';

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Times New Roman',
  fonts: [
    { src: 'https://fonts.cdnfonts.com/s/16033/TimesNewRoman.woff' },
    { src: 'https://fonts.cdnfonts.com/s/16033/TimesNewRomanBold.woff', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Times New Roman', fontSize: 12, lineHeight: 1.5 },
  header: { textAlign: 'center', marginBottom: 20 },
  title: { fontSize: 14, fontWeight: 700, marginBottom: 4 },
  subtitle: { fontSize: 12, marginBottom: 2 },
  line: { borderBottom: 1, marginVertical: 10 },
  number: { textAlign: 'center', fontSize: 12, fontWeight: 700, marginBottom: 20 },
  body: { textIndent: 30, marginBottom: 12 },
  signature: { marginTop: 40, textAlign: 'right' },
  signatureName: { fontWeight: 700, marginTop: 60 },
});

interface LetterPDFProps {
  letterNumber: string;
  residentName: string;
  residentNIK: string;
  residentAddress: string;
  purpose: string;
}

export function LetterPDF({ letterNumber, residentName, residentNIK, residentAddress, purpose }: LetterPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>PEMERINTAH KABUPATEN PADANG LAWAS</Text>
          <Text style={styles.subtitle}>KECAMATAN HUTARAJA TINGGI</Text>
          <Text style={styles.subtitle}>DESA UJUNGBATU II</Text>
          <Text style={{ fontSize: 10 }}>Jalan Poros Desa Ujungbatu II, Kode Pos 22750</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.number}>SURAT KETERANGAN</Text>
        <Text style={styles.number}>Nomor: {letterNumber}</Text>
        <View style={styles.body}>
          <Text>Yang bertanda tangan di bawah ini, Kepala Desa Ujungbatu II, Kecamatan Hutaraja Tinggi, Kabupaten Padang Lawas, menerangkan bahwa:</Text>
        </View>
        <View style={{ marginLeft: 30, marginBottom: 12 }}>
          <Text>Nama: {residentName}</Text>
          <Text>NIK: {residentNIK}</Text>
          <Text>Alamat: {residentAddress}</Text>
        </View>
        <View style={styles.body}>
          <Text>Bahwa yang tersebut namanya di atas adalah benar warga Desa Ujungbatu II. Surat keterangan ini dibuat untuk keperluan {purpose}.</Text>
        </View>
        <View style={styles.body}>
          <Text>Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</Text>
        </View>
        <View style={styles.signature}>
          <Text>Ujungbatu II, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          <Text style={{ marginTop: 4 }}>KEPALA DESA UJUNGBATU II</Text>
          <Text style={styles.signatureName}>Muhammad Yusuf Lubis</Text>
        </View>
      </Page>
    </Document>
  );
}
