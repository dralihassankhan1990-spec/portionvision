import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function AboutTab() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.emoji}>🍎🔍</Text>
      <Text style={styles.title}>PortionVision</Text>
      <Text style={styles.version}>v1.0.0 · by Muhammad Bilal</Text>

      <Text style={styles.heading}>What it does</Text>
      <Text style={styles.body}>
        PortionVision helps you estimate food portion sizes using familiar
        reference objects — a deck of cards, a tennis ball, a golf ball.
        Open the AR camera, align the reference shape over your plate, and
        capture to log what you eat.
      </Text>

      <Text style={styles.heading}>Privacy</Text>
      <Text style={styles.body}>
        Everything stays on your device. Food data, favorites, and your
        portion log are stored locally — nothing is uploaded to any server.
      </Text>

      <Text style={styles.heading}>Tips</Text>
      <Text style={styles.body}>
        {'• Hold your phone about 12 inches from your plate.\n• Use good lighting for the clearest overlay.\n• Star foods you eat often to find them faster.'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071024' },
  content: { padding: 24, alignItems: 'center' },
  emoji: { fontSize: 48 },
  title: { color: '#fff', fontSize: 26, fontWeight: '800', marginTop: 12 },
  version: { color: '#64748b', marginTop: 4 },
  heading: { color: '#a78bfa', fontWeight: '800', fontSize: 15, marginTop: 24, alignSelf: 'flex-start', textTransform: 'uppercase', letterSpacing: 1 },
  body: { color: '#cbd5e1', marginTop: 8, lineHeight: 22, alignSelf: 'flex-start' },
});
