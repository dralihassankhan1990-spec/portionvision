import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LogEntry } from '../types';

interface MyPortionsTabProps {
  logs: LogEntry[];
  onClear: () => void;
}

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MyPortionsTab({ logs, onClear }: MyPortionsTabProps) {
  const confirmClear = () => {
    Alert.alert('Clear log?', 'This removes all logged portions.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: onClear },
    ]);
  };

  const totalKcal = logs.reduce((sum, l) => sum + (l.calories || 0), 0);

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Today's log</Text>
        <Text style={styles.summarySub}>
          {logs.length} {logs.length === 1 ? 'portion' : 'portions'} · {totalKcal} kcal
        </Text>
        {logs.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={confirmClear}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.body}>
              <Text style={styles.food}>{item.foodName}</Text>
              <Text style={styles.meta}>
                {item.objectName} · {formatDate(item.timestamp)}
              </Text>
              {item.calories != null && <Text style={styles.kcal}>{item.calories} kcal</Text>}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={styles.empty}>Nothing logged yet.</Text>
            <Text style={styles.emptyHint}>Pick a food, open the AR camera, and capture to log a portion.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071024' },
  summary: { padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  summaryTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  summarySub: { color: '#94a3b8', marginTop: 4 },
  clearBtn: { marginTop: 10, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: 'rgba(239,68,68,0.15)' },
  clearText: { color: '#f87171', fontWeight: '700', fontSize: 13 },
  list: { padding: 12, paddingBottom: 24 },
  card: { flexDirection: 'row', backgroundColor: '#0f1d33', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(139,92,246,0.15)', alignItems: 'center' },
  emoji: { fontSize: 30, marginRight: 12 },
  body: { flex: 1 },
  food: { color: '#fff', fontWeight: '700', fontSize: 15 },
  meta: { color: '#64748b', fontSize: 12, marginTop: 3 },
  kcal: { color: '#4ade80', fontSize: 12, fontWeight: '700', marginTop: 3 },
  emptyWrap: { alignItems: 'center', marginTop: 60, paddingHorizontal: 32 },
  emptyEmoji: { fontSize: 44 },
  empty: { color: '#cbd5e1', fontWeight: '700', marginTop: 12, fontSize: 16 },
  emptyHint: { color: '#64748b', textAlign: 'center', marginTop: 6, lineHeight: 20 },
});
