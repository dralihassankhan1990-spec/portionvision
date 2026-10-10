import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

interface CameraOverlayProps {
  onCapture: (uri: string | null) => void;
  onClose: () => void;
  visualObject: string;
}

function ShapeHint({ kind }: { kind: string }) {
  const label = kind && kind !== 'circle' ? kind : 'Reference object';
  const isCircle = /circle|sphere|ball|cd|disc/i.test(kind);
  return (
    <View style={styles.hintWrap} pointerEvents="none">
      <View style={[styles.shape, isCircle ? styles.circle : styles.rect]} />
      <Text style={styles.hintText}>Align your {label} inside the frame</Text>
    </View>
  );
}

export default function CameraOverlay({ onCapture, onClose, visualObject }: CameraOverlayProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [busy, setBusy] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#8b5cf6" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.msg}>PortionVision needs camera access for the AR overlay.</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={requestPermission}>
          <Text style={styles.primaryBtnText}>Grant camera access</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBtn} onPress={onClose}>
          <Text style={styles.linkText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (busy || !cameraRef.current) return;
    setBusy(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      onCapture(photo?.uri ?? null);
    } catch (e) {
      console.warn('Capture failed', e);
      onCapture(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back">
        <ShapeHint kind={visualObject} />
        <View style={styles.controls}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.shutter, busy && styles.shutterBusy]}
            onPress={takePicture}
            disabled={busy}
          >
            {busy ? <ActivityIndicator color="#fff" /> : <View style={styles.shutterInner} />}
          </TouchableOpacity>
          <View style={styles.spacer} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, backgroundColor: '#071024', alignItems: 'center', justifyContent: 'center', padding: 24 },
  camera: { flex: 1 },
  msg: { color: '#cbd5e1', textAlign: 'center', marginBottom: 20, lineHeight: 22 },
  primaryBtn: { backgroundColor: '#8b5cf6', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  linkBtn: { marginTop: 16, padding: 8 },
  linkText: { color: '#8b5cf6', fontWeight: '600' },
  hintWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  shape: { borderWidth: 2, borderColor: 'rgba(139,92,246,0.9)', borderStyle: 'dashed', backgroundColor: 'rgba(139,92,246,0.08)' },
  circle: { width: 220, height: 220, borderRadius: 110 },
  rect: { width: 240, height: 150, borderRadius: 12 },
  hintText: { color: '#fff', marginTop: 16, backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, overflow: 'hidden' },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 28, paddingBottom: 40 },
  closeBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center' },
  closeText: { color: '#fff', fontSize: 18 },
  shutter: { width: 76, height: 76, borderRadius: 38, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff' },
  shutterBusy: { opacity: 0.6 },
  shutterInner: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#fff' },
  spacer: { width: 48 },
});
