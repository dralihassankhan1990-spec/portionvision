import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FoodItem, VisualObject } from '../types';

interface ComparisonModalProps {
  visible: boolean;
  food: FoodItem | null;
  onClose: () => void;
  onOpenCamera: (v: VisualObject | null) => void;
  onToggleFavorite: (id: string | number) => void;
  isFavorite: boolean;
}

export default function ComparisonModal({
  visible,
  food,
  onClose,
  onOpenCamera,
  onToggleFavorite,
  isFavorite,
}: ComparisonModalProps) {
  if (!food) return null;

  const visual: VisualObject = {
    id: String(food.id),
    name: food.visualReference || 'Reference object',
    emoji: '📏',
    realWorldSize: food.portionSize || '',
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.handle} />
            <View style={styles.titleRow}>
              <Text style={styles.title}>{food.name}</Text>
              <TouchableOpacity onPress={() => onToggleFavorite(food.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={[styles.star, isFavorite && styles.starActive]}>{isFavorite ? '★' : '☆'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.category}>{food.category}</Text>
            {food.description ? <Text style={styles.desc}>{food.description}</Text> : null}

            <View style={styles.grid}>
              {food.portionSize ? (
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Portion</Text>
                  <Text style={styles.statValue}>{food.portionSize}</Text>
                </View>
              ) : null}
              {food.calories != null ? (
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Calories</Text>
                  <Text style={styles.statValue}>{food.calories} kcal</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.refBox}>
              <Text style={styles.refTitle}>👁 Visual comparison</Text>
              <Text style={styles.refText}>
                About the size of <Text style={styles.refStrong}>{visual.name}</Text>
              </Text>
            </View>

            <TouchableOpacity style={styles.cameraBtn} onPress={() => onOpenCamera(visual)}>
              <Text style={styles.cameraBtnText}>📷 Open AR camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#0f1d33', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%', paddingBottom: 24 },
  scroll: { padding: 20 },
  handle: { width: 44, height: 5, borderRadius: 3, backgroundColor: '#334155', alignSelf: 'center', marginBottom: 16 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', flex: 1 },
  star: { fontSize: 28, color: '#475569' },
  starActive: { color: '#fbbf24' },
  category: { color: '#8b5cf6', fontWeight: '700', marginTop: 4, textTransform: 'uppercase', fontSize: 12, letterSpacing: 1 },
  desc: { color: '#cbd5e1', marginTop: 12, lineHeight: 21 },
  grid: { flexDirection: 'row', marginTop: 16, gap: 12 },
  stat: { flex: 1, backgroundColor: '#071024', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(139,92,246,0.2)' },
  statLabel: { color: '#64748b', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
  statValue: { color: '#fff', fontSize: 17, fontWeight: '700', marginTop: 4 },
  refBox: { marginTop: 16, backgroundColor: 'rgba(59,130,246,0.12)', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: 'rgba(59,130,246,0.3)' },
  refTitle: { color: '#93c5fd', fontWeight: '700', marginBottom: 6 },
  refText: { color: '#cbd5e1', lineHeight: 20 },
  refStrong: { color: '#fff', fontWeight: '700' },
  cameraBtn: { marginTop: 18, backgroundColor: '#8b5cf6', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  cameraBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  closeBtn: { marginTop: 10, paddingVertical: 12, alignItems: 'center' },
  closeText: { color: '#94a3b8', fontWeight: '600' },
});
